
class UiEventHandler
{
	static buttonConvertTextToImage_Clicked()
	{
		var d = document;
		var textareaLinesAsText =
			d.getElementById("textareaLinesAsText");
		var linesAsText = textareaLinesAsText.value;

		var converter = new TextToLineArtImageConverter();

		var inputCellDimensionInPixels =
			d.getElementById("inputCellDimensionInPixels");
		var cellDimensionInPixels =
			parseInt(inputCellDimensionInPixels.value);

		var inputLineThicknessInPixels =
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

	static buttonDemo_Clicked()
	{
		var linesAsString = TextToLineArtImageConverter.textDemo();

		var d = document;
		var textareaLinesAsText =
			d.getElementById("textareaLinesAsText");
		textareaLinesAsText.value = linesAsString;
	}
}
