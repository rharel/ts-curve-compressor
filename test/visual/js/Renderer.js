function Renderer(canvas)
{
    this._canvas = canvas;
    this._2d = canvas.getContext('2d');
}

Renderer.BACKGROUND_COLOR = "lightgrey";

Renderer.CURVE_COLOR = "black";
Renderer.CURVE_WIDTH = 3;

Renderer.VERTEX_COLOR = "blue";
Renderer.VERTEX_RADIUS = 5;

Renderer.prototype =
{
    constructor: Renderer,

    draw_strip: function(vertices, draw_vertices)
    {
        if (vertices.length < 2) { return; }

        vertices = vertices.map(function(vertex)
        {
            return this._convert_coordinates(vertex);
        }.bind(this));

        this._draw_background();
        this._draw_strip(vertices);
        if (draw_vertices)
        {
            this._draw_vertices(vertices);
        }
    },

    _draw_background: function()
    {
        this._2d.save();

        this._2d.fillStyle = Renderer.BACKGROUND_COLOR;
        this._2d.fillRect
        (   0, 0,
            this._canvas.width,
            this._canvas.height
        );

        this._2d.restore();
    },
    _draw_strip: function(vertices)
    {
        this._2d.save();

        this._2d.strokeStyle = Renderer.CURVE_COLOR;
        this._2d.lineWidth = Renderer.CURVE_WIDTH;

        this._2d.beginPath();
        this._2d.moveTo(vertices[0].x, vertices[0].y);
        vertices
            .slice(1)
            .forEach(function(vertex)
            {
                this._2d.lineTo(vertex.x, vertex.y);
            }.bind(this));
        this._2d.stroke();

        this._2d.restore();
    },
    _draw_vertices: function(vertices)
    {
        this._2d.save();

        this._2d.fillStyle = Renderer.VERTEX_COLOR;
        vertices
            .forEach(function(vertex)
            {
                this._2d.beginPath();
                this._2d.arc
                (   vertex.x, vertex.y,
                    Renderer.VERTEX_RADIUS,
                    0.0, 2 * Math.PI
                );
                this._2d.fill();
            }.bind(this));

        this._2d.restore();
    },

    _convert_coordinates: function(p)
    {
        return { x: p.x * this._canvas.width,
                 y: p.y * this._canvas.height }
    }
};
