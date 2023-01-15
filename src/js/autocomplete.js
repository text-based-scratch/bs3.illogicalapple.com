import blocks from "../lib/blocks.js"

let formatData = {
  motion: "4C97FF",
  looks: "9966FF",
  sound: "CF63CF",
  event: "FFBF00",
  control: "FFAB19",
  sensing: "5CB1D6",
  operators: "59C059",
  data: "FF8C1A",
  procedures: "FF6680"
}

function complete() {}
function format(lines) {
  let formatRegex = "([^\\w]|)KEYWORD([^\\w]|)" // the double backslashes are normal backslashes
  lines.forEach(line => {
    let innerText = line.innerText.split(/[^(\w|\_)]/)
    let textNodes = []
    let offset = 0
    let keywordRegex = new RegExp(formatRegex.replace("KEYWORD", ""), "g")
    innerText.forEach(word => {
      if(blocks.hasOwnProperty(word)) {
        let wordRange = document.createRange()
        let blockType = blocks[word].opcode.split("_")[0]
        let span = document.createElement("span")
        span.classList.add("function", `function-${blockType}`)
        span.style.color = `#${formatData[blockType]}`
        wordRange.setStart(line, offset)
        if(offset + word.length - 1 > 0) wordRange.setEnd(line, offset + word.length - 1)
        else wordRange.setEnd(line, 0)
        textNodes.push({ wordRange, span })
      } else {
        let wordRange = document.createRange()
        let span = document.createElement("span")
        span.classList.add("normal-text")
        wordRange.setStart(line, offset)
        if(offset + word.length - 1 > 0) wordRange.setEnd(line, offset + word.length - 1)
        else wordRange.setEnd(line, 0)
        textNodes.push({ wordRange, span })
      }
      offset += word.length + 1
    })
    textNodes.forEach(node => {
      node.wordRange.surroundContents(node.span)
    })
  })
  $("div.contenteditable").focus()
}

window.autocomplete = function autocomplete() {
  let target = document.querySelector("pre.text")
  let lines = target.querySelectorAll("div.line")
  format(lines)
}