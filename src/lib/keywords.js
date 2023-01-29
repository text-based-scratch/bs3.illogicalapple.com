export default {
  outer: [ // outside a block
    "on",
    "def",
    "float",
    "bool",
    "str",
    "load" // list definitions: str[] = ["a", "b", "c"]
  ],
  events: [
    "flag",
    "keydown",
    "click",
    "backdrop",
    "loudness",
    "clone",
    "timer" // message: on message1, on some_message
  ],
  inner: [
    "repeat",
    "forever",
    "if",
    "else",
    "elif",
    "while",
    "until"
  ]
}