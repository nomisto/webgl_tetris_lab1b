
var gl;
var shaderProgram;

// Creates, compiles and returns the shader of the given id.
function getShader(id) {
		var shaderScript = document.getElementById(id);
		if (!shaderScript) {
			return null;
		}
		var str = "";
		var k = shaderScript.firstChild;
		while (k) {
			if (k.nodeType == 3) {
				str += k.textContent;
			}
			k = k.nextSibling;
		}
		var shader;
		if (shaderScript.type == "x-shader/x-fragment") {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		} else if (shaderScript.type == "x-shader/x-vertex") {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			return null;
		}
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

// Initializes the shader program
// Gets the location of the attributes and uniforms of the vertexShader and stores it in the shaderProgram
function initShaders(vertexShaderId, fragmentShaderId) {
	var fragmentShader = getShader(fragmentShaderId);
	var vertexShader = getShader(vertexShaderId);

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexTexcoordsAttribute = gl.getAttribLocation(shaderProgram, "aTexCoords");
	gl.enableVertexAttribArray(shaderProgram.vertexTexcoordsAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

// sets the uniform uPMatrix of the vertexshader to the projection matrix
function setPMatrixUniform(pMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}

// sets the uniform uMVMatrix of the vertexshader to the model-view matrix
function setMvMatrixUniform(mvMatrix) {
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}


//Draws the Arrays and hands over the belonging mvMatrix of all tetrominos/objects stored in the ObjectManager
//Also creates the perspective Matrix and sets it to the uniform.
function drawScene() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var pMatrix = mat4.create();
    mat4.identity(pMatrix);
    mat4.perspective(pMatrix, Math.PI/2, (gl.viewportWidth/gl.viewportHeight), 0.1, 2000.0);
    setPMatrixUniform(pMatrix);
	
	var background = ObjectManager.getBackground();
	setMvMatrixUniform(background[2]);	
	gl.bindBuffer(gl.ARRAY_BUFFER, background[0]);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, background[1]);
	gl.vertexAttribPointer(shaderProgram.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
    
    ObjectManager.getAllTetrominos().forEach(function(o) {
		for (i=0; i<o.blocklength; i++){
			if(o.mvMatrixArray[i]!=null){
				setMvMatrixUniform(o.mvMatrixArray[i]);
				
				gl.bindBuffer(gl.ARRAY_BUFFER, o.vertexPositionBufferArray[i]);
				gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, o.texcoordsBufferArray[i]);
				gl.vertexAttribPointer(shaderProgram.vertexTexcoordsAttribute, 2, gl.FLOAT, false, 0, 0);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			}
		}
	});
}

// the render loop, which loops the whole runtime
function renderLoop() {
    InputHandler.handleInput();
	AnimationHandler.animate();
	drawScene();
    requestAnimFrame(renderLoop);
}

// the start point of the webgl program
function webGLStart() {
    // setup of WebGL
    var canvas = document.getElementById('lab01-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    // define input handling functions
    document.onkeydown = InputHandler.handleKeyDown;
    document.onkeyup = InputHandler.handleKeyUp;
	
	// Initialize shaders, load textures and add the wanted tetrominos.
    initShaders("vertexshader","fragmentshader");

    // set clearColor to black (r,g,b,a) and enable depth test.
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
	
	Texture.loadTextures();
	ObjectManager.addBackground();
	GameManager.initializeNewGame();
    renderLoop();
}