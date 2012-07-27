var imgur = new Imgur();

function onDrag() {
    console.log("dragging");
}

function onDrop(dataUrl) {
    console.log("dropped");
    console.log(dataUrl);
    var b64 = Tools.getBase64FromDataUrl(dataUrl);
    imgur.uploadImage(b64);
}

Dragger.bind(onDrag, onDrop);

$("html").pasteImageReader(function (result) {
    console.log("pasted");
    console.log(result);
    var b64 = Tools.getBase64FromDataUrl(result.dataURL);
    imgur.uploadImage(b64);
});