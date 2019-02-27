#include json2.js
#include copy-to-clipboard.jsx
#include get-bounds.jsx

var bounds = getSelectionBounds();
var boundsText = JSON.stringify(bounds, null, 2);
copyTextToClipboard(boundsText);
alert(boundsText);

