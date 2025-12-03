"use strict";
class TextToLineArtImageConverter {
    constructor(colorToDrawCornerPixelsWith) {
        this.colorToDrawCornerPixelsWith =
            colorToDrawCornerPixelsWith;
        this._displacement = Coords.create();
        this._displacementAbsolute = Coords.create();
        this._pixelPosCurrent = Coords.create();
    }
    static textDemoGetByName(demoName) {
        var returnValue = demoName == "Tiny Square"
            ? this.textDemoGetTinySquare()
            : demoName == "Sword"
                ? this.textDemoGetSword()
                : demoName == "Floor Plan"
                    ? this.textDemoGetFloorPlan()
                    : "";
        return returnValue;
    }
    static textDemoGetFloorPlan() {
        var linesAsStrings = [
            "                           +------+                          ",
            "                           |      |                          ",
            " +-------------------------+      +-------------------------+",
            " |                                                          |",
            " |                                                          |",
            " |  +---+  +-----------------+  +------------------------+  |",
            " |  |+--+  |+------+      +--+  +--++------++---------+  |  |",
            " |  ||     ||      |      |        ||      ||         |  |  |",
            " |  ||     ||      |      |        ||      ||         |  |  |",
            " |  ||     ||      |+-----+        ||      ||      +--+  |  |",
            " |  |+--+  |+-+  +-+|              ||      |+-+  +-++---+|  |",
            " |  |+--+  +-+|  |  |              ||      |+-+  +-+|   ||  |",
            " |  ||       ||  |  |  +--+        ||      ++      ++   ||  |",
            " |  ||       ++  |+-+  +-+|        ||                   ||  |",
            " |  ||           ||      ||        ||                   ||  |",
            " |  ||       ++  ||      ||        ||      ++      ++   ||  |",
            " |  ||       ||  ||      ||        ||      ||      ||   ||  |",
            " |  |+-------+|  |+------+|        |+-+  +-++------+++  ||  |",
            " |  +---------+  +--------+        +--+  +-----------+  ++  |",
            " |                                                          |",
            " |                                                          |",
            " |  ++  +--+  +-------+  +---+  +---+  +-------------+  ++  |",
            " |  ||  |+-+  +-++---+|  |+--+  +--+|  |+-----++----+|  ||  |",
            " |  ||  ||      ||   ||  ||        ||  ||     ||    ||  ||  |",
            " |  ||  ||      ||   ||  ||        ||  ||     ++    ++  ||  |",
            " |  ||  ||      ||   ||  ||        ||  ||               ||  |",
            " |  ||  |+------+|   ||  ||        ||  ||     ++    ++  ||  |",
            " |  ||  +--------+  ++|  ||        ||  ||  +--++----+|  ||  |",
            " |  ||              | |  ||        ||  |+--+   +--+  |  ||  |",
            " |  ||              | |  ||        ||  |    +--+  +-+|  ||  |",
            " |  ||  +--+  +--+  ++|  |+--+  +--+|  |    |       ||  ||  |",
            " |  ||  |+-+  +-+|   ||  +---+  +---+  |    |       ||  ||  |",
            " |  ||  ||      ||   ||                |    +--+  +-+|  ||  |",
            " |  ||  ||      ||   ||                |+---++-+  +-+|  ||  |",
            " |  ||  ||      ||   ||                ||   ||      ||  ||  |",
            " |  ||  |+------++---+|                ||   ++      ||  ||  |",
            " |  ||  +-------++---+|                ||           ||  ||  |",
            " |  ||          ||   ||                ||           ||  ||  |",
            " |  ||          ||   |+                +|   ++      ||  ||  |",
            " |  ||  ++      ||   | \\              / |   ||      ||  ||  |", // Backslash is escaped.
            " |  ||  |+------+|   |  +----+  +----+  |  +++-+  +-+|  ||  |",
            " |  ||  +--------+   |       |  |   +--+|  +---+  +--+  ||  |",
            " |  ||             +-+       |  |   |  ||               ||  |",
            " |  ||             |        ++  ++  |  ||               ||  |",
            " |  |+-------------+  +-----+    +--+  |+---------------+|  |",
            " |  +-----------------+                +-----------------+  |",
            " |                                                          |",
            " |                       +---+  +---+                       |",
            " +-----------------------+   +--+   +-----------------------+"
        ];
        var newline = "\n";
        var linesAsString = linesAsStrings.join(newline);
        return linesAsString;
    }
    static textDemoGetSword() {
        var linesAsStrings = [
            "                                    ",
            "         +-+                        ",
            " +-+    /  +-----=-------=------+   ", // Break the edge into parts.
            " | +---+                         \\  ", // Backslashes are escaped.
            " |                                + ",
            " | +---+                         /  ",
            " +-+    \\  +--------------------+   ", // Backslashes are escaped.
            "         +-+                        ",
            "                                    "
        ];
        var newline = "\n";
        var linesAsString = linesAsStrings.join(newline);
        return linesAsString;
    }
    static textDemoGetTinySquare() {
        var linesAsStrings = [
            "++",
            "++"
        ];
        var newline = "\n";
        var linesAsString = linesAsStrings.join(newline);
        return linesAsString;
    }
    lineDrawToGraphicsContextWithColorFromTo(graphics, color, startPos, endPos) {
        var displacement = this._displacement
            .overwriteWith(endPos)
            .subtract(startPos);
        var displacementAbsolute = this._displacementAbsolute
            .overwriteWith(displacement)
            .absolute();
        var step = displacement
            .divide(displacementAbsolute);
        var error = displacementAbsolute.x - displacementAbsolute.y;
        var pixelPosCurrent = this._pixelPosCurrent
            .overwriteWith(startPos);
        while (true) {
            this.pixelDrawToGraphicsContextWithColorAtPos(graphics, color, pixelPosCurrent);
            if (pixelPosCurrent.equals(endPos)) {
                break;
            }
            var errorTimesTwo = error * 2;
            if (errorTimesTwo > 0 - displacementAbsolute.y) {
                error = error - displacementAbsolute.y;
                pixelPosCurrent.x += step.x;
            }
            if (errorTimesTwo < displacementAbsolute.x) {
                error += displacementAbsolute.x;
                pixelPosCurrent.y += step.y;
            }
        }
    }
    pixelDrawToGraphicsContextWithColorAtPos(graphics, color, pixelPos) {
        graphics.fillStyle = color;
        graphics.fillRect(pixelPos.x, pixelPos.y, 1, 1);
    }
    // Conversion methods.
    edgesToCanvas(cellDimensionInPixels, sizeInCells, edges) {
        var cellSizeInPixels = Coords.fromXY(1, 1).multiplyScalar(cellDimensionInPixels);
        var imageSizeInPixels = sizeInCells
            .clone()
            .multiply(cellSizeInPixels);
        var d = document;
        var canvas = d.createElement("canvas");
        canvas.width = imageSizeInPixels.x;
        canvas.height = imageSizeInPixels.y;
        var g = canvas.getContext("2d");
        var pixelPosFrom = Coords.create();
        var pixelPosTo = Coords.create();
        for (var e = 0; e < edges.length; e++) {
            var edge = edges[e];
            var edgeVertices = edge.vertices;
            var edgeVertex0 = edgeVertices[0];
            var edgeVertex1 = edgeVertices[1];
            pixelPosFrom
                .overwriteWith(edgeVertex0)
                .multiply(cellSizeInPixels);
            pixelPosTo
                .overwriteWith(edgeVertex1)
                .multiply(cellSizeInPixels);
            this.lineDrawToGraphicsContextWithColorFromTo(g, "Black", pixelPosFrom, pixelPosTo);
            if (this.colorToDrawCornerPixelsWith != null) {
                this.pixelDrawToGraphicsContextWithColorAtPos(g, this.colorToDrawCornerPixelsWith, pixelPosFrom);
                this.pixelDrawToGraphicsContextWithColorAtPos(g, this.colorToDrawCornerPixelsWith, pixelPosTo);
            }
        }
        return canvas;
    }
    textToEdges(edgesAsString) {
        var edgesAsStringContainsTabs = (edgesAsString.indexOf("\t") >= 0);
        if (edgesAsStringContainsTabs) {
            this.throwFormatError("The string must not contain tab characters.");
        }
        var newline = "\n";
        var cellRowsAsStrings = edgesAsString.split(newline);
        var cellRowLengths = cellRowsAsStrings.map(x => x.length);
        var cellRowLengthMax = Math.max(...cellRowLengths);
        cellRowsAsStrings =
            cellRowsAsStrings
                .map(x => x.padEnd(cellRowLengthMax, " "));
        var sizeInCells = Coords.fromXY(cellRowsAsStrings[0].length, cellRowsAsStrings.length);
        var charCodeWestEast = "-";
        var charCodeNorthSouth = "|";
        var charCodeNorthwestSoutheast = "\\";
        var charCodeNortheastSouthwest = "/";
        var edgesSoFar = [];
        var cellPosAtStartOfPassInitialForDirection = Coords.create();
        var offsetToCellNextInPass = Coords.create();
        var offsetFromStartOfPassCurrentToNext = Coords.create();
        var charCodeForEdgeInDirection = "?";
        var directionIndicesToRead = [0, 1, 2, 3, 4, 5];
        for (var di = 0; di < directionIndicesToRead.length; di++) {
            var d = directionIndicesToRead[di];
            if (d == 0) {
                // West-east.
                cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
                offsetToCellNextInPass.xySet(1, 0);
                offsetFromStartOfPassCurrentToNext.xySet(0, 1);
                charCodeForEdgeInDirection = charCodeWestEast;
            }
            else if (d == 1) {
                // North-south.
                cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
                offsetToCellNextInPass.xySet(0, 1);
                offsetFromStartOfPassCurrentToNext.xySet(1, 0);
                charCodeForEdgeInDirection = charCodeNorthSouth;
            }
            else if (d == 2) {
                // Northwest-southeast, part 1.
                cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
                offsetToCellNextInPass.xySet(1, 1);
                offsetFromStartOfPassCurrentToNext.xySet(0, 1);
                charCodeForEdgeInDirection = charCodeNorthwestSoutheast;
            }
            else if (d == 3) {
                // Northwest-southeast, part 2.
                cellPosAtStartOfPassInitialForDirection.xySet(1, 0);
                offsetToCellNextInPass.xySet(1, 1);
                offsetFromStartOfPassCurrentToNext.xySet(1, 0);
                charCodeForEdgeInDirection = charCodeNorthwestSoutheast;
            }
            else if (d == 4) {
                // Northeast-southwest, part 1.
                cellPosAtStartOfPassInitialForDirection.xySet(1, 0);
                offsetToCellNextInPass.xySet(-1, 1);
                offsetFromStartOfPassCurrentToNext.xySet(1, 0);
                charCodeForEdgeInDirection = charCodeNortheastSouthwest;
            }
            else // if (d == 5)
             {
                // Northeast-southwest, part 2.
                cellPosAtStartOfPassInitialForDirection.xySet(sizeInCells.x - 1, 1);
                offsetToCellNextInPass.xySet(-1, 1);
                offsetFromStartOfPassCurrentToNext.xySet(0, 1);
                charCodeForEdgeInDirection = charCodeNortheastSouthwest;
            }
            var edgesForThisDirection = this.textToEdges_ReadEdgesFromText(cellRowsAsStrings, sizeInCells, cellPosAtStartOfPassInitialForDirection, offsetToCellNextInPass, offsetFromStartOfPassCurrentToNext, charCodeForEdgeInDirection, edgesSoFar);
            edgesSoFar.push(...edgesForThisDirection);
        }
        return edgesSoFar;
    }
    textToEdges_ReadEdgesFromText(cellRowsAsStrings, sizeInCells, cellPosAtStartOfPassInitialForDirection, offsetToCellNextInPass, offsetFromStartOfPassCurrentToNext, charCodeForEdgeInDirection, edgesFromPreviousDirections) {
        var edgesSoFar = [];
        var charCodeCorner = "+";
        var charCodeBreak = "=";
        var cellPosAtStartOfPassCurrent = cellPosAtStartOfPassInitialForDirection.clone();
        var cellPos = cellPosAtStartOfPassCurrent.clone();
        var edgeCharsInEdgeSoFar = 0;
        var allPassesInDirectionAreComplete = false;
        while (allPassesInDirectionAreComplete == false) {
            var passCurrentIsDone = false;
            var cornerPosPrev = null;
            while (passCurrentIsDone == false) {
                var cellAsChar = cellRowsAsStrings[cellPos.y][cellPos.x];
                var edgeIsInProgress = (cornerPosPrev != null);
                if (edgeIsInProgress) {
                    if (cellAsChar == charCodeCorner
                        || cellAsChar == charCodeBreak) {
                        var edgeShouldBeDisregarded = false;
                        if (edgeCharsInEdgeSoFar == 0) {
                            var junctionEdgesIncoming = edgesFromPreviousDirections
                                .filter(e => e.vertexIsPresentAtPos(cellPos));
                            var junctionAlreadyHasTwoIncomingEdges = (junctionEdgesIncoming.length >= 2);
                            edgeShouldBeDisregarded = junctionAlreadyHasTwoIncomingEdges;
                        }
                        if (edgeShouldBeDisregarded) {
                            // Abandon the edge in progress.
                            cornerPosPrev = null;
                        }
                        else {
                            var cornerPosCurrent = cellPos.clone();
                            var edge = Edge.fromVertices(cornerPosPrev, cornerPosCurrent);
                            edgesSoFar.push(edge);
                            cornerPosPrev =
                                cellAsChar == charCodeBreak
                                    ? cornerPosCurrent.clone()
                                    : null;
                        }
                    }
                    else if (cellAsChar == charCodeForEdgeInDirection) {
                        edgeCharsInEdgeSoFar++;
                    }
                    else {
                        // Abandon the edge in progress.
                        cornerPosPrev = null;
                    }
                }
                else if (cellAsChar == charCodeCorner) {
                    cornerPosPrev = cellPos.clone();
                    edgeCharsInEdgeSoFar = 0;
                }
                cellPos.add(offsetToCellNextInPass);
                passCurrentIsDone =
                    (cellPos.isInRangeMax(sizeInCells) == false);
            }
            cellPosAtStartOfPassCurrent
                .add(offsetFromStartOfPassCurrentToNext);
            cellPos.overwriteWith(cellPosAtStartOfPassCurrent);
            allPassesInDirectionAreComplete =
                (cellPos.isInRangeMax(sizeInCells) == false);
        }
        return edgesSoFar;
    }
    throwFormatError(message) {
        throw new Error("Format error: " + message);
    }
}
