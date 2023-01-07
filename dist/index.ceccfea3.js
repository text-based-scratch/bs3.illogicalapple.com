const $ = (...args)=>document.querySelector(...args);
addEventListener("load", function() {
    $("div.text-editor").addEventListener("click", ()=>setTimeout(()=>$("div.contenteditable").focus(), 0));
    $("div.contenteditable").addEventListener("input", ()=>{
        $("div.text-editor pre.text").innerText = $("div.contenteditable").innerText;
        if ($("div.text-editor div.caret").classList.contains("animation")) {
            $("div.text-editor div.caret").classList.remove("animation");
            setTimeout(()=>$("div.text-editor div.caret").classList.add("animation"), 1000);
        }
        if ($("div.contenteditable").innerText == "") $("div.contenteditable").innerHTML = "&nbsp;";
    });
});

//# sourceMappingURL=index.ceccfea3.js.map
