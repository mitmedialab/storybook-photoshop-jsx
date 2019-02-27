#include json2.js
#include copy-to-clipboard.jsx
#include get-layers.jsx

var data = getLayerData();
var dataText = JSON.stringify(data, null, 2);
copyTextToClipboard(dataText);
alert(dataText);