
class UiEventHandler
{
	static buttonConvertTextToImage_Clicked(): void
	{
		var d = document;
		var textareaLinesAsText: any =
			d.getElementById("textareaLinesAsText");
		var linesAsText = textareaLinesAsText.value;

		var inputCornerColor: any =
			d.getElementById("inputCornerColor");
		var colorToDrawCornerPixelsWith =
			inputCornerColor.value;

		var converter = new TextToLineArtImageConverter(colorToDrawCornerPixelsWith);

		var inputCellDimensionInPixels: any =
			d.getElementById("inputCellDimensionInPixels");
		var cellDimensionInPixels =
			parseInt(inputCellDimensionInPixels.value);

		var inputLineThicknessInPixels: any =
			d.getElementById("inputLineThicknessInPixels");
		var lineThicknessInPixels =
			parseFloat(inputLineThicknessInPixels.value);

		var linesAsCanvas =
			converter.textToCanvas
			(
				linesAsText, cellDimensionInPixels, lineThicknessInPixels
			);

		var divLinesAsImage =
			d.getElementById("divLinesAsImage");
		divLinesAsImage.innerHTML = "";
		divLinesAsImage.appendChild(linesAsCanvas);
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
