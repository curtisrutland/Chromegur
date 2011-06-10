function setBadge(text, color) {
    var textObj = { text: text };
    var colorObj = { color: color };
    chrome.browserAction.setBadgeBackgroundColor(colorObj);
    chrome.browserAction.setBadgeText(textObj);
}

function clearBadge() {
    setBadge("", [0, 255, 0, 0]);
}