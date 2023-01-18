const $ = (...args) => document.querySelector(...args)

var caretPosition = [0, 0]
var code = [""]
var caretAnimationTimeoutID = null
var indentation = 0

async function openProject(event) {
  let file = event.target.files[0]
  if(file) player.loadProjectFromFile(file)
}

function indent(amount) {
  code[caretPosition[1]] = "  ".repeat(amount) + code[caretPosition[1]]
  caretPosition[0] += 2 * amount
}

function inputHandler(thing) {
  let caret = document.createElement("div")
  let textToAdd = $("div.contenteditable").innerText.substring(0, $("div.contenteditable").innerText.length - 1)
  let editor = $("div.text-editor pre.text")
  editor.replaceChildren()
  caret.classList.add("caret", "animation")
  if(textToAdd == "\n") {
    if([...code[caretPosition[1]]].pop() == ":") {
      indentation++
    }
    caretPosition[1]++
    caretPosition[0] = 0
    code.push("")
    textToAdd = ""
    indent(indentation)
  }
  code.forEach((element, index) => {
    let line = document.createElement("div")
    line.classList.add("line")
    line.dataset.lineId = index // would make it lineID but then the attribute would be data-line-i-d
    editor.append(line)
    if(index == caretPosition[1]) {
      line.classList.add("active")
      line.append(caret)
      line.insertBefore(document.createTextNode(element.substring(0, caretPosition[0])), caret)
      line.insertBefore(document.createTextNode(textToAdd), caret)
      line.append(document.createTextNode(element.substring(caretPosition[0])))
    } else {
      line.append(document.createTextNode(element))
    }
  })
  code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0]) + textToAdd + code[caretPosition[1]].substring(caretPosition[0])
  caretPosition[0] += textToAdd.length
  pauseCaret()
  $("div.contenteditable").innerHTML = "&nbsp;"
  autocomplete()
  format()
}

function pauseCaret() {
  if($("div.text-editor div.caret").classList.contains("animation")) {
    $("div.text-editor div.caret").classList.remove("animation")
    if(caretAnimationTimeoutID) clearTimeout(caretAnimationTimeoutID)
    caretAnimationTimeoutID = setTimeout(() => $("div.text-editor div.caret").classList.add("animation"), 500)
  }
}

addEventListener("load", function() {
  $("div.text-editor pre.text").addEventListener("click", () => {
    inputHandler()
    pauseCaret()
    $("div.contenteditable").focus()
  })
  $("div.contenteditable").addEventListener("input", inputHandler)
  $("div.text-editor pre.text").addEventListener("scroll", autocomplete)
  $("div.contenteditable").addEventListener("keydown", event => {
    if(event.key == "Tab") {
      event.preventDefault()
      indentation++
      indent(1)
      inputHandler()
    } else if(event.key == "ArrowLeft") {
      if(caretPosition[0] > 0) caretPosition[0]--
      else if(caretPosition[1] > 0) {
        caretPosition[1]--
        caretPosition[0] = code[caretPosition[1]].length
      }
      inputHandler()
    } else if(event.key == "ArrowRight") {
      if(caretPosition[0] < code[caretPosition[1]].length) caretPosition[0]++
      else if(caretPosition[1] < code.length - 1) {
        caretPosition[1]++
        caretPosition[0] = 0
      }
      inputHandler()
    } else if(event.key == "Backspace") {
      if(caretPosition[0] > 0) {
        code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0] - 1) + code[caretPosition[1]].substring(caretPosition[0])
        caretPosition[0]--
        if(/([\s\u00A0]{2})+/.exec(code[caretPosition[1]])) {
          indentation = /([\s\u00A0]{2})+/.exec(code[caretPosition[1]])[0].length / 2
        } else indentation = 0
        inputHandler()
      } else if(caretPosition[1] > 0) {
        caretPosition[0] = code[caretPosition[1] - 1].length
        code[caretPosition[1] - 1] += code[caretPosition[1]]
        code.splice(caretPosition[1], 1)
        caretPosition[1]--
        if(/([\s\u00A0]{2})+/.exec(code[caretPosition[1]])) {
          indentation = /([\s\u00A0]{2})+/.exec(code[caretPosition[1]])[0].length / 2
        } else indentation = 0
        inputHandler()
      }
    } else if(event.key == "Delete") {
      if(caretPosition[0] < code[caretPosition[1]].length) {
        code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0]) + code[caretPosition[1]].substring(caretPosition[0] + 1)
        if(/([\s\u00A0]{2})+/.exec(code[caretPosition[1]])) {
          indentation = /([\s\u00A0]{2})+/.exec(code[caretPosition[1]])[0].length / 2
        } else indentation = 0
        inputHandler()
      }
    }
  })
  
  $("input.load-file").addEventListener("change", openProject)
  
  $("div.files").addEventListener("click", event => {
    if(event.target.matches("div.files span.project-name, li.folder-wrapper")) event.target.toggleAttribute("data-closed")
  })
})