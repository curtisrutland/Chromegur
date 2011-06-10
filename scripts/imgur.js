var recent = new Array();

function captureVisibleWindow(windowId){
	chrome.tabs.captureVisibleTab(windowId, { "format": "png" }, onCaptureVisibleTabCompleted)
}

function onCaptureVisibleTabCompleted(dataUrl){
	uploadImage(getBase64(dataUrl));
}

function uploadImage(image){
	setBadge("....", [255, 165, 0, 255]);
	$.post(config.api.uploadUrl, {
		"image": image,
		"key": config.api.key
	}, function(data){
		console.log(JSON.stringify(data));
		onSuccess(data);
	}).error(function(data) {
		console.log(JSON.stringify(data));
		onFailure(JSON.parse(data.responseText));
	});
}

function onSuccess(data){
	clearBadge();
	recent.push(data);
	chrome.tabs.create({
		'url': data.upload.links.original
	});
}

function onFailure(data){
	clearBadge();
	alert(data.error.message);
}

function getBase64(dataUrl){
	return dataUrl.split(",")[1];
}