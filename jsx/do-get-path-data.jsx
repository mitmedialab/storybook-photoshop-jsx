#include json2.js
#include get-path-data.jsx

var doc = app.activeDocument;
var len = doc.pathItems.length;
if (len) {
    var workPath = app.activeDocument.pathItems.getByName('Work Path');
    if (workPath) {
        var svgData = pathToSvgData(workPath);
        alert(svgData);
        var bezierData = pathToBezierData(workPath);
        alert(JSON.stringify(bezierData, null, 2));
    } else {
        alert('No "Work Path" found.');
    }
} else {
    alert('No paths found.');
}