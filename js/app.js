// Enemies our player must avoid
class Enemy { 
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = x; 
        this.y = y; 
        this.speed = speed; 
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x = this.x + this.speed * dt;
       
        if(this.x >= 550) {
            this.x = -100;
            this.randomSpeed();
        };

    //Handle collision of player and enemy
        if(player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
                player.x = 200; 
                player.y = 380;
        } 
    };

//Create random speeds for the enemies
    randomSpeed() {
        let speedX = 50;
        this.speed = speedX * Math.floor(Math.random() * 10 + 1);
    };

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player  {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 65;
        this.height = 60;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    };

    update() {
        if(this.y > 380) {
            this.y = 380;
        }

        if(this.x > 400) {
            this.x = 400;
        }

        if(this.x < 0) {
            this.x = 0;
        }

        if(this.y < -20) {
            alert('Congrats, you win!');
            this.x = 200;
            this.y = 380;
        }

    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(keyPress) {
        switch(keyPress) {
            case 'left':
                this.x -= this.speed +50; 
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
        }            
    }
};

//additional object that player can collect in the game
class Bonus {
    constructor(x, y) {
        this.x = x + 20; 
        this.y = y - 15;
        this.width = 70;
        this.height = 75;
        this.sprite = 'images/Heart.png';
    };

    update() {
        if(player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y) {
            this.y = -1000;
            this.x = -1000;
        }
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 380, 50);
let allBonus = [];
let allEnemies = [];

for(let i = 0; i < 3; i++) {
    let speedX = 20;
    let startSpeed = speedX * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
} 

for(let i = 0; i < 3; i++) {
    let startX = 100 * Math.floor(Math.random() * 10);
    let startY = 60 + (85 * i);
    allBonus.push(new Bonus(startX, startY));   
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
