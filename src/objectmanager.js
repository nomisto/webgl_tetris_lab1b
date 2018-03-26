ObjectManager = function(){
	var tetrominos = [];
	var blockVertexBuffer;
	var background;
	var unitLength = 50;
	
	// The object class stores the Buffer of the Vertexpositions and of the Texturecoords.
	// Also stores the model-view matrix and the orientation of the object.
	function Tetromino(vertexPositionBufferArray, texcoordsBufferArray, mvMatrixArray, vectorToRotationOriginArray, orientation) {
		this.vertexPositionBufferArray=vertexPositionBufferArray;
		this.texcoordsBufferArray=texcoordsBufferArray;
		this.mvMatrixArray = mvMatrixArray;
		this.vectorToRotationOriginArray = vectorToRotationOriginArray;
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
		
		background = new Tetromino(createVertexPositionBuffer(vertices), createTexcoordsBuffer(texcoords), mvMatrix, 0)
	}

	// Determines which tetromino to initialize.
	function addTetromino(input) {
		if(input==1){
			initTetromino(LShape);
		}
		else if(input==2){
			initTetromino(ZShape);
		}
		else if(input==3){
			initTetromino(JShape);
		}
		else if(input==4){
			initTetromino(SShape);
		}
		else if(input==5){
			initTetromino(OShape);
		}
		else if(input==6){
			initTetromino(IShape);
		}
		else if(input==7){
			initTetromino(TShape);
		}
	}

	// Initializes an object as a tetromino and pushes it to the tetrominos array.
	function initTetromino(x){
		
		var texcoordsBufferArray = [];
		var vertexPositionBufferArray = [];
		var mvMatrices = [];
		
		if(blockVertexBuffer==null){
			blockVertexBuffer=createVertexPositionBuffer(Block.getVertices());
		}
		
		var blocks = x.getBlocks();
		
		var texturetypex = Math.floor((Math.random() * 5));
		var texturetypey = Math.floor((Math.random() * 2));
		
		for(i = 0; i<4; i++){
			vertexPositionBufferArray.push(blockVertexBuffer);
			
			var texcoords = Texture.getTextureCoords(texturetypex, texturetypey, blocks[i*2], -blocks[i*2+1]);
			texcoordsBufferArray.push(createTexcoordsBuffer(texcoords));
			
			var mvMatrix = mat4.create();
			mat4.identity(mvMatrix);
			mat4.translate(mvMatrix, mvMatrix, [-0.5,7.5,0]);
			mat4.translate(mvMatrix, mvMatrix, [blocks[i*2], blocks[i*2+1], 0]);
			mvMatrices.push(mvMatrix);
		}
		var x = new Tetromino(vertexPositionBufferArray, texcoordsBufferArray, mvMatrices, x.getVectorToRotationOrigin(), 0)
		tetrominos.push(x);
		AnimationHandler.setCurrent(x);
	}

	// Creates a vertexposition buffer and binds it 
	function createVertexPositionBuffer(vertices){
		var vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexPositionBuffer.itemSize = 3;
		vertexPositionBuffer.numItems = 4;
		return vertexPositionBuffer;
	}

	// Creates a texturecoordinations buffer and binds it 
	function createTexcoordsBuffer(texcoords){
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
		createVertexPositionBuffer: createVertexPositionBuffer,
		addBackground: addBackground,
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