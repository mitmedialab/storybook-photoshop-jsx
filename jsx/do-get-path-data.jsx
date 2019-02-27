#include json2.js
#include copy-to-clipboard.jsx
#include get-path-data.jsx

var doc = app.activeDocument;
var len = doc.pathItems.length;
if (len) {
    var workPath = app.activeDocument.pathItems.getByName('Work Path');
    if (workPath) {
        var svgData = pathToSvgData(workPath);
        copyTextToClipboard(svgData);
        alert(svgData);
        var bezierData = pathToBezierData(workPath);
        var bezierDataString = JSON.stringify(bezierData, null, 2);
        copyTextToClipboard(bezierDataString);
        alert(bezierDataString);
    } else {
        alert('No "Work Path" found.');
    }
} else {
    alert('No paths found.');
}