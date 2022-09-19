import {
    FallingLeft,
    FallingRight,
    JumpingLeft,
    JumpingRight,
    RunningLeft,
    RunningRight,
    SittingLeft,
    SittingRight,
    StandingLeft,
    StandingRight,
} from "./State.js";

export default class Player {
    constructor(game, keyBoard) {
        this.game = game;
        this.keyBoard = keyBoard;
        this.img = document.getElementById("player");
        this.spriteWidth = 200;
        this.spriteHeight = 181.83;
        this.scale = 0.6;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.x = this.keyBoard === 1 ? 0 : this.game.canvasWidth - this.width;
        this.y = this.game.canvasHeight - this.height - this.game.groundMargin;

        this.states = [
            new StandingLeft(this),
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
        ];
        this.currentState = this.states[this.keyBoard === 1 ? 1 : 0];

        this.maxFrame = 6;
        this.frameX = 0;
        this.frameY = this.keyBoard === 1 ? 0 : 1;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

        this.speed = 0;
        this.maxSpeed = 5;
        this.weight = 1;
        this.vy = 0;
        this.power = 18;
    }

    draw() {
        this.game.ctx.font = "20px helvetical";
        this.game.ctx.fillText("Player: " + this.keyBoard, this.x, this.y);
        this.game.ctx.fillText("Player: " + this.keyBoard, this.x, this.y);
        this.game.ctx.drawImage(
            this.img,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        this.x += this.speed;
        this.y += this.vy;

        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.canvasWidth - this.width)
            this.x = this.game.canvasWidth - this.width;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        if (
            this.y >
            this.game.canvasHeight - this.height - this.game.groundMargin
        )
            this.y =
                this.game.canvasHeight - this.height - this.game.groundMargin;

        this.currentState.handleInput(
            this.keyBoard === 1
                ? this.game.input.lastKey1
                : this.game.input.lastKey2
        );

        if (this.frameTimer > this.frameInterval) {
            this.frameX >= this.maxFrame ? (this.frameX = 0) : this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += this.game.deltaTime;
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround() {
        return (
            this.y + this.weight >=
            this.game.canvasHeight - this.height - this.game.groundMargin
        );
    }
}
