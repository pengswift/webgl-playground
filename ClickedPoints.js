var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' + 
    ' gl_PointSize = a_PointSize;\n' +
    '}\n';

var FSHADER_SOURCE = 
    'void main() {\n' +
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';    

function main() {
    var canvas = document.getElementById("webgl");

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    gl.vertexAttrib1f(a_PointSize, 10.0);

    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position);
    };


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


}

var g_points = [];
function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX;
    var y = ev.clientY;
    // 浏览器坐标
    var rect = ev.target.getBoundingClientRect()
    // 转到canvas 坐标-> webgl 坐标-> 归一化
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y -rect.top))/(canvas.width/2);
    //g_points.push(x);
    //g_points.push(y);
    //
    g_points.push([x,y]);

    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (var i = 0; i < len; i++) {
        var xy = g_points[i]
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

        gl.drawArrays(gl.POINTS, 0, 1);
    }

}
