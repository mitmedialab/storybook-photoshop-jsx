// https://graphicdesign.stackexchange.com/questions/85518/photoshop-to-svg-path

function ppos(point){
    return ""+point[0]+" "+point[1] 
}

function pathToSvgData(path) {
    var out = "";    
    var pnts = path.subPathItems[0].pathPoints;
    // alert('pathPoint: length: ' + pnts.length);

    var ipos = pnts[0].anchor;

    var pos = pnts[0].leftDirection;
    var pos2, pos3;
    out="M"+ppos(ipos);
    for (var p=1; p<pnts.length; p++){
       pos2 = pnts[p].rightDirection;
       pos3 = pnts[p].anchor;
       out += "C"+ppos(pos)+" "+ppos(pos2)+" "+ppos(pos3);
       pos = pnts[p].leftDirection;
    }
    if (path.closed){
        pos2 = pnts[0].rightDirection;
        pos3 = pnts[0].anchor;
        out += "C"+ppos(pos)+" "+ppos(pos2)+" "+ppos(pos3)+"Z";
    }
    return out;
}

function pathToBezierData(path) {
    var bezierData = [];    
    var points = path.subPathItems[0].pathPoints;

    for (var p=0; p<points.length; p++){
        point = points[p];
        bezierPoint = {
            anchor: { x: Number(point.anchor[0]), y: Number(point.anchor[1]) },
            leftDirection: { x: Number(point.leftDirection[0]), y: Number(point.leftDirection[1]) },
            rightDirection: { x: Number(point.rightDirection[0]), y: Number(point.rightDirection[1]) },
        }
        bezierData.push(bezierPoint);
    }
    if (path.closed){
        bezierData.closed = true;
    }
    return bezierData;
}