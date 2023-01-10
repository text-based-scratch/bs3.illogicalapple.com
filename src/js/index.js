const $ = (...args) => document.querySelector(...args)

var caretPosition = 0
var code = ""

async function openProject(event) {
  let file = event.target.files[0]
  if(file) player.loadProjectFromFile(file)
}

function inputHandler() {
  let caret = document.createElement("div")
  let textToAdd = $("div.contenteditable").innerText.substring(0, $("div.contenteditable").innerText.length - 1)
  let editor = $("div.text-editor pre.text")
  console.log($("div.contenteditable").innerHTML)
  editor.replaceChildren()
  caret.classList.add("caret", "animation")
  editor.append(caret)
  editor.insertBefore(document.createTextNode(code.substring(0, caretPosition)), caret)
  editor.insertBefore(document.createTextNode(textToAdd), caret)
  editor.append(document.createTextNode(code.substring(caretPosition)))
  console.log(code.substring(caretPosition))
  code = code.substring(0, caretPosition) + textToAdd + code.substring(caretPosition)
  caretPosition += textToAdd.length
  pauseCaret()
  $("div.contenteditable").innerHTML = "&nbsp;"
}

function pauseCaret() {
  if($("div.text-editor div.caret").classList.contains("animation")) {
    $("div.text-editor div.caret").classList.remove("animation")
    setTimeout(() => $("div.text-editor div.caret").classList.add("animation"), 500)
  }
}

addEventListener("load", function() {
  $("div.text-editor").addEventListener("click", () => {
    pauseCaret()
    setTimeout(() => $("div.contenteditable").focus(), 0)
  })
  $("div.contenteditable").addEventListener("input", inputHandler)
  $("div.contenteditable").addEventListener("keydown", event => {
    if(event.key == "ArrowLeft") {
      if(caretPosition > 0) caretPosition--
      inputHandler()
    }
    if(event.key == "ArrowRight") {
      if(caretPosition < code.length) caretPosition++
      inputHandler()
    }
    if(event.key == "Backspace") {
      if(caretPosition > 0) {
        code = code.substring(0, caretPosition - 1) + code.substring(caretPosition)
        caretPosition--
        inputHandler()
      }
    }
    if(event.key == "Delete") {
      if(caretPosition < code.length) {
        code = code.substring(0, caretPosition) + code.substring(caretPosition + 1)
        inputHandler()
      }
    }
  })
  
  $("input.load-file").addEventListener("change", openProject)
})