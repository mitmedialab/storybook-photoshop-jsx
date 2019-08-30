#include save-image-png.jsx
#include get-layers.jsx

function saveLayers(options) {
    var storybook = Folder.selectDialog("select folder"); // select folder that has folders of psd files in it

    if (storybook) {

        var storyFolders = storybook.getFiles(function(f) { return f instanceof Folder; });

        //individual story folder
        for (var m = 0; m < storyFolders.length; m++) {

            try {
                var theFiles = storyFolders[m].getFiles("*.psd");
            } catch (e) {
                var theFiles = [];
            }

            //individual file
            for (var n = 0; n < theFiles.length; n++) {

                app.open(File(theFiles[n]))
                var doc = app.activeDocument;

                //folder for processed files
                //f = new Folder(doc.path + "_png/");
                f = new Folder(doc.path + "_png_compressed/" + doc.name.slice(0, doc.name.length-4));

                if (!f.exists) {
                    f.create();
                }

                //automatic resizing so that width is 1024 and height is scaled by same amount
                //if (doc.width > 1024) {
                //	var ratio = UnitValue(1024,"px")/doc.width;
                //    var width = UnitValue(1024,"px");
                //    var height = UnitValue(Math.round(ratio*doc.height),"px");
                    
		        //    doc.resizeImage(width,height,null,ResampleMethod.BICUBIC);
		        //    doc.resizeCanvas(width,height);
		        //}


                var layerData = getLayerData();
                var layers = layerData.layers;

                //get one layer at a time and save them
                for (var i=0; i < layers.length; i++) {
                    if (layers.length > 1) {
                        hideAllLayers();
                    }

                    var layer = layers[i];
                    showLayerWithLayerName(layer.name);

                    //save the renamed / edited file to the jpg folder
                    //var name = doc.path + "_png/" + doc.name.slice(0, doc.name.length-4) + "_" + layer.name + ".png";
                    var name = doc.path + "_png_compressed/" + doc.name.slice(0, doc.name.length-4) + "/" + layer.name + ".png";
                    savePng(name);
                }
            }
        }
    }
    alert("Done Processing.");
}

function showAllLayers() {
    var doc = app.activeDocument;
    for(var i = 0 ; i < doc.layers.length;i++){
    	if (doc.layers[i].visible != true) {
	        doc.layers[i].visible = true;
    	}
	}
}

function hideAllLayers() {
    var doc = app.activeDocument;
    for(var i = 0 ; i < doc.layers.length;i++){
    	if (doc.layers[i].visible != false) {
        	doc.layers[i].visible = false;
    	}
    }
}

function showLayerWithLayerName(layerName) {
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    if (layer.visible != true) {
    	layer.visible = true;
	}
}

function hideLayerWithLayerName(layerName) {
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    if (layer.visible != false) {
    	layer.visible = false;
	}
}