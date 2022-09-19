export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.lastKey1 = "";
        this.lastKey2 = "";

        this.game.socket.on("sever_send_control", (playerName, control) => {
            if (playerName === "player1") {
                this.lastKey1 = control;
            } else if (playerName === "player2") {
                this.lastKey2 = control;
            }

            console.log(playerName + ": " + control);
        });

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowDown":
                    this.lastKey2 = "PRESS down";
                    break;
                case "ArrowRight":
                    this.lastKey2 = "PRESS right";
                    break;
                case "ArrowLeft":
                    this.lastKey2 = "PRESS left";
                    break;
                case "ArrowUp":
                    this.lastKey2 = "PRESS up";
                    break;
                case "s":
                    this.lastKey1 = "PRESS down";
                    break;
                case "d":
                    this.lastKey1 = "PRESS right";
                    break;
                case "a":
                    this.lastKey1 = "PRESS left";
                    break;
                case "w":
                    this.lastKey1 = "PRESS up";
                    break;

                default:
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowDown":
                    this.lastKey2 = "RELEASE down";
                    break;
                case "ArrowRight":
                    this.lastKey2 = "RELEASE right";
                    break;
                case "ArrowLeft":
                    this.lastKey2 = "RELEASE left";
                    break;
                case "ArrowUp":
                    this.lastKey2 = "RELEASE up";
                    break;
                case "s":
                    this.lastKey1 = "RELEASE down";
                    break;
                case "d":
                    this.lastKey1 = "RELEASE right";
                    break;
                case "a":
                    this.lastKey1 = "RELEASE left";
                    break;
                case "w":
                    this.lastKey1 = "RELEASE up";
                    break;
                default:
                    break;
            }
        });
    }
}
