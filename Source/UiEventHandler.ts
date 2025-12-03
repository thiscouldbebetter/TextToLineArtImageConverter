
class UiEventHandler
{
	static buttonConvertEdgesToCanvas_Clicked()
	{
		var d = document;

		var colorToDrawCornerPixelsWith: string = null;

		if (edgeEndpointsShouldBeHighlighted)
		{
			var inputCornerColor: any =
				d.getElementById("inputCornerColor");
			colorToDrawCornerPixelsWith =
				inputCornerColor.value;
		}

		var textareaEdgesAsText: any =
			d.getElementById("textareaEdgesAsText");
		var newline = "\n";
		var edgesSerialized = (textareaEdgesAsText.value as string).split(newline);
		var edges = edgesSerialized.map(x => Edge.fromStringFromVertexXxYToVertexXxY(x) )

		var edgeVerticesAll: Coords[] = [];
		edges.forEach(e => edgeVerticesAll.push(...e.vertices) );
		var edgeVertexPosMaxSoFar = edgeVerticesAll[0].clone();
		edgeVerticesAll.forEach
		(
			v =>
			{
				if (v.x > edgeVertexPosMaxSoFar.x)
				{
					edgeVertexPosMaxSoFar.x = v.x;
				}
				if (v.y > edgeVertexPosMaxSoFar.y)
				{
					edgeVertexPosMaxSoFar.y = v.y;
				}
			}
		);

		var checkboxHighlightEdgeEndpoints: any =
			d.getElementById("checkboxHighlightEdgeEndpoints");
		var edgeEndpointsShouldBeHighlighted =
			checkboxHighlightEdgeEndpoints.checked;

		var converter = new TextToLineArtImageConverter(colorToDrawCornerPixelsWith);

		var inputCellDimensionInPixels: any =
			d.getElementById("inputCellDimensionInPixels");
		var cellDimensionInPixels =
			parseInt(inputCellDimensionInPixels.value);

		var sizeInCells = edgeVertexPosMaxSoFar.add(Coords.fromXY(1, 1) );

		var linesAsCanvas =
			converter.edgesToCanvas
			(
				cellDimensionInPixels,
				sizeInCells,
				edges
			);

		var divLinesAsImage =
			d.getElementById("divLinesAsImage");
		divLinesAsImage.innerHTML = "";
		divLinesAsImage.appendChild(linesAsCanvas);
	}

	static buttonConvertTextToEdges_Clicked(): void
	{
		var d = document;
		var textareaLinesAsText: any =
			d.getElementById("textareaLinesAsText");
		var linesAsText = textareaLinesAsText.value;

		var converter = new TextToLineArtImageConverter(null);

		var linesAsEdges =
			converter.textToEdges(linesAsText);

		var edgesSerialized =
			linesAsEdges.map(x => x.toStringFromVertexAsXxYToVertexAsXxY() );

		var newline = "\n";

		var edgesSerializedJoined = edgesSerialized.join(newline);
		var textareaEdgesAsText: any =
			d.getElementById("textareaEdgesAsText");
		textareaEdgesAsText.value = edgesSerializedJoined;
	}


	static inputFontHeightInPixels_Changed(inputFontHeightInPixels: any): void
	{
		var d = document;
		var textareaLinesAsText: any =
			d.getElementById("textareaLinesAsText");
		var fontHeightInPixels = parseInt(inputFontHeightInPixels.value);
		textareaLinesAsText.fontSize = fontHeightInPixels;
	}

	static selectDemo_Changed(selectDemo: any): void
	{
		var demoName = selectDemo.value;

		var linesAsString = TextToLineArtImageConverter.textDemoGetByName(demoName);

		var d = document;
		var textareaLinesAsText: any =
			d.getElementById("textareaLinesAsText");
		textareaLinesAsText.value = linesAsString;
	}
}
