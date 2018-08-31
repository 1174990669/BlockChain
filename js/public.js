(function (doc, win) {
    var htmlFont = function () {
        var docEl = doc.documentElement, l = docEl.clientWidth, f;
        f = l / 15;
        l > 750 ? docEl.style.fontSize = 50 + "px" : docEl.style.fontSize = f + "px"
    };
    htmlFont();
    win.addEventListener("resize", htmlFont, false)
})(document, window)