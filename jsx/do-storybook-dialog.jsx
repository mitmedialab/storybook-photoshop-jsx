
#target photoshop

#include json2.js
#include get-layer-path.jsx
#include process-file.jsx
#include get-path-data.jsx
#include get-bounds.jsx
#include export-svg.jsx

var doc = app.activeDocument;
var dialog = createDialog();
dialog.show()

function createDialog() {
    var dlg = new Window('palette', 'Storybook Tools', [100,100,480,350]);
    dlg.btnPnl = dlg.add('panel', [25,15,365,225], 'Objects');
    
    dlg.btnPnl.getPathBtn = dlg.btnPnl.add('button', [15,30,305,50], 'getPath (selected layer)', {name:'getPath'});
    dlg.btnPnl.getPathBtn.onClick = getPath;
    
    dlg.btnPnl.processFileBtn = dlg.btnPnl.add('button', [15,60,305,50], 'processFile', {name:'processFile'});
    dlg.btnPnl.processFileBtn.onClick = doProcessFile;
    
    dlg.btnPnl.testExportSvgBtn = dlg.btnPnl.add('button', [15,90,305,50], 'testExportSvg', {name:'testExportSvg'});
    dlg.btnPnl.testExportSvgBtn.onClick = doExportSvg;
    
    dlg.btnPnl.cancelBtn = dlg.btnPnl.add('button', [15,120,305,50], 'cancel', {name:'cancel'});
    dlg.btnPnl.cancelBtn.onClick = doCancel;  
    
    return dlg;
}

function getPath() {
    var result = getPathWithLayerName();
    doc.selection.deselect();
    doc.selection.select(result.pathData.selectionRect);
    // dlg.close();
}

function doProcessFile() {
    var options = {
        resize: {
            width: 1024,
            height: 640
        }
    }
    processFile(options);
    // dlg.close();
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
    // dlg.close();
}

function doCancel() {
    // $.writeln('CANCEL');
    // dlg.close();
    dialog.close();
}