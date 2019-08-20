#target photoshop

#include json2.js
#include get-layer-path.jsx
#include process-file.jsx
#include get-path-data.jsx
#include get-bounds.jsx
#include export-svg.jsx
#include get-bezier-path.jsx
#include save-background-image.jsx

var doc = app.activeDocument;

var isDone;
var sTID;
var waitForRedraw;

var window = createPalette();

function createPalette() {
    var palette = new Window('palette', 'Storybook Tools', [100,100,480,350]);
    palette.btnPnl = palette.add('panel', [25,15,365,225], 'Objects');
    
    //getPath
    palette.btnPnl.getPathBtn = palette.btnPnl.add('button', [15,15,305,40], 'getPath (selected layer)', {name:'getPath'});
    palette.btnPnl.getPathBtn.onClick = getPath;
   
    //processFile
    palette.btnPnl.processFileBtn = palette.btnPnl.add('button', [15,45,305,50], 'processFile', {name:'processFile'});
    palette.btnPnl.processFileBtn.onClick = doProcessFile;
    
    //testExportSvg
    palette.btnPnl.testExportSvgBtn = palette.btnPnl.add('button', [15,75,305,50], 'testExportSvg', {name:'testExportSvg'});
    palette.btnPnl.testExportSvgBtn.onClick = doExportSvg;

    //saveBackgroundImage
    palette.btnPnl.saveBackgroundBtn = palette.btnPnl.add('button', [15,105,305,50], 'saveBackgroundImage', {name:'saveBackgroundImage'});
    palette.btnPnl.saveBackgroundBtn.onClick = doSaveBackgroundImage;

    //getJson
    palette.btnPnl.getBezierBtn = palette.btnPnl.add('button', [15,135,305,50], 'getBezierPath', {name:'getBezierPath'});
    palette.btnPnl.getBezierBtn.onClick = doGetBezierPath;
    
    palette.btnPnl.cancelBtn = palette.btnPnl.add('button', [15,165,305,50], 'cancel', {name:'cancel'});
    palette.btnPnl.cancelBtn.onClick = doCancel;  
    
    return palette;
}

function getPath() {
    var result = getPathWithLayerName();
    doc.selection.deselect();
    doc.selection.select(result.pathData.selectionRect);
}

function doSaveBackgroundImage() {
    var options = {
        resize: {
            width: 1024,
            height: 640
        }
    }
    saveBackgroundImage(options);
}

function doProcessFile() {
    var options = {
        resize: {
            width: 1024,
            height: 640
        }
    }
    processFile(options);
}

function doGetBezierPath() {
    var options = {
        resize: {
            width: 1024,
            height: 640
        }
    }
    getBezierPath(options);
}

function doExportSvg() {    
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
}

function doCancel() {
    return isDone = true;
}

function main() {
    isDone = false;
    window.onClose = function(){
        return isDone = true;
    };
    window.show();
    while (isDone === false) {
        try{
            app.refresh();
        } catch(e){
            isDone = true;
        };
    }
}

main();