var player = new P.player.Player();
var wrapper = document.querySelector("div.player-wrapper");
player.setOptions({
    autoplayPolicy: "never"
});
player.setOptions({
    theme: "light"
});
player.setOptions({
    focusOnLoad: false
});
wrapper.classList.add("has-ui");
player.addControls();
new P.player.ProgressBar(player, {
    position: "controls"
});
new P.player.ErrorHandler(player);
document.querySelector(".player").appendChild(player.root);
player.onprogress.subscribe(function(progress) {
    console.log("progress:", progress);
});
player.onload.subscribe(function() {
    console.log("loaded");
});
player.onstartload.subscribe(function() {
    console.log("startload");
});
player.onerror.subscribe(function(error) {
    console.log("error!");
});
player.onpause.subscribe(function(error) {
    console.log("paused");
});

//# sourceMappingURL=index.81fc9838.js.map
