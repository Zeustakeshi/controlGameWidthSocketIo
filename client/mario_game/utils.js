export function drawStatusText(ctx, input, player) {
    ctx.font = "25px helvetical";
    ctx.fillText("Last Input: " + input.lastKey, 10, 30);
    ctx.fillText("Player State: " + player.currentState.state, 10, 60);
}
