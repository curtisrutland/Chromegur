var Imgur = function () { 
	Imgur.instance = this;
};

Imgur.prototype.onUploadSucceeded = function (data) {
    Tools.clearBadge();
    if (!Tools.checkData(data)) {
        alert("Invalid data received from Imgur!");
        return;
    }
    Tools.Storage.appendToRecent(data);
    Tools.createImageTab(data.upload.links.original);
};

Imgur.prototype.onUploadFailed = function (data) {
    Tools.setErrorBadge();
	var message;
	if(!data.responseText) message = "Unknown error.";
	else 
		message = JSON.parse(data.responseText).error.message;
    alert(message);
};

Imgur.prototype.uploadImage = function (image, success, error) {
	
    Tools.setBadge("....", [255, 165, 0, 255]);
    var data = { "image": image, "key": Config.api.key };
    if (!success) success = this.onUploadSucceeded;
    if (!error) error = this.onUploadFailed;
    $.post(Config.api.uploadUrl, data, success).error(error);
};

Imgur.prototype.onCaptureVisibleWindowCompleted = function (dataUrl) {
    var b64 = Tools.getBase64FromDataUrl(dataUrl);
    Imgur.instance.uploadImage(b64);
};

Imgur.prototype.captureVisibleWindow = function (windowId) {
    Tools.captureVisibleWindow(windowId, this.onCaptureVisibleWindowCompleted);
};


