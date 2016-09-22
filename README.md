## What is this?

This is a library that takes general curves (expressed as line-strips) 
and compresses them. That is, finds a way to represent them using less 
vertices while aiming to maintain the original curve's shape. Please 
view the demo [here](http://rharel.github.io/ts-curve-compressor/).

## Installation

Install via npm: `npm install curve-compressor`

The `dist/` directory contains both a normal (`CurveCompressor.js`) as 
well as a minified version of the library (`CurveCompressor.min.js`).
Include in the browser using:
`<script src="CurveCompressor.js"></script>`

## Usage

### Curves as line-strips

First, represent your curve as a line-strip. That is, a sequence of 
vertices where each two adjacent vertices in the sequence represent
a segment of the curve.

One way of doing this for a general curve is to sample it at regular
intervals `dt` from `t = 0.0` to `t = 1.0`. Typically `dt` should be 
small enough to represent your curve at a sufficient level of detail.

Your strip should then be an array of objects of the form 
`{x: number, y: number}`; representing the vertices in their sampling 
order.

### Compression

Once you have a strip representative of your curve, compress it like so:

```javascript
var strip = [...];
var tolerance = 0.01;
var compressed = CurveCompressor.compress_strip(strip, tolerance); 
```

The compression algorithm used tries to find sub-sequences of vertices
on the strip that are roughly collinear - and reduces those to single
line segments. For example: if in a section of the strip the sequence of 
points A, B, and C lie roughly on the same line, we may remove B from 
the strip and it will maintain its general shape (albeit not to the same
degree of precision).

The parameter `tolerance` in `compress_strip(strip, tolerance)` 
represents the maximal angle (expressed as a fraction of Pi) between AB
and BC that we are willing to tolerate losing when removing B.

That's it! `compressed` now contains the compressed version of the 
original strip. You can view this in action [here](http://rharel.github.io/ts-curve-compressor/).
## License

This software is licensed under the **MIT License**. See the [LICENSE](LICENSE.txt) file for more information.
