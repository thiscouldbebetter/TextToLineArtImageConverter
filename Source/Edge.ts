
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
}
