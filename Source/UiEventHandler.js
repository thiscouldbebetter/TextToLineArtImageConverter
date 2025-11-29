"use strict";
class UiEventHandler {
    static buttonConvertTextToImage_Clicked() {
        var d = document;
        var textareaLinesAsText = d.getElementById("textareaLinesAsText");
        var linesAsText = textareaLinesAsText.value;
        var inputCornerColor = d.getElementById("inputCornerColor");
        var colorToDrawCornerPixelsWith = inputCornerColor.value;
        var converter = new TextToLineArtImageConverter(colorToDrawCornerPixelsWith);
        var inputCellDimensionInPixels = d.getElementById("inputCellDimensionInPixels");
        var cellDimensionInPixels = parseInt(inputCellDimensionInPixels.value);
        var linesAsCanvas = converter.textToCanvas(linesAsText, cellDimensionInPixels);
        var divLinesAsImage = d.getElementById("divLinesAsImage");
        divLinesAsImage.innerHTML = "";
        divLinesAsImage.appendChild(linesAsCanvas);
    }
    static inputFontHeightInPixels_Changed(inputFontHeightInPixels) {
        var d = document;
        var textareaLinesAsText = d.getElementById("textareaLinesAsText");
        var fontHeightInPixels = parseInt(inputFontHeightInPixels.value);
        textareaLinesAsText.fontSize = fontHeightInPixels;
    }
    static selectDemo_Changed(selectDemo) {
        var demoName = selectDemo.value;
        var linesAsString = TextToLineArtImageConverter.textDemoGetByName(demoName);
        var d = document;
        var textareaLinesAsText = d.getElementById("textareaLinesAsText");
        textareaLinesAsText.value = linesAsString;
    }
}
