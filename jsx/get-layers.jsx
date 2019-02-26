// get-layers.jsx
// organize layers into arrays based on each layer's name

function getLayerData() {
    var allLayers = app.activeDocument.layers;
    var data = {};
    data.layerNames = [];
    data.layerCount = allLayers.length;
    data.layers = [];

    for (var i=0; i < allLayers.length; i++) {
        var layer = allLayers[i];
        var layerData = {};
        // layerData.name = layer.name;
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
        case 'guide':
        case 'tl':
        case 'tr':
        case 'bl':
        case 'br':
            type = 'GUIDE';
            break;
        case 'fg':
            type = 'FG';
            break;
        case 'bg':
            type = 'BG';
            break;
        case 'obj':
        default:
            type = 'OBJ';
            break;
    }

    return { type: type, name: layerName }
}