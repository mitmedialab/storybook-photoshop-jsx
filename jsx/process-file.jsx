#include json2.js
#include get-layers.jsx
#include get-layer-path.jsx
#include export-svg.jsx
#include get-path-data.jsx
#include get-bounds.jsx
#include save-image.jsx

function processFile(options) {
    var doc = app.activeDocument;
    var data = {};

    if (options && options.resize && options.resize.width && options.resize.height) {
        doc.resizeImage(options.resize.width, options.resize.height);
    }
    
    doc.selection.selectAll();
    var documentBounds = getSelectionBounds();
    data.documentBounds = documentBounds;

    showAllLayers();
    var layerData = getLayerData();
    var layers = layerData.layers;

    for (var i=0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.type == 'OBJ') {
            var result = getPathWithLayerName(layer.name);
            layer.pathData = result.pathData;
            if (result.workPath) {
                var filename = doc.path + '/' + doc.name + '_' + layer.name + '.svg';
                var svgPathData = pathToSvgData(result.workPath);
                var bezierPathData = pathToBezierData(result.workPath);
                exportSvgWithPathData(svgPathData, filename, documentBounds);
                layer.bezierPathData = bezierPathData;
            }
        } else if (layer.type == 'GUIDE') {
            hideLayerWithLayerName(layer.name);
        }
    }

    data.layerData = layerData;
    saveJson(doc.path + '/' + doc.name + '.json', data);
    saveJpeg(doc.path + '/' + doc.name + '.jpg');
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

// processFile();