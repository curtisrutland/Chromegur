//adapted from the code here:
//http://www.html5rocks.com/en/tutorials/file/dndfiles/

var Dragger = {
    bind: function (onDrag, onDrop) {

        this.onDrag = onDrag;
        this.onDrop = onDrop;

        $(document).on("dragover", function (event) {
            var evt = event.originalEvent;
            evt.stopPropagation();
            evt.preventDefault();
            onDrag();
        });

        $(document).on("drop", function (event) {
            var evt = event.originalEvent;
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files;
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type) continue;

                if (Config.allowedTypes.indexOf(f.type) < 0) {
                    continue;
                }

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        var dataUrl = e.target.result;
                        onDrop(dataUrl);
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            }
        });
    }
};