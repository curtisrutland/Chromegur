var Config = {
    api: {
        "uploadUrl": "http://api.imgur.com/2/upload.json",
        "key": "04d465deabb22c7558164bafd4c1781a"
    },
    allowedTypes: [
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/tiff",
		"image/x-tiff",
		"image/bmp",
		"image/x-windows-bmp",
		"image/xcf"
	]
};

var Tools = {
    setBadge: function (text, color) {
        var textObj = { text: text };
        var colorObj = { color: color };
        chrome.browserAction.setBadgeBackgroundColor(colorObj);
        chrome.browserAction.setBadgeText(textObj);
    },

    setErrorBadge: function () {
        Tools.setBadge("err", [255, 0, 0, 255]);
        setTimeout(Tools.clearBadge, 3000);
    },

    clearBadge: function () {
        Tools.setBadge("", [0, 255, 0, 0]);
    },

    captureVisibleWindow: function (windowId, callback) {
        chrome.tabs.captureVisibleTab(windowId, { "format": "png" }, callback);
    },

    createImageTab: function (url) {
        chrome.tabs.create({ "url": url });
    },

    addMenuItem: function (title, context, callback) {
        chrome.contextMenus.create({ "title": title, "contexts": context, "onclick": callback });
    },

    getBase64FromDataUrl: function (dataUrl) {
        return dataUrl.split(",")[1];
    },

    checkData: function(data){
        return data && data.upload && data.upload.links && data.upload.links.original;
    },

    Storage: {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        getRecent: function () {
            var recent = Tools.Storage.get("recent");
            if (!(recent instanceof Array)) return [];
            return recent;
        },

        appendToRecent: function (data) {
            var recent = Tools.Storage.getRecent();
            recent.push(data);
            Tools.Storage.set("recent", recent);
        }
    }
};

var Imgur = function () { };

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
    alert(data.error.message);
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
    this.uploadImage(b64);
};

Imgur.prototype.captureVisibleWindow = function (windowId) {
    Tools.captureVisibleWindow(windowId, this.onCaptureVisibleWindowCompleted);
};


