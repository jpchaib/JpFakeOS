var gamewindow;

function start() {
    cols = rows = 16;
    mines = 40;
    width = 30 * cols + 20;
    height = 30 * rows + 80;
    windowFeatures = "toolbar=no, location=no, directories=no, status=no, menubar=no, titlebar=no, scrollbars=no, resizable=no, ";
    page = "<!DOCTYPE html><html><head><script src='jsminesweeper.js'></sc" + "ript><meta charset='UTF-8' />" + "<meta name='viewport' content='width=device-width' /><title>JSMinesweeper</title><style>body{margin:0;padding:0;overflow-x:hidden;overflow-y:hidden;}canvas{background:grey;}</style></head>" + "<body><canvas id='jsminesweeper' width='" + width + "' height='" + height + "' ></canvas></body>" + "<script>function start() { init(); jsminesweeper(" + cols + "," + rows + "," + mines + "); }; window.onload = start();</sc" + "ript></html>";
    if (gamewindow) {
        gamewindow.close();
    }
    gamewindow = window.open("", "JSMinesweeper", windowFeatures + "width=" + width + ", height=" + height);
    gamewindow.document.write(page);
    gamewindow.document.close();
    gamewindow.focus();
}
