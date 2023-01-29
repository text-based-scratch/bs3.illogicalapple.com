const $ = (...args) => document.querySelector(...args)

var caretPosition = [21, 0]
var code = ["load assets/empty.svg"]
var caretAnimationTimeoutID = null
var indentation = 0
var dragElement = null
var insertFileAt = null
var projectFiles = [
  {
    name: "Untitled Project",
    folder: true,
    children: [
      {
        name: "assets",
        folder: true,
        children: [
          {
            name: "empty.svg",
            type: "image/svg+xml",
            data: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIwIiBoZWlnaHQ9IjAiIHZpZXdCb3g9IjAsMCwwLDAiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiLz48L3N2Zz4="
          }
        ]
      }
    ]
  }
]
var project = {
  targets: [
    {
      name: "Sprite1",
      code: "",
      stage: false
    },
    {
      name: "Stage",
      code: "",
      stage: true
    }
  ],
  assets: [],
  _: {
    activeSprite: 0 // use sprite index thing
  }
}

function toKebabCase(str) {
  return str.replace(/\s/g, "-").toLowerCase()
}

function indent(amount) {
  code[caretPosition[1]] = "  ".repeat(amount) + code[caretPosition[1]]
  caretPosition[0] += 2 * amount
}

function updateFiles() {
  function updateFolder(files, element, path) {
    files.forEach((file, index) => {
      if(file.folder) {
        let folderWrapper = document.createElement("li")
        let folderElement = document.createElement("ul")
        folderWrapper.classList.add("file", "folder-wrapper", "file-target")
        folderElement.classList.add("folder")
        updateFolder(file.children, folderElement, path.concat([index]))
        folderWrapper.append(toKebabCase(file.name), folderElement)
        element.append(folderWrapper)
      } else {
        let fileElement = document.createElement("li")
        fileElement.classList.add("file")
        fileElement.dataset.path = path.concat([index]).join()
        fileElement.dataset.type = file.type
        fileElement.append(file.name)
        element.append(fileElement)
      }
    })
  }
  let rootFolder = $("ul.root-folder")
  $("span.project-name").innerText = toKebabCase(projectFiles[0].name)
  rootFolder.replaceChildren()
  updateFolder(projectFiles[0].children, rootFolder, [])
  project.assets = projectFiles[0].children
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
  project.targets[project._.activeSprite].code = code.join("\n")
}

function pauseCaret() {
  if($("div.text-editor div.caret").classList.contains("animation")) {
    $("div.text-editor div.caret").classList.remove("animation")
    if(caretAnimationTimeoutID) clearTimeout(caretAnimationTimeoutID)
    caretAnimationTimeoutID = setTimeout(() => $("div.text-editor div.caret").classList.add("animation"), 500)
  }
}

addEventListener("load", function() {
  updateFiles()
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
    } else if(event.key == "ArrowUp") {
      if(caretPosition[1] > 0) {
        caretPosition[1]--
        caretPosition[0] = Math.min(caretPosition[0], code[caretPosition[1]].length)
      } else caretPosition = [0, 0]
      inputHandler()
    } else if(event.key == "ArrowDown") {
      if(caretPosition[1] < code.length - 1) {
        caretPosition[1]++
        caretPosition[0] = Math.min(caretPosition[0], code[caretPosition[1]].length)
      } else caretPosition = [code[code.length - 1].length, code.length - 1]
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
  
  $("div.files").addEventListener("click", event => {
    if(event.target.matches("div.files span.project-name, li.folder-wrapper")) event.target.toggleAttribute("data-closed")
  })

  $("div.files").addEventListener("dragenter", e => {
    console.log(e.dataTransfer.items[0].getAsFile())
    // let filename = e.dataTransfer.items[0].getAsFile().name
    dragElement = e.target
    e.preventDefault()
    dragElement.classList.add("file-drag")
    $("div.files").style.setProperty("--filename-to-add", `"[drop to add]"`)
    insertFileAt = $(":is(.file-drag.folder li:last-child, .file-drag > ul.folder li:last-child, li.file.file-drag:not(.folder-wrapper))")
  })
  $("div.files").addEventListener("dragover", e => {
    dragElement = e.target
    e.preventDefault()
    dragElement.classList.add("file-drag")
    insertFileAt = $(":is(.file-drag.folder li:last-child, .file-drag > ul.folder li:last-child, li.file.file-drag:not(.folder-wrapper))")
  })
  $("div.files").addEventListener("dragleave", e => {
    if(e.target == dragElement) dragElement = null
    e.preventDefault()
    e.target.classList.remove("file-drag")
    insertFileAt = $(":is(.file-drag.folder li:last-child, .file-drag > ul.folder li:last-child, li.file.file-drag:not(.folder-wrapper))")
  })
  $("div.files").addEventListener("drop", e => {
    let thingToChange = projectFiles[0]
    dragElement = null
    e.preventDefault()
    e.target.classList.remove("file-drag")
    insertFileAt.dataset.path.split(",").forEach((element, index, array) => {
      if(index == array.length - 1) {
        let reader = new FileReader()
        let file = e.dataTransfer.items[0].getAsFile()
        reader.addEventListener("load", () => {
          thingToChange.children.splice(element + 1, 0, {
            name: file.name,
            type: file.type,
            data: reader.result
          })
          updateFiles(projectFiles)
        })
        reader.readAsDataURL(file)
      } else {
        thingToChange = thingToChange.children[element]
      }
    })
    insertFileAt = null
  })
  $("input.title").addEventListener("change", event => {
    projectFiles[0].name = event.target.value
    $("span.project-name").innerText = toKebabCase(event.target.value)
  })
  $("button.new-sprite").addEventListener("click", () => {
    let spriteName = 1
    let newSpriteElement = document.createElement("div")
    let newSpriteNameElement = document.createElement("div")
    project._.activeSprite = project.targets.length
    while(project.targets.find(e => e.name == "Sprite" + spriteName)) {
      spriteName++
    }
    project.targets.push({
      name: "Sprite" + spriteName,
      code: "load assets/empty.svg",
      stage: false
    })
    $("div.sprites div.sprite.active").classList.remove("active")
    newSpriteNameElement.append("Sprite" + spriteName)
    newSpriteNameElement.classList.add("sprite-name")
    newSpriteElement.classList.add("sprite", "flex", "active")
    newSpriteElement.dataset.index = project.targets.length - 1
    newSpriteElement.append(newSpriteNameElement)
    $("div.sprites").append(newSpriteElement)
    code = ["load assets/empty.svg"]
    caretPosition = [21, 0]
    inputHandler()
  })
  $("div.sprites").addEventListener("click", event => {
    if(event.target.closest(".sprite")) {
      $("div.sprites div.sprite.active").classList.remove("active")
      event.target.closest(".sprite").classList.add("active")
      project._.activeSprite = event.target.closest(".sprite").dataset.index
      code = project.targets[project._.activeSprite].code.split("\n")
      caretPosition = [code[code.length - 1].length, code.length - 1]
      inputHandler()
    }
  })
  inputHandler()
  player.loadProjectById(792509530) // load empty project
})