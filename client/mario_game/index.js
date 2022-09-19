import Player from "./Player.js";
import InputHandler from "./Inputhandler.js";
import { drawStatusText } from "./utils.js";

class Game {
    constructor(socket) {
        this.socket = socket;
        this.canvas = document.getElementById("canvas");
        this.canvasWidth = this.canvas.width = 900;
        this.canvasHeight = this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d");
        this.deltaTime = 0;
        this.groundMargin = 50;

        this.player1 = new Player(this, 1);
        this.player2 = new Player(this, 2);
        this.input = new InputHandler(this);
        this.update(0);
    }

    draw() {
        // drawStatusText(this.ctx, this.input, this.player);
        this.player1.draw();
        this.player2.draw();
    }
    #lastTime = 0;
    update(timeStamp) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        this.player1.update();
        this.player2.update();

        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
}

window.addEventListener("load", () => {
    loading.style.display = "none";
    const socket = io();
    const game = new Game(socket);

    function makeid(length) {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    const roomId = makeid(5);

    socket.emit("join_room", roomId, "mainScreen");
    roomid.innerText = `Room: ${roomId} `;
    socket.on("notification", (userName, noti) => {
        alert(userName + ": " + noti);
    });

    socket.on("update_usernames", (room) => {
        console.log(room);
        p1.innerText = room.includes("player1")
            ? `Player1: connected`
            : "Player1: not found";
        p2.innerText = room.includes("player2")
            ? `Player2: connected`
            : "Player2: not found";
    });
});
