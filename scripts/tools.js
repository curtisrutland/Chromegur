var Config = {
    api: { uploadUrl: "http://api.imgur.com/2/upload.json", key: "04d465deabb22c7558164bafd4c1781a" },
    allowedTypes: [ "image/jpeg", "image/png", "image/gif", "image/tiff", "image/x-tiff", "image/bmp", "image/x-windows-bmp", "image/xcf" ]
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