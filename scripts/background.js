var imgur = new Imgur();

function onClickLink(info, tab) {
	imgur.uploadImage(info.linkUrl);
}

function onClickImage(info, tab) {
	imgur.uploadImage(info.srcUrl);
}

function onClickPage(info, tab) {
	imgur.captureVisibleWindow(tab.windowId);
}

Tools.addMenuItem("Try Rehosting Link", ["link"], onClickLink);
Tools.addMenuItem("Rehost Image", ["image"], onClickImage);
Tools.addMenuItem("Capture View", ["page"], onClickPage);

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({
		'url': chrome.extension.getURL('html/action.html')
	});
});