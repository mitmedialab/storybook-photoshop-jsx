#include get-bounds.jsx

function getPathWithLayerName(layerName) {
    var bounds = getTightSelectionWithLayerName(layerName);
    var workPath = selectionToWorkPath();
    var selectionRect = [];
    if (bounds) {
        var xLeft = bounds.xLeft;
        var yTop =  bounds.yTop;
        var xRight =  bounds.xRight;
        var yBottom =  bounds.yBottom;
        var selectionRect = [ [xLeft,yTop], [xLeft,yBottom], [xRight,yBottom], [xRight,yTop] ];
    }
    return {
        pathData: {
            bounds: bounds,
            selectionRect: selectionRect,
        },
        workPath: workPath
    }
}

function getTightSelectionWithLayerName(layerName) {
    
    if (layerName) {
        // select layer with layerName
        var idslct = charIDToTypeID( "slct" );
            var desc26 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref12 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                ref12.putName( idLyr, layerName );
            desc26.putReference( idnull, ref12 );
            var idMkVs = charIDToTypeID( "MkVs" );
            desc26.putBoolean( idMkVs, false );
            var idLyrI = charIDToTypeID( "LyrI" );
                var list7 = new ActionList();
                list7.putInteger( 4 );
            desc26.putList( idLyrI, list7 );
        executeAction( idslct, desc26, DialogModes.NO );
    }
    
    // select all?
    var idsetd = charIDToTypeID( "setd" );
        var desc28 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref13 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref13.putProperty( idChnl, idfsel );
        desc28.putReference( idnull, ref13 );
        var idT = charIDToTypeID( "T   " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idAl = charIDToTypeID( "Al  " );
        desc28.putEnumerated( idT, idOrdn, idAl );
    executeAction( idsetd, desc28, DialogModes.NO );

    // slect move tool
    var idslct = charIDToTypeID( "slct" );
        var desc29 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref14 = new ActionReference();
            var idmoveTool = stringIDToTypeID( "moveTool" );
            ref14.putClass( idmoveTool );
        desc29.putReference( idnull, ref14 );
        var iddontRecord = stringIDToTypeID( "dontRecord" );
        desc29.putBoolean( iddontRecord, true );
        var idforceNotify = stringIDToTypeID( "forceNotify" );
        desc29.putBoolean( idforceNotify, true );
    executeAction( idslct, desc29, DialogModes.NO );

    // nudge right
    var idcut = charIDToTypeID( "cut " );
        var desc61 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref25 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref25.putProperty( idChnl, idfsel );
        desc61.putReference( idnull, ref25 );
        var idT = charIDToTypeID( "T   " );
            var desc62 = new ActionDescriptor();
            var idHrzn = charIDToTypeID( "Hrzn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc62.putUnitDouble( idHrzn, idPxl, 2.000000 );
            var idVrtc = charIDToTypeID( "Vrtc" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc62.putUnitDouble( idVrtc, idPxl, 0.000000 );
        var idOfst = charIDToTypeID( "Ofst" );
        desc61.putObject( idT, idOfst, desc62 );
    executeAction( idcut, desc61, DialogModes.NO );

    // nudge left
    var idcut = charIDToTypeID( "cut " );
        var desc61 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref25 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref25.putProperty( idChnl, idfsel );
        desc61.putReference( idnull, ref25 );
        var idT = charIDToTypeID( "T   " );
            var desc62 = new ActionDescriptor();
            var idHrzn = charIDToTypeID( "Hrzn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc62.putUnitDouble( idHrzn, idPxl, -2.000000 );
            var idVrtc = charIDToTypeID( "Vrtc" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc62.putUnitDouble( idVrtc, idPxl, 0.000000 );
        var idOfst = charIDToTypeID( "Ofst" );
        desc61.putObject( idT, idOfst, desc62 );
    executeAction( idcut, desc61, DialogModes.NO );

    var bounds = getSelectionBounds();
    return bounds;
}

function selectionToWorkPath() {
        // Turn selection into Work Path
        var idMk = charIDToTypeID( "Mk  " );
        var desc74 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref30 = new ActionReference();
            var idPath = charIDToTypeID( "Path" );
            ref30.putClass( idPath );
        desc74.putReference( idnull, ref30 );
        var idFrom = charIDToTypeID( "From" );
            var ref31 = new ActionReference();
            var idcsel = charIDToTypeID( "csel" );
            var idfsel = charIDToTypeID( "fsel" );
            ref31.putProperty( idcsel, idfsel );
        desc74.putReference( idFrom, ref31 );
        var idTlrn = charIDToTypeID( "Tlrn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc74.putUnitDouble( idTlrn, idPxl, 2.000000 );
        executeAction( idMk, desc74, DialogModes.NO );

        var workPath = app.activeDocument.pathItems.getByName('Work Path');
        return workPath;
}

// function testGetPathWithLayerName() {
//     var result = getPathWithLayerName();
//     app.activeDocument.selection.deselect();
//     app.activeDocument.selection.select(result.pathData.selectionRect);
// }

// testGetPathWithLayerName();