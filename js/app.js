// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.width = 40;
    this.height = 40;
    this.y = y;
    this.speed = speed;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
        if(this.x > 400) {
            this.x = -100;
        } else {
            this.x += 100 * this.speed * dt;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        return this.y;

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        if (keyCode == `left`) {
            if(this.x > 0) {
                this.x -= 100;
            }
        } else if (keyCode == `right`) {
            if(this.x < 400) {
                this.x += 100;
            }
        } else if (keyCode == `up`) {
            if (this.y > -35) {
                this.y -= 85;
            }
        } else if (keyCode == `down`){
            if( this.y < 390) {
                this.y += 85;
            }
        }

    }
}


// Character Images
const charImages = document.querySelectorAll(".char-image");
    for(let i = 0; i < charImages.length; i++) {
// Set the default Character Image
    charImages[0].classList.add("active");
// Loop over Character Images and Change the Selected one based on a 'Click' event
    charImages[i].addEventListener("click", function() {
// Change the player image
    player.image = this.getAttribute("data-image");
// Remove class `active`from all character images
    charImages.forEach(function(image) {
    image.classList.remove("active");
})
// Add class `active` to the selected character image
        this.classList.add("active");
    });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let firstEnemy = new Enemy(0, 50, 10);
let secondEnemy = new Enemy(-100, 50, 10);
let thirdEnemy = new Enemy (-150, 135, 10)

let player = new Player(200, 390);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
