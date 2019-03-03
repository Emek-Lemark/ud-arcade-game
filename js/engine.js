/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

const Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas element's height/width and add it to the DOM.
     */
    let doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
        const numColumns = 13;

    let lifeLeft;
    let score;
    canvas.width = 1305;
    canvas.height = 1000;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        lifeLeft = 5;
        score = 0;
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisionsWithEnemy();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        allCollectibles.forEach(function(collectible) {
            collectible.update(dt);
        });
    }

    /* This function checks collision between two objects obj1 and obj2 and 
     * returns a boolean value. This function is used by checkCollisionWithEnemy and
     * checkPoints function.
     */
    function checkCollisions(object1, object2) {
        if (object1.x < object2.x + object2.width && 
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y) {
            console.log("Collision detected");
        return true;
    } else {
      return false;
        }
    }

    /* This function is called by the update function and loops through
     * all the enemies to find out if player has collided with any one 
     * of them.
     */
    function checkCollisionsWithEnemy() {
        allEnemies.forEach(function(enemy) {
         if (checkCollisions(enemy, player)) {
            lifeLeft -= 1;
         if (lifeLeft === 0) {
          init();
        }
        resetPlayer();
            }
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 8 of stone
        'images/stone-block.png', // Row 2 of 8 of stone
        'images/stone-block.png', // Row 3 of 8 of stone
        'images/stone-block.png', // Row 4 of 8 of stone
        'images/stone-block.png', // Row 5 of 8 of stone
        'images/stone-block.png', // Row 6 of 8 of stone
        'images/stone-block.png', // Row 7 of 8 of stone
        'images/stone-block.png', // Row 8 of 8 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
        'images/grass-block.png', // Row 2 of 2 of grass
            ],
            numRows = 11,
            numCols = numColumns,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
        renderCollectibles();
        renderLifeLeft();
        renderScore();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }


    // Function to render life left  of the player
    function renderLifeLeft() {
        const lifeImage = "images/heart-small.png";
        const x = 1055;
        const y = 60;
        ctx.drawImage(Resources.get(lifeImage), x, y);
        ctx.font = "32px Comic Sans MS";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#dbdbdbd";
        ctx.strokeText(lifeLeft, 1040, 92);
        ctx.fillText(lifeLeft, 1040, 92);
    }
    
    // Function to render score scored by the player.
    function renderScore() {
        const scoreImage = "images/star-small.png";
        const x = 1158;
        const y = 70;
        ctx.drawImage(Resources.get(scoreImage), x, y);
        ctx.font = "32px Comic Sans MS";
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#dbdbdbd";
        ctx.strokeText(score, 1140, 95);
        ctx.fillText(score, 1140, 95);
    }



    // Character Images
        let charImages = document.querySelectorAll(".char-image");
        for(let i = 0; i < charImages.length; i++) {
    // Set the default Character Image
        charImages[0].classList.add("active");
    // Loop over Character Images and Change the Selected one based on a 'Click' event
        charImages[i].addEventListener("click", function() {
    // Change the player image
        player.sprite = this.getAttribute("data-image");
    // Remove class `active`from all character images
        charImages.forEach(function(image) {
        image.classList.remove("active");
        })
    // Add class `active` to the selected character image
        this.classList.add("active");
        });
    }

    // Function to render all the gems
    function renderCollectibles() {
        allCollectibles.forEach(function(collectible) {
        collectible.render();
        });
    }
    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    // Function to reset player position and collectibles.
    function resetPlayer() {
        player = new Player();
        resetCollectibles();
    }

    // Function to reset collectibles
    function resetCollectibles() {
        let numberOfCollectibles = Math.max(Math.floor(Math.random() * 10), 5);
        allCollectibles = [];
        for (let i = 0; i < numberOfCollectibles; i++) {
        let collectibleType = Math.floor((Math.random() * 3));
        allCollectibles.push(new Collectible(collectibleType));
        }
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/gem-blue.png',
        'images/gem-green.png',
        'images/gem-orange.png',
        'images/heart-small.png',
        "images/star-small.png"

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
