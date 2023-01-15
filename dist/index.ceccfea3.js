const $ = (...args)=>document.querySelector(...args);
var caretPosition = [
    0,
    0
];
var code = [
    ""
];
var caretAnimationTimeoutID = null;
async function openProject(event) {
    let file = event.target.files[0];
    if (file) player.loadProjectFromFile(file);
}
function inputHandler() {
    let caret = document.createElement("div");
    let textToAdd = $("div.contenteditable").innerText.substring(0, $("div.contenteditable").innerText.length - 1);
    let editor = $("div.text-editor pre.text");
    editor.replaceChildren();
    caret.classList.add("caret", "animation");
    if (textToAdd == "\n") {
        caretPosition[1]++;
        caretPosition[0] = 0;
        code.push("");
        textToAdd = "";
    }
    code.forEach((element, index)=>{
        let line = document.createElement("div");
        line.classList.add("line");
        line.dataset.lineId = index // would make it lineID but then the attribute would be data-line-i-d
        ;
        editor.append(line);
        if (index == caretPosition[1]) {
            line.classList.add("active");
            line.append(caret);
            line.insertBefore(document.createTextNode(element.substring(0, caretPosition[0])), caret);
            line.insertBefore(document.createTextNode(textToAdd), caret);
            line.append(document.createTextNode(element.substring(caretPosition[0])));
        } else line.append(document.createTextNode(element));
    });
    code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0]) + textToAdd + code[caretPosition[1]].substring(caretPosition[0]);
    caretPosition[0] += textToAdd.length;
    pauseCaret();
    $("div.contenteditable").innerHTML = "&nbsp;";
    autocomplete();
}
function pauseCaret() {
    if ($("div.text-editor div.caret").classList.contains("animation")) {
        $("div.text-editor div.caret").classList.remove("animation");
        if (caretAnimationTimeoutID) clearTimeout(caretAnimationTimeoutID);
        caretAnimationTimeoutID = setTimeout(()=>$("div.text-editor div.caret").classList.add("animation"), 500);
    }
}
addEventListener("load", function() {
    $("div.text-editor pre.text").addEventListener("click", ()=>{
        inputHandler();
        pauseCaret();
        $("div.contenteditable").focus();
    });
    $("div.contenteditable").addEventListener("input", inputHandler);
    $("div.contenteditable").addEventListener("keydown", (event)=>{
        if (event.key == "ArrowLeft") {
            if (caretPosition[0] > 0) caretPosition[0]--;
            else if (caretPosition[1] > 0) {
                caretPosition[1]--;
                caretPosition[0] = code[caretPosition[1]].length;
            }
            inputHandler();
        }
        if (event.key == "ArrowRight") {
            if (caretPosition[0] < code[caretPosition[1]].length) caretPosition[0]++;
            else if (caretPosition[1] < code.length - 1) {
                caretPosition[1]++;
                caretPosition[0] = 0;
            }
            inputHandler();
        }
        if (event.key == "Backspace") {
            if (caretPosition[0] > 0) {
                code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0] - 1) + code[caretPosition[1]].substring(caretPosition[0]);
                caretPosition[0]--;
                inputHandler();
            }
        }
        if (event.key == "Delete") {
            if (caretPosition[0] < code[caretPosition[1]].length) {
                code[caretPosition[1]] = code[caretPosition[1]].substring(0, caretPosition[0]) + code[caretPosition[1]].substring(caretPosition[0] + 1);
                inputHandler();
            }
        }
    });
    $("input.load-file").addEventListener("change", openProject);
});

//# sourceMappingURL=index.ceccfea3.js.map
