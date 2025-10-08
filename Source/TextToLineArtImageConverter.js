
class TextToLineArtImageConverter
{
	static textDemo()
	{
		var linesAsStrings = 
		[
			"                               ",
			"       +-+                     ",
			" +-+  /  +-----------------+   ", 
			" | +-+                      \\  ", // Backslashes are escaped.
			" |                           + ",
			" | +-+                      /  ",
			" +-+  \\  +-----------------+   ", // Backslashes are escaped.
			"       +-+                     ",
			"                               "
		];

		var newline = "\n";
		var linesAsString = linesAsStrings.join(newline);

		return linesAsString;
	}

	textToCanvas(edgesAsString, cellDimensionInPixels, lineThicknessInPixels)
	{
		var newline = "\n";
		var cellRowsAsStrings = edgesAsString.split(newline);

		var sizeInCells = Coords.fromXY
		(
			cellRowsAsStrings[0].length,
			cellRowsAsStrings.length
		);

		var charCodeWestEast = "-";
		var charCodeNorthSouth = "|";
		var charCodeNorthwestSoutheast = "\\";
		var charCodeNortheastSouthwest = "/";

		var edgesSoFar = [];

		var cellPosAtStartOfPassCurrent = Coords.create();
		var cellPos = Coords.create();

		var cellPosAtStartOfPassInitialForDirection = Coords.create();
		var offsetToCellNextInPass = Coords.create();
		var offsetFromStartOfPassCurrentToNext = Coords.create();
		var charCodeForEdgeInDirection = "?";

		for (var d = 0; d < 6; d++)
		{
			if (d == 0)
			{
				// West-east.
				cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
				offsetToCellNextInPass.xySet(1, 0);
				offsetFromStartOfPassCurrentToNext.xySet(0, 1);
				charCodeForEdgeInDirection = charCodeWestEast;
			}
			else if (d == 1)
			{
				// North-south.
				cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
				offsetToCellNextInPass.xySet(0, 1);
				offsetFromStartOfPassCurrentToNext.xySet(1, 0);
				charCodeForEdgeInDirection = charCodeNorthSouth;
			}
			else if (d == 2)
			{
				// Northwest-southeast, part 1.
				cellPosAtStartOfPassInitialForDirection.xySet(0, 0);
				offsetToCellNextInPass.xySet(1, 1);
				offsetFromStartOfPassCurrentToNext.xySet(0, 1);
				charCodeForEdgeInDirection = charCodeNorthwestSoutheast;
			}
			else if (d == 3)
			{
				// Northwest-southeast, part 2.
				cellPosAtStartOfPassInitialForDirection.xySet(1, 0);
				offsetToCellNextInPass.xySet(1, 1);
				offsetFromStartOfPassCurrentToNext.xySet(1, 0);
				charCodeForEdgeInDirection = charCodeNorthwestSoutheast;
			}
			else if (d == 4)
			{
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

			this.textToCanvas_1_ReadEdgesFromText
			(
				cellRowsAsStrings,
				sizeInCells,
				cellPosAtStartOfPassInitialForDirection,
				offsetToCellNextInPass,
				offsetFromStartOfPassCurrentToNext,
				charCodeForEdgeInDirection,
				edgesSoFar
			);
		}

		var canvas = this.textToCanvas_2_DrawEdgesToCanvas
		(
			cellDimensionInPixels, sizeInCells, edgesSoFar
		);

		return canvas;
	}

	textToCanvas_1_ReadEdgesFromText
	(
		cellRowsAsStrings,
		sizeInCells,
		cellPosAtStartOfPassInitialForDirection,
		offsetToCellNextInPass,
		offsetFromStartOfPassCurrentToNext,
		charCodeForEdgeInDirection,
		edgesSoFar
	)
	{
		var charCodeCorner = "+";

		var cellPosAtStartOfPassCurrent =
			cellPosAtStartOfPassInitialForDirection.clone();
		var cellPos = cellPosAtStartOfPassCurrent.clone();
		var cornerPosPrev = null;

		var allPassesInDirectionAreComplete = false;

		while (allPassesInDirectionAreComplete == false)
		{
			var passCurrentIsDone = false;

			while (passCurrentIsDone == false)
			{
				var cellAsChar = cellRowsAsStrings[cellPos.y][cellPos.x];

				var edgeIsInProgress = (cornerPosPrev != null);

				if (edgeIsInProgress)
				{
					if (cellAsChar == charCodeCorner)
					{
						var edge = Edge.fromVertices(cornerPosPrev, cellPos.clone() );
						edgesSoFar.push(edge);
						cornerPosPrev = null;
					}
					else if (cellAsChar == charCodeForEdgeInDirection)
					{
						// Do nothing.
					}
					else
					{
						// Abandon the edge in progress.
						cornerPosPrev = null;
					}
				}
				else if (cellAsChar == charCodeCorner)
				{
					cornerPosPrev = cellPos.clone();
				}

				cellPos.add(offsetToCellNextInPass);

				passCurrentIsDone =
					(cellPos.isInRangeMax(sizeInCells) == false);
			}

			cellPosAtStartOfPassCurrent
				.add(offsetFromStartOfPassCurrentToNext);
			cellPos.overwriteWith(cellPosAtStartOfPassCurrent);

			allPassesInDirectionAreComplete =
				(cellPosAtStartOfPassCurrent.isInRangeMax(sizeInCells) == false);
		}

	}

	textToCanvas_2_DrawEdgesToCanvas(cellDimensionInPixels, sizeInCells, edges)
	{
		var cellSizeInPixels =
			Coords.fromXY(1, 1).multiplyScalar(cellDimensionInPixels);
		var imageSizeInPixels =
			sizeInCells.clone().multiply(cellSizeInPixels);

		var d = document;
		var canvas = d.createElement("canvas");
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var graphics = canvas.getContext("2d");
		graphics.strokeStyle = "DarkGray";

		var pixelPos = Coords.create();

		for (var e = 0; e < edges.length; e++)
		{
			var edge = edges[e];

			var edgeVertices = edge.vertices;
			var edgeVertex0 = edgeVertices[0];
			var edgeVertex1 = edgeVertices[1];

			graphics.beginPath();
			pixelPos
				.overwriteWith(edgeVertex0)
				.multiply(cellSizeInPixels);
			graphics.moveTo(pixelPos.x, pixelPos.y);
			pixelPos
				.overwriteWith(edgeVertex1)
				.multiply(cellSizeInPixels);
			graphics.lineTo(pixelPos.x, pixelPos.y);
			graphics.stroke();
		}

		return canvas;
	}

	throwFormatError()
	{
		throw new Error("Format error.");
	}
}
