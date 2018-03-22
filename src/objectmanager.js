ObjectManager = function(){
	var tetrominos = [];
	var background;
	var unitLength = 50;
	
	// The object class stores the Buffer of the Vertexpositions and of the Texturecoords.
	// Also stores the model-view matrix and the orientation of the object.
	function Object(vertexPositionBuffer, vertexTexcoordsBuffer, mvMatrix, orientation) {
		this.vertexPositionBuffer=vertexPositionBuffer;
		this.vertexTexcoordsBuffer=vertexTexcoordsBuffer;
		this.mvMatrix = mvMatrix;
		this.orientation = orientation;
	}
	
	// Initializes an object as the background.
	// Function and storage is separately from the tetrominos, because the background shouldn't scale if the unitlength is set to a different value.
	function addBackground() {
		var vertices = Background.getVertices();
		var texcoords = Background.getTexcoords();
		var numItems = Background.getNumItems();
		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);
		
		background = new Object(createVertexPositionBuffer(vertices,numItems), createVertexTexcoordsBuffer(texcoords,numItems), mvMatrix, 0)
	}

	// Determines which tetromino to initialize.
	function addTetromino(input) {
		if(input=="l"){
			initTetromino(LShape);
		}
		else if(input=="n"){
			initTetromino(NShape);
		}
	}

	// Initializes an object as a tetromino and pushes it to the tetrominos array.
	function initTetromino(x){
		var vertices = x.getVertices();
		var texcoords = x.getTexcoords();
		var numItems = x.getNumItems();
		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);
		
		// the following translate is to put the two shapes in different places
		if(numItems==6) {mat4.translate(mvMatrix, mvMatrix, [-5, 0, 0]);}
		else if(numItems==8) {mat4.translate(mvMatrix, mvMatrix, [5, 0, 0]);}
		
		tetrominos.push(new Object(createVertexPositionBuffer(vertices,numItems), createVertexTexcoordsBuffer(texcoords,numItems), mvMatrix, 0));
	}

	// Creates a vertexposition buffer and binds it 
	function createVertexPositionBuffer(vertices, numItems){
		var vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = numItems;
		return vertexPositionBuffer;
	}

	// Creates a texturecoordinations buffer and binds it 
	function createVertexTexcoordsBuffer(texcoords, numItems){
		var vertexTexcoordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexcoordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
		return vertexTexcoordsBuffer;
	}
	
	// Sets the unitlength of a tetromino to the value stored in the "unitlength" input element in the HTML.
	// Returns errors to the HTML if the value is invalid.
	function setUnitLength(){
		document.getElementById("error").innerHTML = "";
		var val = document.getElementById("unitlength").value;
		if(val!=null && val > 0){
			var scalfac = val/unitLength;
			tetrominos.forEach(function(o) {
				mat4.scale(o.mvMatrix,o.mvMatrix,[scalfac,scalfac,1]);
			});
			unitLength = val;
			document.getElementById("currentlength").innerHTML = "Current length of one unit: " + unitLength + " px.";
		}
		else {
			document.getElementById("error").innerHTML = "Error! Please be sure to submit a positive integer!";
		}
	}
	
	// returns the current unit length
	function getUnitLength(){
		return unitLength;
	}
	
	// returns the array of all tetrominos
	function getAllTetrominos(){
		return tetrominos;
	}
	
	// returns the background object
	function getBackground(){
		return background;
	}
	
	// returns the modulo of n by m
	// The extra function is because f.e. -1%4 would be -1 instead of 3
	function mod(n, m) {
        return ((n % m) + m) % m;
		
	}
	
	// returns the orientation of the tetromino of given index
	function getTetrominoOrientation(index){
		return mod(tetrominos[index].orientation,4);
	}
	
	// decrements the orientation value of the tetromino of given index
	function decrementTetrominoOrientation(index){
		tetrominos[index].orientation--;
	}
	
	// increments the orientation value of the tetromino of given index
	function incrementTetrominoOrientation(index){
		tetrominos[index].orientation++;
	}
	
	return{
		addTetromino: addTetromino,
		addBackground: addBackground,
		setUnitLength: setUnitLength,
		getAllTetrominos: getAllTetrominos,
		getTetrominoOrientation: getTetrominoOrientation,
		decrementTetrominoOrientation: decrementTetrominoOrientation,
		incrementTetrominoOrientation: incrementTetrominoOrientation,
		getUnitLength: getUnitLength,
		getBackground: getBackground
	}
}();