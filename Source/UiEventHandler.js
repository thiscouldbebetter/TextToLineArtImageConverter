"use strict";
class UiEventHandler {
    static buttonConvertPathsToCanvas_Clicked() {
        var d = document;
        var textareaPaths = d.getElementById("textareaPaths");
        var newline = "\n";
        var pathsSerialized = textareaPaths.value.split(newline);
        var paths = pathsSerialized.map(x => Path.fromStringVerticesAsXxY(x));
        var pathVerticesAll = [];
        paths.forEach(p => pathVerticesAll.push(...p.vertices));
        var pathVertexPosMaxSoFar = pathVerticesAll[0].clone();
        pathVerticesAll.forEach(v => {
            if (v.x > pathVertexPosMaxSoFar.x) {
                pathVertexPosMaxSoFar.x = v.x;
            }
            if (v.y > pathVertexPosMaxSoFar.y) {
                pathVertexPosMaxSoFar.y = v.y;
            }
        });
        var checkboxHighlightEdgeEndpoints = d.getElementById("checkboxHighlightEdgeEndpoints");
        var edgeEndpointsShouldBeHighlighted = checkboxHighlightEdgeEndpoints.checked;
        var colorToDrawCornerPixelsWith = null;
        if (edgeEndpointsShouldBeHighlighted) {
            var inputCornerColor = d.getElementById("inputCornerColor");
            colorToDrawCornerPixelsWith =
                inputCornerColor.value;
        }
        var converter = new TextToLineArtImageConverter(colorToDrawCornerPixelsWith);
        var inputCellDimensionInPixels = d.getElementById("inputCellDimensionInPixels");
        var cellDimensionInPixels = parseInt(inputCellDimensionInPixels.value);
        var sizeInCells = pathVertexPosMaxSoFar.add(Coords.fromXY(1, 1));
        var linesAsCanvas = converter.pathsToCanvas(cellDimensionInPixels, sizeInCells, paths);
        var divLinesAsImage = d.getElementById("divLinesAsImage");
        divLinesAsImage.innerHTML = "";
        divLinesAsImage.appendChild(linesAsCanvas);
    }
    static buttonConvertTextToPaths_Clicked() {
        var d = document;
        var textareaLinesAsText = d.getElementById("textareaLinesAsText");
        var linesAsText = textareaLinesAsText.value;
        var converter = new TextToLineArtImageConverter(null);
        var edges = converter.textToEdges(linesAsText);
        var paths = Path.manyFromEdges(edges);
        var pathsSerialized = paths.map(x => x.toStringVerticesAsXxY());
        var newline = "\n";
        var pathsSerializedJoined = pathsSerialized.join(newline);
        var textareaPaths = d.getElementById("textareaPaths");
        textareaPaths.value = pathsSerializedJoined;
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
