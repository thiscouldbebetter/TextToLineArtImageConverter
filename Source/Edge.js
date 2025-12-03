"use strict";
class Edge {
    constructor(vertices) {
        this.vertices = vertices;
    }
    static fromVertices(vertex0, vertex1) {
        return new Edge([vertex0, vertex1]);
    }
    vertexIsPresentAtPos(posToCheck) {
        return this.vertices.some(v => v.equals(posToCheck));
    }
    verticesReverse() {
        this.vertices = this.vertices.reverse();
        return this;
    }
    // Serialization.
    static fromStringFromVertexXxYToVertexXxY(edgeAsString) {
        var edgeVerticesAsStrings = edgeAsString.split("-");
        var edgeVertices = edgeVerticesAsStrings.map(x => Coords.fromStringXxY(x));
        var edge = new Edge(edgeVertices);
        return edge;
    }
    toStringFromVertexAsXxYToVertexAsXxY() {
        var returnValue = this.vertices[0].toStringXxY()
            + "-"
            + this.vertices[1].toStringXxY();
        return returnValue;
    }
}
