ObjectManager = function(){
	
	var tetrominos = [];
	var blockVertexBuffer;
	var background;
	var unitLength = 50;
	
	var index=1;
	
	
	// Initializes the variable background (needed in main)
	function addBackground() {
		var vertices = Background.getVertices();
		var texcoords = Background.getTexcoords();
		var numItems = Background.getNumItems();
		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);
		
		background = [createVertexPositionBuffer(vertices), createTexcoordsBuffer(texcoords), mvMatrix];
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
		var x = new Tetromino(index,vertexPositionBufferArray, texcoordsBufferArray, mvMatrices, blocks, x.getVectorToRotationOrigin(), 0, 3, 0);
		tetrominos.push(x);
		GameManager.setCurrent(x);
		index++;
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
	
	// returns the array of all tetrominos
	function getAllTetrominos(){
		return tetrominos;
	}
	
	//returns a tetromino of given index
	function getTetrominoByIndex(index){
		return tetrominos[index-1];
	}
	
	//deletes the last tetromino (needed when the game ends)
	function deleteLast(){
		tetrominos.pop();
		index--;
	}
	
	//deletes all tetrominos
	function deleteAll(){
		tetrominos=[];
		index = 1;
	}
	
	// returns the background object
	function getBackground(){
		return background;
	}
	
	
	return{
		createVertexPositionBuffer: createVertexPositionBuffer,
		addBackground: addBackground,
		addTetromino: addTetromino,
		getAllTetrominos: getAllTetrominos,
		getTetrominoByIndex: getTetrominoByIndex,
		deleteLast: deleteLast,
		deleteAll: deleteAll,
		getBackground: getBackground
	}
}();