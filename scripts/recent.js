function getRecent(){
	console.log("calling getRecent");
	chrome.extension.sendRequest({"action": "getRecent"}, function(response){
		var recent = response.data;
		if(recent.length > 0){
			$("#recent").empty();
			for(i=0; i<recent.length; i++){
				var d = getDiv(recent[i]);
				d.appendTo("#recent");
			}
		}
	});
}

function getDiv(data){
	var links = data.upload.links;
	var div = 
("<div class='recentSideload'>" +
"<a href='{0}'>Original: {0}</a><p/>" +
"<a href='{1}'>Imgur Page: {1}</a><p/>" +
"<a href='{2}'>Delete Page: {2}</a><p/>" +
"<a href='{3}'>Small Square: {3}</a><p/>" +
"<a href='{4}'>Large Thumb: {4}</a><p/>" +
"<a href='{0}'><img src='{0}'/></a>" +
"</div>").format(links.original, links.imgur_page, links.delete_page, links.small_square, links.large_thumbnail);
	return $(div);
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};