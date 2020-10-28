function savePng(name) {
    var doc = app.activeDocument;
    var filename = doc.path + '/' + doc.name + '.jpg';
    if (name) {
        filename = name;
    }
    var file = new File(filename);

    //var opts = new JPEGSaveOptions();
    //opts.quality = 10;
    var opts = new PNGSaveOptions();
    opts.compression = 9;

    doc.saveAs(file, opts, true);
}