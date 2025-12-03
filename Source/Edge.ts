
class Edge
{
	vertices: Coords[];

	constructor(vertices: Coords[] )
	{
		this.vertices = vertices;
	}

	static fromVertices(vertex0: Coords, vertex1: Coords)
	{
		return new Edge( [ vertex0, vertex1 ] );
	}

	vertexIsPresentAtPos(posToCheck: Coords): boolean
	{
		return this.vertices.some(v => v.equals(posToCheck) )
	}

	// Serialization.

	static fromStringFromVertexXxYToVertexXxY(edgeAsString: string): Edge
	{
		var edgeVerticesAsStrings = edgeAsString.split("-");
		var edgeVertices = edgeVerticesAsStrings.map(x => Coords.fromStringXxY(x) );
		var edge = new Edge(edgeVertices);
		return edge;
	}

	toStringFromVertexAsXxYToVertexAsXxY(): string
	{
		var returnValue =
			this.vertices[0].toStringXxY()
			+ "-"
			+ this.vertices[1].toStringXxY();

		return returnValue;
	}
}
