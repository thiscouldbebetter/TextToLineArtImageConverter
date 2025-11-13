
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static create()
	{
		return new Coords(0, 0);
	}

	static fromXY(x, y)
	{
		return new Coords(x, y);
	}

	absolute()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	addXY(x, y)
	{
		this.x += x;
		this.y += y;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	equals(other)
	{
		return (this.x == other.x && this.y == other.y);
	}

	isInRangeMax(max)
	{
		var returnValue =
			this.x >= 0
			&& this.x < max.x
			&& this.y >= 0
			&& this.y < max.y;

		return returnValue;
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	xySet(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}
}
