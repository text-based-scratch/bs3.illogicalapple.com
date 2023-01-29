var player = new P.player.Player()
let playerWrapper = document.querySelector("div.player-wrapper")
let controlBackgroundThingy = document.createElement("div")

player.setOptions({ autoplayPolicy: "never" })
player.setOptions({ theme: "light" })
player.setOptions({ focusOnLoad: false })

controlBackgroundThingy.classList.add("control-background-thingy")
playerWrapper.classList.add("has-ui")
player.addControls()
player.root.prepend(controlBackgroundThingy)

new P.player.ErrorHandler(player)
document.querySelector(".player").appendChild(player.root)

player.onprogress.subscribe(function(progress) {
  console.log("progress:", progress)
});
player.onload.subscribe(function() {
  console.log("loaded")
});
player.onstartload.subscribe(function() {
  console.log("startload")
});
player.onerror.subscribe(function(error) {
  console.log("error!")
});
player.onpause.subscribe(function(error) {
  console.log("paused")
});