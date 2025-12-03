
class Coords
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	static create(): Coords
	{
		return new Coords(0, 0);
	}

	static fromXY(x: number, y: number): Coords
	{
		return new Coords(x, y);
	}

	absolute(): Coords
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	add(other: Coords): Coords
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	addXY(x: number, y: number): Coords
	{
		this.x += x;
		this.y += y;
		return this;
	}

	clone(): Coords
	{
		return new Coords(this.x, this.y);
	}

	dimension(d: number): number
	{
		var returnValue =
			d == 0
			? this.x
			: d == 1
			? this.y
			: null;

		return returnValue;
	}

	dimensionSet(d: number, value: number): Coords
	{
		this.x = (d == 0) ? value : this.x;
		this.y = (d == 1) ? value : this.y;
		return this;
	}

	divide(other: Coords): Coords
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	equals(other: Coords): boolean
	{
		return (this.x == other.x && this.y == other.y);
	}

	isInRangeMax(max: Coords)
	{
		var returnValue =
			this.x >= 0
			&& this.x < max.x
			&& this.y >= 0
			&& this.y < max.y;

		return returnValue;
	}

	magnitude(): number
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiply(other: Coords): Coords
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar: number): Coords
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	overwriteWith(other: Coords): Coords
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	subtract(other: Coords): Coords
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	xySet(x: number, y: number): Coords
	{
		this.x = x;
		this.y = y;
		return this;
	}

	// Serialization.

	static fromStringXxY(coordsAsStringXxY: string): Coords
	{
		var dimensions = coordsAsStringXxY.split("x").map(x => parseFloat(x) );
		return Coords.fromXY(dimensions[0], dimensions[1]);
	}

	toStringXxY(): string
	{
		return this.x + "x" + this.y;
	}
}
