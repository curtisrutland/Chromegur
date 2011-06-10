function linkOnClick(info, tab) {
	uploadImage(info.linkUrl);
}

function imageOnClick(info, tab) {
	uploadImage(info.srcUrl);
}

function pageOnClick(info, tab){
	console.log(JSON.stringify(tab));
	captureVisibleWindow(tab.windowId);
}

function addMenuItem(title, context, callback) {
    chrome.contextMenus.create({ "title": title, "contexts": context, "onclick": callback });
}

addMenuItem("Try Rehosting Link", ["link"], linkOnClick);
addMenuItem("Rehost Image", ["image"], imageOnClick);
addMenuItem("Capture View", ["page"], pageOnClick);