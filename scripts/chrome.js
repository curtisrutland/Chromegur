function setBadge(text, color) {
    var textObj = { text: text };
    var colorObj = { color: color };
    chrome.browserAction.setBadgeBackgroundColor(colorObj);
    chrome.browserAction.setBadgeText(textObj);
}

function clearBadge() {
    setBadge("", [0, 255, 0, 0]);
}

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({
		'url': chrome.extension.getURL('html/action.html')
	});    
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	console.log(JSON.stringify(request));
	if(request.action == "getRecent"){
		console.log("sending array");
		sendResponse({"data": recent});
	}
	else{
		console.log("sending blank");
		sendResponse({});
	}
});