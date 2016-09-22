/**
 * @author Raoul Harel
 * @license The MIT license.
 * @url github.com/rharel/ts-curve-compressor
 */


module CurveCompressor.Internal
{
	/**
	 * Clamps the specified value to given range.
	 * @param value Number to clamp.
	 * @param lower_bound Range's lower bound.
	 * @param upper_bound Range's upper bound.
	 * @returns {number}
	 */
	export function clamp
	(	value: number,
		lower_bound: number,
		upper_bound: number
	):  number
	{
		return Math.max
		(	Math.min(value, upper_bound),
			lower_bound
		);
	}
}
