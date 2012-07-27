$(document).on("ready", function () {
    var recent = Tools.Storage.getRecent();
    var $uploads = $("#uploads");
    for (var i = recent.length - 1; i >= 0; i--) {
        var entry = createTableForEntry(recent[i]);
        $uploads.append(entry);
        $uploads.append("<hr />");
    }
});

function createTableForEntry(entry) {
    var hash = entry.upload.image.hash;
    var tableId = hash + "Table";

    var $table = $("#referenceTable").clone();
    $table.attr("id", tableId);

    var original = entry.upload.links.original;
    var imgurPage = entry.upload.links.imgur_page;
    var deletePage = entry.upload.links.delete_page;
    var smallSquare = entry.upload.links.small_square;
    var thumbnail = entry.upload.links.large_thumbnail;
    var uploadedOn = new Date(entry.upload.image.datetime).toString();

    createRow($table, hash, "Original", original);
    createRow($table, hash, "ImgurPage", imgurPage);
    createRow($table, hash, "DeletePage", deletePage);
    createRow($table, hash, "SmallSquare", smallSquare);
    createRow($table, hash, "LargeThumbnail", thumbnail);
    createRow($table, hash, "UploadedOn", uploadedOn);

    $table.find("#referenceThumbnailImage").attr("src", smallSquare).attr("id", hash + "ThumbnailImage");

    //    var originalId = hash + "Original";
    //    $table.find("#referenceOriginalLabel").attr("for", originalId).attr("id", originalId + "Label");
    //    $table.find("#referenceOriginal").val(original).attr("id", originalId);


    //    var imgurPageId = hash + "ImgurPage";
    //    $table.find("#referenceImgurPageLabel").attr("for", imgurPageId).attr("id", imgurPageId + "Label");
    //    $table.find("#referenceImgurPage").val(imgurPage).attr("id", imgurPageId);

    //    
    //    var deletePageId = hash + "DeletePage";
    //    $table.find("#referenceDeletePageLabel").attr("for", deletePageId).attr("id", deletePageId + "Label");
    //    $table.find("#referenceDeletePage").val(deletePage).attr("id", deletePageId);

    //    
    //    var smallSquareId = hash + "SmallSquare";
    //    $table.find("#referenceSmallSquareLabel").attr("for", smallSquareId).attr("id", smallSquareId + "Label");
    //    $table.find("#referenceSmallSquare").val(smallSquare).attr("id", smallSquareId);

    //    
    //    var thumbnailId = hash + "LargeThumbnail";
    //    $table.find("#referenceLargeThumbnailLabel").attr("for", thumbnailId).attr("id", thumbnailId + "Label");
    //    $table.find("#referenceLargeThumbnail").val(thumbnail).attr("id", thumbnailId);
    //    

    //    
    //    var uploadedOnId = hash + "UploadedOn";
    //    $table.find("#referenceUploadedOnLabel").attr("for", uploadedOnId).attr("id", uploadedOnId + "Label");
    //    $table.find("#referenceUploadedOn").val(uploadedOn).attr("id", uploadedOnId);

    return $table;
}

function createRow($table, hash, name, val) {
    var id = hash + name;
    var refLabelId = "#reference" + name + "label";
    var refId = "#reference" + name;

    $table.find(refLabelId).attr("for", id).attr("id", id + "Label");
    $table.find(refId).val(val).attr("id", id);
}