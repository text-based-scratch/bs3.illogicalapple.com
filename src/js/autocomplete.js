import blocks from "../lib/all-blocks"

let completeEl = $("ul.autocomplete")
let tempListener = () => selectListener(activeWord)

function selectListener(event, activeWord) {
  if(event.key == "ArrowDown") {
    event.stopPropagation()
    if(Number(completeEl.dataset.activeIndex) < completeEl.childNodes.length - 1) {
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.remove("active")
      completeEl.dataset.activeIndex++
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.add("active")
    } else {
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.remove("active")
      completeEl.dataset.activeIndex = 0
      completeEl.childNodes[0].classList.add("active")
    }
  } else if(event.key == "ArrowUp") {
    event.stopPropagation()
    if(Number(completeEl.dataset.activeIndex) > 0) {
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.remove("active")
      completeEl.dataset.activeIndex--
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.add("active")
    } else {
      completeEl.childNodes[0].classList.remove("active")
      completeEl.dataset.activeIndex = completeEl.childNodes.length - 1
      completeEl.childNodes[Number(completeEl.dataset.activeIndex)].classList.add("active")
    }
  }
}

window.autocomplete = () => {
  let wrap = false
  let candidates = []
  let activeWord = $("pre.text").querySelectorAll("div.line")[caretPosition[1]].innerText.split(/[^a-z0-9\_]/i)
  activeWord = activeWord[activeWord.length - 1]
  completeEl.style.display = "block"
  completeEl.dataset.activeIndex = 0
  if(activeWord != "") {
    let validBlocks = {}
    for(block in blocks) {
      if(blocks[block].keyword == "outer" || (blocks[block].opcode.split("_")[0] == "event" && !["event_broadcast", "event_broadcastandwait"].includes(blocks[block].opcode))) {
        if(indentation == 0) validBlocks[block] = blocks[block]
      } else if(indentation != 0) validBlocks[block] = blocks[block]
    }
    let goodCandidates = Object.entries(validBlocks).filter(block => block[0].startsWith(activeWord))
    let worseCandidates = Object.entries(validBlocks).filter(block => block[0].includes(activeWord))
    let candidateBlocks = []
    goodCandidates.concat(worseCandidates).forEach(candidate => {
      if(!candidateBlocks.map(e => e[1].opcode).includes(candidate[1].opcode)) {
        candidateBlocks.push(candidate)
      }
    })
    if(candidateBlocks.length > 0) {
      completeEl.style.left = `calc(${caretPosition[0]}ch + 2rem + ${String(caretPosition[1] + 1).length}ch)`
      completeEl.style.top = `calc(${(caretPosition[1] + (!wrap)) * 1.25}em - ${$("pre.text").scrollTop + completeEl.getBoundingClientRect().height * wrap}px)`
      candidateBlocks.forEach((candidate, index) => {
        let element = document.createElement("li")
        element.classList.add("candidate")
        if(index == Number(completeEl.dataset.activeIndex)) element.classList.add("active")
        element.innerText = candidate[0]
        element.style.setProperty("--candidate-color", `#${formatData[candidate[1].opcode.split("_")[0]]}`)
        candidates.push(element)
      })
      completeEl.replaceChildren(...candidates)
      tempListener = e => selectListener(e, activeWord)
      $("div.contenteditable").addEventListener("keydown", tempListener)
    } else {
      completeEl.style.display = "none"
      $("div.contenteditable").removeEventListener("keydown", tempListener)
    }
  } else { 
    completeEl.style.display = "none"
    $("div.contenteditable").removeEventListener("keydown", tempListener)
  }
}