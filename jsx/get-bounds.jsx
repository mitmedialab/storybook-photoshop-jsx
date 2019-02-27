function getSelectionBounds() {
    var doc = app.activeDocument;
    var selection =  doc.selection;
    var bnds = selection.bounds; // bounds of current selection
        var xLeft = Number(bnds[0]);
        var yTop =  Number(bnds[1]);
        var xRight =  Number(bnds[2]);
        var yBottom =  Number(bnds[3]);
        var bounds = {
            xLeft: xLeft,
            yTop: yTop,
            xRight: xRight,
            yBottom: yBottom
        };
        return bounds
}
