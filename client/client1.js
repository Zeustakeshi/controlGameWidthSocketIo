class Game {
    constructor() {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width = 500;
        this.canvasHeight = this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d");
        this.socket = io();

        this.input = new Input(this);
        this.player = new Player(this);

        // this.update();

        this.socket.on("alo", (controls) => {
            console.log(controls);
            console.log("aa");
        });

        console.log("run");
    }

    draw() {
        this.player.draw();
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.player.update();
        this.draw();
        window.requestAnimationFrame(this.update.bind(this));
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 100;
        this.y = this.game.canvasHeight - this.height;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
    }

    draw() {
        this.game.ctx.fillStyle = "#4f46e5";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.game.input.keys.indexOf("Up") > -1) {
            this.vy = -this.speed;
        } else if (this.game.input.keys.indexOf("Right") > -1) {
            this.vx = this.speed;
        } else if (this.game.input.keys.indexOf("Left") > -1) {
            this.vx = -this.speed;
        } else if (this.game.input.keys.indexOf("Down") > -1) {
            this.vy = this.speed;
        } else {
            this.vx = 0;
            this.vy = 0;
        }
    }
}

class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];

        this.game.socket.on("severSendControl", (controls) => {
            this.keys = controls;
        });
    }
}

const g = new Game();
