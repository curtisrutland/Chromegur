$(document).on("ready", function () {
	$("#recentLink").on("click", function () {
		chrome.tabs.create({ url: chrome.extension.getURL("html/recent.html") });
	});

	$("#pasteDragLink").on("click", function () {
		chrome.tabs.create({ url: chrome.extension.getURL("html/manual.html") });
	});

	$("#settingsLink").on("click", function () {

	});
});