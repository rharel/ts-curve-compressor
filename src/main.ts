/**
 * @author Raoul Harel
 * @license The MIT license.
 * @url github.com/rharel/ts-curve-compressor
 */


module CurveCompressor
{
	import Vector2D = CurveCompressor.Internal.Vector2D;

	/**
	 * Computes a compressed version of the specified line-strip.
	 * @param vertices Vertex-sequence making up the strip.
	 * @param tolerance Curvature-error tolerance as a fraction of pi.
	 * @returns
	 * 		Array of points representing the compressed version of the specified
 	 * 		strip.
	 */
	export function compress_strip
	(	vertices: Array<Point2D>,
		tolerance: number
	): 	Array<Point2D>
	{
		if (vertices.length < 3) { return vertices; }

		tolerance = Math.max(tolerance, 0.0) * Math.PI;

		let source: Array<Vector2D> =
			vertices.map(p => Vector2D.duplicate(p));
		let compressed: Array<Vector2D> = source.slice(0, 2);

		for (let i = 2; i < source.length - 1; ++i)
		{
			let n = compressed.length;
			let a = compressed[n - 2];
			let b = compressed[n - 1];
			let c = source[i];

			if (compute_error(a, b, c) > tolerance)
			{
				compressed.push(c);
			}
			else
			{
				compressed[n - 1] = c;
			}
		}
		compressed.push(source[source.length - 1]);

		return compressed;
	}
	/**
	 * Computes the curvature-error of three consecutive points on the curve
	 * A, B, and C. The error is the angle between AB and BC.
	 * @param a First point.
	 * @param b Second point.
	 * @param c Third point.
	 * @returns {number} The angle (in radians) between AB and BC.
	 */
	function compute_error
	(	a: Vector2D,
		b: Vector2D,
		c: Vector2D
	): 	number
	{
		let ab = b.subtract(a);
		let bc = c.subtract(b);
		return Vector2D.angle(ab, bc);
	}
}
