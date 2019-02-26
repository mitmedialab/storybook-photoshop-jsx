function exportSvgWithPathData(svgPathData, filename, documentBounds) {
    var width = 1024;
    var height = 768;
    if (documentBounds && documentBounds.xRight && documentBounds.yBottom) {
        width = documentBounds.xRight;
        height = documentBounds.yBottom;
    }
    if (svgPathData) {
        // var file = File.saveDialog('save svg path', 'SVGPath:*.svg');
        var file = new File(filename);
        file.open('w');
        file.writeln('<?xml version="1.0" encoding="utf-8"?>');
        file.writeln('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">');
        file.writeln('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"');
        file.writeln('width="' + width + 'px" height="' + height + 'px" viewBox="0 0 ' + width + ' ' + height + '" enable-background="new 0 0 ' + width + ' ' + height + '" xml:space="preserve">');
        file.writeln('<path fill="none" stroke="black" d="'+svgPathData+'"/>');
        file.writeln('</svg>'); 
        file.close();
    }
}