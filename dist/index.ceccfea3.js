const $ = (...args)=>document.querySelector(...args);
async function openProject(event) {
    let file = event.target.files[0];
    if (file) player.loadProjectFromFile(file);
}
function pauseCaret() {
    if ($("div.text-editor div.caret").classList.contains("animation")) {
        $("div.text-editor div.caret").classList.remove("animation");
        setTimeout(()=>$("div.text-editor div.caret").classList.add("animation"), 500);
    }
}
addEventListener("load", function() {
    $("div.text-editor").addEventListener("click", ()=>{
        pauseCaret();
        setTimeout(()=>$("div.contenteditable").focus(), 0);
    });
    $("div.contenteditable").addEventListener("input", ()=>{
        $("div.text-editor pre.text").innerText = $("div.contenteditable").innerText;
        pauseCaret();
        if ($("div.contenteditable").innerText == "") $("div.contenteditable").innerHTML = "&nbsp;";
    });
    $("div.contenteditable").addEventListener("keydown", ()=>{
        var selection = getSelection();
    });
    $("input.load-file").addEventListener("change", openProject);
});

//# sourceMappingURL=index.ceccfea3.js.map
