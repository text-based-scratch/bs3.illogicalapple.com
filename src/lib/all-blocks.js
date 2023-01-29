import b from "./blocks"
import k from "./keywords"

let keywords = {}

for(let word of k.outer) {
  keywords[word] = {
    keyword: "outer",
    opcode: "keyword_" + word.replaceAll("_", "")
  }
}

for(let word of k.inner) {
  keywords[word] = {
    keyword: "inner",
    opcode: "keyword_" + word.replaceAll("_", "")
  }
}

for(let word of k.events) {
  keywords[word] = {
    opcode: "event_" + word.replaceAll("_", "")
  }
}

export default Object.assign(b, keywords)