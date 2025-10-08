
class Edge
{
	constructor(vertices)
	{
		this.vertices = vertices;
	}

	static fromVertices(vertex0, vertex1)
	{
		return new Edge( [ vertex0, vertex1 ] );
	}
}
