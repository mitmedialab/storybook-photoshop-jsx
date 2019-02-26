#include json2.js
#include get-layer-path.jsx

var result = getPathWithLayerName();
app.activeDocument.selection.deselect();
app.activeDocument.selection.select(result.pathData.selectionRect);
