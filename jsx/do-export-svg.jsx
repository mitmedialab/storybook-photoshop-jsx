#include export-svg.jsx
#include get-path-data.jsx
#include get-bounds.jsx

var doc = app.activeDocument;
var len = doc.pathItems.length;
if (len) {
    var workPath = app.activeDocument.pathItems.getByName('Work Path');
    if (workPath) {
        var svgPathData = pathToSvgData(workPath);
        var filename = doc.path + '/' + doc.name + '_workpath.svg'
        doc.selection.selectAll();
        var documentBounds = getSelectionBounds();
        exportSvgWithPathData(svgPathData, filename, documentBounds);
    } else {
        alert('No "Work Path" found.');
    }
} else {
    alert('No paths found.');
}
