var palette = new Window('palette', 'Palette Example',[100,100,480,250]);
palette.btnPnl = palette.add('panel', [25,15,365,125], 'Panel');
palette.btnPnl.testBtn = palette.btnPnl.add('button', [15,30,305,50], 'Button', {name:'ok'});
palette.btnPnl.testBtn.onClick = onClick;

function onClick() {
    alert("Palette: onClick()");
    return isDone = true;
}

function main() {
  isDone = false;
  palette.onClose = function(){
      return isDone = true;
  };
  palette.show();
  while (isDone === false) {
      try{
          app.refresh();
      } catch(e){
          isDone = true;
      };
  }
}

main();