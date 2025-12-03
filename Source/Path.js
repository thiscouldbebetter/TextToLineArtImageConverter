"use strict";
class Path {
    constructor(vertices) {
        this.vertices = vertices;
    }
    static fromVertices(vertices) {
        return new Path(vertices);
    }
    static manyFromEdges(edges) {
        var edgesToPutIntoPaths = edges.map(x => x);
        var edgeFirst = edgesToPutIntoPaths[0];
        edgesToPutIntoPaths.splice(0, 1);
        var pathCurrentAsEdges = [edgeFirst];
        var pathsSoFarAsEdgeArrays = [pathCurrentAsEdges];
        while (edgesToPutIntoPaths.length > 0) {
            var edgeWasConnectedToPathThisTime = false;
            for (var i = 0; i < 1; i++) {
                var e = (i == 0)
                    ? 0
                    : pathCurrentAsEdges.length - 1;
                var pathEdgeToBeConnectedTo = pathCurrentAsEdges[e];
                var v = i;
                var vReversed = 1 - v;
                var pathVertexToBeConnectedTo = pathEdgeToBeConnectedTo.vertices[v];
                var edgeToBeConnectedToPath = edgesToPutIntoPaths
                    .find(e => e.vertices.some(v => v.equals(pathVertexToBeConnectedTo)));
                if (edgeToBeConnectedToPath != null) {
                    edgeWasConnectedToPathThisTime = true;
                    var vertexToBeConnectedToPath = edgeToBeConnectedToPath.vertices[vReversed];
                    var edgeNeedsReversing = (vertexToBeConnectedToPath.equals(pathVertexToBeConnectedTo) == false);
                    if (edgeNeedsReversing) {
                        edgeToBeConnectedToPath.verticesReverse();
                    }
                    if (i == 0) {
                        pathCurrentAsEdges.splice(0, 0, edgeToBeConnectedToPath);
                    }
                    else {
                        pathCurrentAsEdges.push(edgeToBeConnectedToPath);
                    }
                    var edgeIndexToRemoveAt = edgesToPutIntoPaths.indexOf(edgeToBeConnectedToPath);
                    edgesToPutIntoPaths.splice(edgeIndexToRemoveAt, 1);
                    break;
                }
            } // end for i (start or end of current path)
            if (edgeWasConnectedToPathThisTime == false) {
                var edgeToStartNextPathWith = edgesToPutIntoPaths[0];
                edgesToPutIntoPaths.splice(0, 1);
                pathCurrentAsEdges = [edgeToStartNextPathWith];
                pathsSoFarAsEdgeArrays.push(pathCurrentAsEdges);
            }
        }
        var paths = pathsSoFarAsEdgeArrays
            .map(p => Path.fromVertices(p.map(e => e.vertices[0])));
        return paths;
    }
    // Serialization.
    static fromStringVerticesAsXxY(pathAsString) {
        var vertices = pathAsString.split("-").map(x => Coords.fromStringXxY(x));
        return new Path(vertices);
    }
    toStringVerticesAsXxY() {
        var returnValue = this.vertices.map(x => x.toStringXxY()).join("-");
        return returnValue;
    }
}
