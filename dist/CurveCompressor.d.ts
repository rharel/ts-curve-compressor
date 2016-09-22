declare module CurveCompressor {
    interface Point2D {
        x: number;
        y: number;
    }
}
declare module CurveCompressor.Internal {
    class Vector2D implements Point2D {
        constructor(x: number, y: number);
        static duplicate(source: Point2D): Vector2D;
        static angle(a: Vector2D, b: Vector2D): number;
        add(other: Point2D): Vector2D;
        subtract(other: Point2D): Vector2D;
        multiply(scalar: number): Vector2D;
        divide(scalar: number): Vector2D;
        dot(other: Point2D): number;
        length_squared(): number;
        length(): number;
        unit(): Vector2D;
        x: number;
        y: number;
    }
}
declare module CurveCompressor {
    function compress_strip(vertices: Array<Point2D>, tolerance: number): Array<Point2D>;
}
declare module CurveCompressor.Internal {
    function clamp(value: number, lower_bound: number, upper_bound: number): number;
}
