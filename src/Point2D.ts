/**
 * @author Raoul Harel
 * @license The MIT license.
 * @url github.com/rharel/ts-curve-compressor
 */


module CurveCompressor
{
	/**
	 * Two-dimensional point structure.
	 */
	export interface Point2D
	{
		x: number;
		y: number;
	}
}
module CurveCompressor.Internal
{
	/**
	 * Two-dimensional vector class and related operations.
	 */
	export class Vector2D implements Point2D
	{
		constructor(x: number, y: number)
		{
			this.x = x;
			this.y = y;
		}

		/**
		 * Creates a new vector object from given point.
		 * @param source Source point to duplicate.
		 * @returns {CurveCompressor.Internal.Vector2D}
		 */
		static duplicate(source: Point2D): Vector2D
		{
			return new Vector2D(source.x, source.y);
		}

		/**
		 * Computes the angle (in radians) between two vectors.
		 * @param a First vector.
		 * @param b Second vector.
		 * @returns {number}
		 */
		static angle(a: Vector2D, b: Vector2D): number
		{
			return Math.acos(a.unit().dot(b.unit()));
		}

		/**
		 * Computes the component-wise addition of this with another vector.
		 * @param other Other vector.
		 * @returns {CurveCompressor.Internal.Vector2D}
		 */
		add(other: Point2D): Vector2D
		{
			return new Vector2D
			(	this.x + other.x,
				this.y + other.y
			);
		}
		/**
		 * Computes the component-wise subtraction of this with another vector.
		 * @param other Other vector.
		 * @returns {CurveCompressor.Internal.Vector2D}
		 */
		subtract(other: Point2D): Vector2D
		{
			return new Vector2D
			(	this.x - other.x,
				this.y - other.y
			);
		}

		/**
		 * Computes the multiplication of this with a scalar.
		 * @param scalar Factor.
		 * @returns {CurveCompressor.Internal.Vector2D}
		 */
		multiply(scalar: number): Vector2D
		{
			return new Vector2D
			(	this.x * scalar,
				this.y * scalar
			);
		}
		/**
		 * Computes the division of this with a scalar.
		 * @param scalar Divisor.
		 * @returns {CurveCompressor.Internal.Vector2D}
		 */
		divide(scalar: number): Vector2D
		{
			return new Vector2D
			(	this.x / scalar,
				this.y / scalar
			);
		}

		/**
		 * Computes the dot product between this and another vector.
		 * @param other Other vector.
		 * @returns {number}
		 */
		dot(other: Point2D): number
		{
			return this.x * other.x +
				   this.y * other.y;
		}

		/**
		 * Computes the squared magnitude of this.
		 * @returns {number}
		 */
		length_squared(): number
		{
			return this.dot(this);
		}
		/**
		 * Computes the magnitude of this.
		 * @returns {number}
		 */
		length(): number
		{
			return Math.sqrt(this.length_squared());
		}

		/**
		 * Computes the normalized version of this.
		 * @returns {Vector2D}
		 */
		unit(): Vector2D
		{
			return this.divide(this.length());
		}

		x: number;
		y: number;
	}
}