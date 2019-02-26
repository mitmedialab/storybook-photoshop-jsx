var dlg = new Window('dialog', 'Dialog Example',[100,100,480,250]);
dlg.btnPnl = dlg.add('panel', [25,15,365,125], 'Panel');
dlg.btnPnl.testBtn = dlg.btnPnl.add('button', [15,30,305,50], 'Button', {name:'ok'});
dlg.btnPnl.testBtn.onClick = onClick;
dlg.show();

function onClick() {
    alert("Dialog: onClick()");
    dlg.close();
}