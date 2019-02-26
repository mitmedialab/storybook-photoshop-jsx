#include json2.js
#include get-bounds.jsx

var bounds = getSelectionBounds();
alert(JSON.stringify(bounds, null, 2));
