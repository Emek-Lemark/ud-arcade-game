// Declare Glabal Variables
const tileWidth = 101;
const tileHeight = 85;
const canvasHeight = 985;
const canvasWidth = 1305;
const playerWidth = 65;
const playerHeight = 50;
const numColumns = 13;
const maxY = (tileHeight * 10) + (tileHeight / 2);
// Variable to store collectible images
const collectibleSprite = [
    'images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png'
];

// Enemies our player must avoid
class Enemy {
    constructor() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/bug.png';
    this.x = -10;
    this.y = (Math.floor((Math.random() * 8)) * tileHeight) + tileHeight + (tileHeight / 2);
    this.speed = Math.max(Math.random(), 0.5);
    this.step = 450;
    this.width = 100;
    this.height = 40;
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
    constructor() {
    this.sprite = 'images/char-boy.png';
// Place player in the middle of the seventh tile from left horizontally
    this.x = (tileWidth * 6) + (tileWidth / 2) - (playerWidth / 2);
// Place player in the middle of the tenth tile from top vertically
    this.y = (tileHeight * 10) + (tileHeight / 2) - (playerHeight / 2);
// moveY and moveX for move direction, initially set to zero
    this.moveY = 0;
    this.moveX = 0;
    this.width = playerWidth;
    this.height = 30;

}

    update(dt) {
    // Calculate the next X position based on direction
    let nextX = this.x + (this.moveX * tileWidth);
    // Update position only if within canvas bounds
    if (nextX <= numColumns*tileWidth && nextX >= 0) {
        this.x = nextX;
    }
    // Calculate the next Y position based on direction
    let nextY = this.y + (this.moveY * tileHeight);
    // Update position only if within canvas bounds
    if (nextY <= maxY && nextY >= 0 ) {
        this.y = nextY;
    }
    // After updating position, reset direction to zero
    this.moveY = 0;
    this.moveX = 0;
}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        if (keyCode == `left`) {
            this.moveY = 0; 
            this.moveX = -1;
            
        } else if (keyCode == `right`) {
            this.moveY = 0;
            this.moveX = 1;
            
        } else if (keyCode == `up`) {
            this.moveY = -1;
            this.moveX = 0;
            
        } else if (keyCode == `down`){
            this.moveY = 1;
            this.moveX = 0;
            }
        }
}
// Collectible class
class Collectible {
    constructor(collectibleType) {
    // X and Y position of the gem
    this.x = (Math.floor((Math.random() * 8)) * tileWidth) + (tileWidth * 1.5);
    this.y = (Math.floor((Math.random() * 8)) * tileHeight) + (tileHeight * 1.5);
    this.width = 60;
    this.height = 60;

    // 50 points scored for blue, 100 for green and 150 for orange gem.
    this.score = (collectibleType + 1) * 50;
    this.sprite = collectibleSprite[collectibleType];
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
let player = new Player();

// Initiate enemies, might make number of enemies dynamic in future.
for (let i = 0; i < 9; i++) {
    allEnemies.push(new Enemy());
}
// Number of collectibles, anywhere between 5 to 9
let numberOfCollectibles = Math.max(Math.floor(Math.random() * 10), 5);
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

// Prevent the window from scrolling on arrow key press
window.addEventListener('keydown', function(e) {
    // keycodes for the space bar and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);