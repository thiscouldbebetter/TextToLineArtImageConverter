
class TextToLineArtImageConverter
{
	colorToDrawCornerPixelsWith: string;

	_displacement: Coords;
	_displacementAbsolute: Coords;
	_pixelPosCurrent: Coords;

	constructor(colorToDrawCornerPixelsWith: string)
	{
		this.colorToDrawCornerPixelsWith =
			colorToDrawCornerPixelsWith;

		this._displacement = Coords.create();
		this._displacementAbsolute = Coords.create();
		this._pixelPosCurrent = Coords.create();
	}

	static textDemoGetByName(demoName: string): string
	{
		var returnValue =
			demoName == "Tiny Square"
			? this.textDemoGetTinySquare()
			: demoName == "Sword"
			? this.textDemoGetSword()
			: demoName == "Floor Plan"
			? this.textDemoGetFloorPlan()
			: "";

		return returnValue;
	}

	static textDemoGetFloorPlan(): string
	{
		var linesAsStrings = 
		[
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

	static textDemoGetSword(): string
	{
		var linesAsStrings = 
		[
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

	static textDemoGetTinySquare(): string
	{
		var linesAsStrings = 
		[
			"++",
			"++"
		];

		var newline = "\n";
		var linesAsString = linesAsStrings.join(newline);

		return linesAsString;
	}

	lineDrawToGraphicsContextWithColorFromTo
	(
		graphics: any, color: string, startPos: Coords, endPos: Coords
	): void
	{
		var displacement =
			this._displacement
				.overwriteWith(endPos)
				.subtract(startPos);
		var displacementAbsolute =
			this._displacementAbsolute
				.overwriteWith(displacement)
				.absolute();
		var step =
			displacement
			.divide(displacementAbsolute);

		var error = displacementAbsolute.x - displacementAbsolute.y;

		var pixelPosCurrent =
			this._pixelPosCurrent
				.overwriteWith(startPos);

		while (true)
		{
			this.pixelDrawToGraphicsContextWithColorAtPos
			(
				graphics, color, pixelPosCurrent
			);

			if (pixelPosCurrent.equals(endPos) )
			{
				break;
			}

			var errorTimesTwo = error * 2;
			if (errorTimesTwo > 0 - displacementAbsolute.y)
			{
				error = error - displacementAbsolute.y;
				pixelPosCurrent.x += step.x;
			}
			if (errorTimesTwo < displacementAbsolute.x)
			{
				error += displacementAbsolute.x;
				pixelPosCurrent.y += step.y;
			}
		}
	}

	pixelDrawToGraphicsContextWithColorAtPos(graphics: any, color: string, pixelPos: Coords): void
	{
		graphics.fillStyle = color;
		graphics.fillRect(pixelPos.x, pixelPos.y, 1, 1);
	}

	// Conversion methods.

	edgesToCanvas
	(
		cellDimensionInPixels: number,
		sizeInCells: Coords,
		edges: Edge[]
	): any
	{
		var cellSizeInPixels =
			Coords.fromXY(1, 1).multiplyScalar(cellDimensionInPixels);
		var imageSizeInPixels =
			sizeInCells
				.clone()
				.multiply(cellSizeInPixels);

		var d = document;
		var canvas = d.createElement("canvas");
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var g = canvas.getContext("2d");

		var pixelPosFrom = Coords.create();
		var pixelPosTo = Coords.create();

		for (var e = 0; e < edges.length; e++)
		{
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

			this.lineDrawToGraphicsContextWithColorFromTo
			(
				g, "Black", pixelPosFrom, pixelPosTo
			);

			if (this.colorToDrawCornerPixelsWith != "")
			{
				this.pixelDrawToGraphicsContextWithColorAtPos
				(
					g, this.colorToDrawCornerPixelsWith, pixelPosFrom
				);
				this.pixelDrawToGraphicsContextWithColorAtPos
				(
					g, this.colorToDrawCornerPixelsWith, pixelPosTo
				);
			}
		}

		return canvas;
	}

	textToCanvas
	(
		edgesAsString: string,
		cellDimensionInPixels: number
	): any
	{
		var edges = this.textToEdges(edgesAsString, cellDimensionInPixels);

		var newline = "\n";
		var cellRowsAsStrings = edgesAsString.split(newline);
		var sizeInCells = Coords.fromXY
		(
			cellRowsAsStrings[0].length,
			cellRowsAsStrings.length
		);

		var canvas = this.edgesToCanvas
		(
			cellDimensionInPixels, sizeInCells, edges
		);

		return canvas;

	}

	textToEdges
	(
		edgesAsString: string,
		cellDimensionInPixels: number
	): Edge[]
	{
		var edgesAsStringContainsTabs = (edgesAsString.indexOf("\t") >= 0);
		if (edgesAsStringContainsTabs)
		{
			this.throwFormatError("The string must not contain tab characters.");
		}

		var newline = "\n";
		var cellRowsAsStrings = edgesAsString.split(newline);

		var cellRowLengths = cellRowsAsStrings.map(x => x.length);
		var cellRowLengthMax = Math.max(...cellRowLengths);
		cellRowsAsStrings =
			cellRowsAsStrings
				.map(x => x.padEnd(cellRowLengthMax, " ") );

		var sizeInCells = Coords.fromXY
		(
			cellRowsAsStrings[0].length,
			cellRowsAsStrings.length
		);

		var charCodeWestEast = "-";
		var charCodeNorthSouth = "|";
		var charCodeNorthwestSoutheast = "\\";
		var charCodeNortheastSouthwest = "/";

		var edgesSoFar: Edge[] = [];

		var cellPosAtStartOfPassInitialForDirection = Coords.create();
		var offsetToCellNextInPass = Coords.create();
		var offsetFromStartOfPassCurrentToNext = Coords.create();
		var charCodeForEdgeInDirection = "?";

		var directionIndicesToRead =
			[0, 1, 2, 3, 4, 5];

		for (var di = 0; di < directionIndicesToRead.length; di++)
		{
			var d = directionIndicesToRead[di];

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

			var edgesForThisDirection = this.textToEdges_ReadEdgesFromText
			(
				cellRowsAsStrings,
				sizeInCells,
				cellPosAtStartOfPassInitialForDirection,
				offsetToCellNextInPass,
				offsetFromStartOfPassCurrentToNext,
				charCodeForEdgeInDirection
			);

			edgesSoFar.push(...edgesForThisDirection);
		}

		return edgesSoFar;
	}

	textToEdges_ReadEdgesFromText
	(
		cellRowsAsStrings: string[],
		sizeInCells: Coords,
		cellPosAtStartOfPassInitialForDirection: Coords,
		offsetToCellNextInPass: Coords,
		offsetFromStartOfPassCurrentToNext: Coords,
		charCodeForEdgeInDirection: string,
	): Edge[]
	{
		var edgesSoFar: Edge[] = [];

		var charCodeCorner = "+";
		var charCodeBreak = "=";

		var cellPosAtStartOfPassCurrent =
			cellPosAtStartOfPassInitialForDirection.clone();
		var cellPos = cellPosAtStartOfPassCurrent.clone();
		var edgeCharsInEdgeSoFar = 0;

		var allPassesInDirectionAreComplete = false;

		while (allPassesInDirectionAreComplete == false)
		{
			var passCurrentIsDone = false;
			var cornerPosPrev = null;

			while (passCurrentIsDone == false)
			{
				var cellAsChar =
					cellRowsAsStrings[cellPos.y][cellPos.x];

				var edgeIsInProgress = (cornerPosPrev != null);

				if (edgeIsInProgress)
				{
					if
					(
						cellAsChar == charCodeCorner
						|| cellAsChar == charCodeBreak
					)
					{
						var edgeShouldBeDisregarded = false;

						if (edgeCharsInEdgeSoFar == 0)
						{
							var junctionEdgesIncoming = 
								edgesSoFar.filter(e => e.vertexIsPresentAtPos(cellPos) );
							var junctionAlreadyHasTwoIncomingEdges =
								(junctionEdgesIncoming.length >= 2);

							edgeShouldBeDisregarded = junctionAlreadyHasTwoIncomingEdges;
						}

						if (edgeShouldBeDisregarded)
						{
							// Abandon the edge in progress.
							cornerPosPrev = null;
						}
						else
						{
							var cornerPosCurrent = cellPos.clone();

							var edge =
								Edge.fromVertices(cornerPosPrev, cornerPosCurrent);

							edgesSoFar.push(edge);

							cornerPosPrev =
								cellAsChar == charCodeBreak
								? cornerPosCurrent.clone()
								: null;
						}
					}
					else if (cellAsChar == charCodeForEdgeInDirection)
					{
						edgeCharsInEdgeSoFar++;
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

	throwFormatError(message: string): void
	{
		throw new Error("Format error: " + message);
	}
}
