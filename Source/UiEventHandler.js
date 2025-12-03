"use strict";
class UiEventHandler {
    static buttonConvertEdgesToCanvas_Clicked() {
        var d = document;
        var colorToDrawCornerPixelsWith = null;
        if (edgeEndpointsShouldBeHighlighted) {
            var inputCornerColor = d.getElementById("inputCornerColor");
            colorToDrawCornerPixelsWith =
                inputCornerColor.value;
        }
        var textareaEdgesAsText = d.getElementById("textareaEdgesAsText");
        var newline = "\n";
        var edgesSerialized = textareaEdgesAsText.value.split(newline);
        var edges = edgesSerialized.map(x => Edge.fromStringFromVertexXxYToVertexXxY(x));
        var edgeVerticesAll = [];
        edges.forEach(e => edgeVerticesAll.push(...e.vertices));
        var edgeVertexPosMaxSoFar = edgeVerticesAll[0].clone();
        edgeVerticesAll.forEach(v => {
            if (v.x > edgeVertexPosMaxSoFar.x) {
                edgeVertexPosMaxSoFar.x = v.x;
            }
            if (v.y > edgeVertexPosMaxSoFar.y) {
                edgeVertexPosMaxSoFar.y = v.y;
            }
        });
        var checkboxHighlightEdgeEndpoints = d.getElementById("checkboxHighlightEdgeEndpoints");
        var edgeEndpointsShouldBeHighlighted = checkboxHighlightEdgeEndpoints.checked;
        var converter = new TextToLineArtImageConverter(colorToDrawCornerPixelsWith);
        var inputCellDimensionInPixels = d.getElementById("inputCellDimensionInPixels");
        var cellDimensionInPixels = parseInt(inputCellDimensionInPixels.value);
        var sizeInCells = edgeVertexPosMaxSoFar;
        var linesAsCanvas = converter.edgesToCanvas(cellDimensionInPixels, sizeInCells, edges);
        var divLinesAsImage = d.getElementById("divLinesAsImage");
        divLinesAsImage.innerHTML = "";
        divLinesAsImage.appendChild(linesAsCanvas);
    }
    static buttonConvertTextToEdges_Clicked() {
        var d = document;
        var textareaLinesAsText = d.getElementById("textareaLinesAsText");
        var linesAsText = textareaLinesAsText.value;
        var converter = new TextToLineArtImageConverter(null);
        var linesAsEdges = converter.textToEdges(linesAsText);
        var edgesSerialized = linesAsEdges.map(x => x.toStringFromVertexAsXxYToVertexAsXxY());
        var newline = "\n";
        var edgesSerializedJoined = edgesSerialized.join(newline);
        var textareaEdgesAsText = d.getElementById("textareaEdgesAsText");
        textareaEdgesAsText.value = edgesSerializedJoined;
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
