#include json2.js
#include get-layers.jsx
#include get-layer-path.jsx
#include export-svg.jsx
#include get-path-data.jsx
#include get-bounds.jsx
#include save-image.jsx

function getBezierPath(options) {
    var storybook = Folder.selectDialog("select folder");

    if (storybook) {
        var storyFolders = storybook.getFiles(function(f) { return f instanceof Folder; });
    
        //individual story folder
        if (options && options.resize && options.resize.width && options.resize.height) {
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

                    var width = UnitValue(options.resize.width,"px");
                    var height = UnitValue(options.resize.height,"px");
                    doc.resizeImage(width, height);
                }
            }
        }
        
        //alert("Done Resizing.");


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

                //folder for outputs
                f = new Folder(doc.path + "_json/");
                if (!f.exists) {
                    f.create();
                }

                var layerData = getLayerData();
                var layers = layerData.layers;

                for (var i=0; i < layers.length; i++) {
                    var layer = layers[i];
                    var result = getPathWithLayerName(layer.name);
                    if (result.workPath) {
                        var bezierPathData = pathToBezierData(result.workPath);
                        layer.bezierPathData = bezierPathData;
                    }
                }

                saveJson(doc.path + '_json/' + doc.name.slice(0, doc.name.length-4) + '.json', layerData.layers);
            }
        }
    }
    alert("Done Processing.");
}


function saveJson(filepath, data) {
    var jsonFile = new File(filepath);
    jsonFile.open('w');
    var content = JSON.stringify(data);
    var str = jsonFile.write(JSON.stringify(data));
    jsonFile.close();
}

function showAllLayers() {
    var doc = app.activeDocument;
    for(var i = 0 ; i < doc.layers.length;i++){
        doc.layers[i].visible = 1;
    }
}

function hideAllLayers() {
    var doc = app.activeDocument;
    for(var i = 0 ; i < doc.layers.length;i++){
        doc.layers[i].visible = 0;
    }
}

function showLayerWithLayerName(layerName) {
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    layer.visible = 1;
}

function hideLayerWithLayerName(layerName) {
    var doc = app.activeDocument;
    var layer = doc.layers.getByName(layerName);
    layer.visible = 0;
}