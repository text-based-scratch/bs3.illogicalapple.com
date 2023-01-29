import blocks from "../lib/all-blocks"

window.formatData = {
  motion: "4c97ff",
  looks: "9966ff",
  sound: "cf63cf",
  event: "de5b71",
  control: "ffab19",
  sensing: "5cb1d6",
  operators: "59c059",
  data: "ff8c1a",
  procedures: "ff6680",
  bool: "4781d1",
  keyword: "ff6680"
}

function escape(text) {
  return text.replaceAll("<", "&lt;", "&", "&amp;")
}
function format(lines) {
  lines.forEach(line => {
    let innerText = line.innerText.split(/[^a-z0-9\_]/i)
    let commonWords = innerText.filter(value => blocks.hasOwnProperty(value))
    line.innerHTML = line.innerHTML
      .replace(/\-?[0-9\.]*[0-9]/g, `<span class="number" style="color: #${formatData.operators}">$&</span>`)
      .replaceAll("true", `<span class="boolean" style="color: #${formatData.bool}">true</span>`)
      .replaceAll("false", `<span class="boolean" style="color: #${formatData.bool}">false</span>`)
    commonWords.forEach(word => {
      let blockType = blocks[word].opcode.split("_")[0]
      line.innerHTML = line.innerHTML.replaceAll(word, `<span class="function type-${blockType}" style="color: #${formatData[blockType]}">${escape(word)}</span>`)
    })
  })
  $("div.contenteditable").focus()
}

window.format = function aaa() {
  let target = document.querySelector("pre.text")
  let lines = target.querySelectorAll("div.line")
  format(lines)
}