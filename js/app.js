// Declare Glabal Variables
const tileWidth = 101;
const tileHeight = 85;
const canvasHeight = 956;
const canvasWidth = 1305;



// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -10;
    this.width = 40;
    this.height = 40;
    this.y = (Math.floor((Math.random() * 8)) * tileHeight) + tileHeight + (tileHeight / 2);
    this.speed = Math.max(Math.random(), 0.5);
    this.step = 450;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = (this.x + (dt * this.speed * this.step)) % (canvasWidth + this.width);

        if(this.x > (canvasWidth)) {
        this.y = (Math.floor((Math.random() * 8)) * tileHeight) + tileHeight + (tileHeight / 2);
        this.speed = Math.max(Math.random(), 0.5);
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
        this.width = 50;
        this.height = 85;
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

// variable to store collectible images
const collectibleSprite = [
    'images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png'

];
// collectible class
class Collectible {
    constructor(x, y, collectibleType) {
    // X and Y position of the gem
    this.x = (Math.floor((Math.random() * 8)) * tileWidth) + (tileWidth * 1.5);
    this.y = (Math.floor((Math.random() * 8)) * tileHeight) + (tileHeight * 1.5);

    //50 points scored for blue, 100 for green and 150 for orange gem.
    this.point = (collectibleType + 1) * 50;
    this.sprite = collectibleSprite[collectibleType];
    this.width = 50;
    this.height = 55;

    }
    update(dt) {
    // Change collectible position 
    if (Math.random() < 0.001) {
        this.x = (Math.floor((Math.random() * 8)) * tileWidth) + (tileWidth * 1.5);
        this.y = (Math.floor((Math.random() * 8)) * tileHeight) + (tileHeight * 1.5);
    }
}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    

    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 390);

// Initiate enemies, might make number of enemies dynamic in future.
for (let i = 0; i < 9; i++) {
    allEnemies.push(new Enemy());
}
// Number of collectibles, anywhere between 5 to 9
const numberOfCollectibles = Math.max(Math.floor(Math.random() * 10), 5);
let allCollectibles = [];
for (let i = 0; i < numberOfCollectibles; i++) {
// Generate collectible type randomly
let collectibleType = Math.floor((Math.random() * 3));
allCollectibles.push(new Collectible(collectibleType));
}


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
