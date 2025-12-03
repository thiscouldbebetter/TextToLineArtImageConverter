"use strict";
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static create() {
        return new Coords(0, 0);
    }
    static fromXY(x, y) {
        return new Coords(x, y);
    }
    absolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    addXY(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    clone() {
        return new Coords(this.x, this.y);
    }
    dimension(d) {
        var returnValue = d == 0
            ? this.x
            : d == 1
                ? this.y
                : null;
        return returnValue;
    }
    dimensionSet(d, value) {
        this.x = (d == 0) ? value : this.x;
        this.y = (d == 1) ? value : this.y;
        return this;
    }
    divide(other) {
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }
    equals(other) {
        return (this.x == other.x && this.y == other.y);
    }
    isInRangeMax(max) {
        var returnValue = this.x >= 0
            && this.x < max.x
            && this.y >= 0
            && this.y < max.y;
        return returnValue;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    multiply(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    overwriteWith(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    xySet(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    // Serialization.
    static fromStringXxY(coordsAsStringXxY) {
        var dimensions = coordsAsStringXxY.split("x").map(x => parseFloat(x));
        return Coords.fromXY(dimensions[0], dimensions[1]);
    }
    toStringXxY() {
        return this.x + "x" + this.y;
    }
}
