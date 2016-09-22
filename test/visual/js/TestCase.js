(function()
{
    function TestCase(original_outline)
    {
        this._original_outline = original_outline;

        var compressed_curve_canvas =
            document.getElementById("compressed-curve-canvas");
        this._compressed_curve_renderer =
            new Renderer(compressed_curve_canvas);
        this._compressed_curve_vertex_count =
            document.getElementById("compressed-curve-vertex-count");
    }

    TestCase.prototype =
    {
        initialize: function()
        {
            this._initialize_original_curve_view();
            this.update_compressed_curve_view();
            this._initialize_control_buttons();
        },
        _initialize_original_curve_view: function()
        {
            var canvas =
                document.getElementById("original-curve-canvas");
            var renderer =
                new Renderer(canvas);
            var vertex_count_element =
                document.getElementById("original-curve-vertex-count");

            renderer.draw_strip(this._original_outline);
            vertex_count_element.innerHTML = this._original_outline.length;
        },
        _initialize_control_buttons: function()
        {
            var tolerance_increase_button =
                document.getElementById("tolerance-increase-button");
            var tolerance_decrease_button =
                document.getElementById("tolerance-decrease-button");
            var vertex_visibility_checkbox =
                document.getElementById("vertex-visibility-checkbox");

            tolerance_increase_button
                .addEventListener('click', this._increase_tolerance.bind(this));
            tolerance_decrease_button
                .addEventListener('click', this._decrease_tolerance.bind(this));
            vertex_visibility_checkbox
                .addEventListener('change', function()
                {
                    if (vertex_visibility_checkbox.checked)
                    {
                        this._show_vertices();
                    }
                    else
                    {
                        this._hide_vertices();
                    }
                }.bind(this));
            vertex_visibility_checkbox.checked = this.rendering.vertices_visible;
        },

        update_compressed_curve_view: function()
        {
            var outline = CurveCompressor.compress_strip
            (   this._original_outline,
                this.compression.tolerance
            );
            this._compressed_curve_renderer.draw_strip
            (   outline,
                this.rendering.vertices_visible
            );
            this._compressed_curve_vertex_count.innerHTML = outline.length;
        },

        _increase_tolerance: function()
        {
            var value = 2 * this.compression.tolerance;
            if (value <= this.compression.maximum_tolerance)
            {
                this.compression.tolerance = value;
                this.update_compressed_curve_view();
            }
        },
        _decrease_tolerance: function()
        {
            var value = 0.5 * this.compression.tolerance;
            if (value >= this.compression.minimum_tolerance)
            {
                this.compression.tolerance = value;
                this.update_compressed_curve_view();
            }
        },

        _show_vertices: function()
        {
            this.rendering.vertices_visible = true;
            this.update_compressed_curve_view();
        },
        _hide_vertices: function()
        {
            this.rendering.vertices_visible = false;
            this.update_compressed_curve_view();
        },

        compression:
        {
            minimum_tolerance: 0.001,
            maximum_tolerance: 0.512,
            tolerance: 0.001
        },
        rendering:
        {
            vertices_visible: true
        }
    };

    window.TestCase = TestCase;
})();
