// #include json2.js

function getSelectionBounds() {
    var doc = app.activeDocument;
    var selec =  doc.selection;
    var bnds = selec.bounds; // get the bounds of current selection
        var xLeft = Number(bnds[0]);
        var yTop =  Number(bnds[1]);
        var xRight =  Number(bnds[2]);
        var yBottom =  Number(bnds[3]);
        // alert(xLeft + ', ' + yTop + ', ' + xRight + ', ' + yBottom);
        var bounds = {
            xLeft: xLeft,
            yTop: yTop,
            xRight: xRight,
            yBottom: yBottom
        }; // set coords for selection, counter-clockwise
        return bounds
}

// function testGetSelectionBounds() {
//     var bounds = getSelectionBounds();
//     alert(JSON.stringify(bounds));
// }

// testGetSelectionBounds();
