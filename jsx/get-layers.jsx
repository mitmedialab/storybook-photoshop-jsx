// get-layers.jsx
// organize layers based on each layer's name

function getLayerData() {
    var allLayers = app.activeDocument.layers;
    var data = {};
    data.layerNames = [];
    data.layerCount = allLayers.length;
    data.layers = [];

    for (var i=0; i < allLayers.length; i++) {
        var layer = allLayers[i];
        var layerData = {};
        layerData = getLayerTypeWithName(layer.name);
        data.layers.push(layerData);
        data.layerNames.push(layer.name);
    }

    return data;
}

function getLayerTypeWithName(layerName) {
    var type = 'NA';
    var nameParts = layerName.split('_');
    var namePrefix = nameParts[0];
    namePrefix = namePrefix.toLowerCase();
    switch (namePrefix) {
        case 'tl':
            type = 'TL';
            break;
        case 'tr':
            type = 'TR';
            break;
        case 'bl':
            type = 'BL';
            break;
        case 'br':
            type = 'BR';
            break;
        case 'bg':
            type = 'BG';
            break;
        default:
            type = 'OBJ';
            break;
    }

    return { type: type, name: layerName }
}