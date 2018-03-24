Background = function() {
	
	//returns an array of the vertices of this shape
	function getVertices(){
		return [
			-20.0, 10.0, -10.0,
			-20.0, -10.0, -10.0,
			20.0, 10.0, -10.0,
			20.0, -10.0, -10.0
		];
	}
	
	//returns the texture coordinates of this shape
	function getTexcoords(){
		return [
			0, 0,
			0, 1,
			2048/4608, 0,
			2048/4608, 1
		]
	}
	
	//returns the number of vertices stored in the getVertices()
	function getNumItems(){
		return 4;
	}

	// Initializes an object as the background.
	// Function and storage is separately from the tetrominos, because the background shouldn't scale if the unitlength is set to a different value.
	function addBackground() {
		var vertices = Background.getVertices();
		var texcoords = Background.getTexcoords();
		var numItems = Background.getNumItems();
		
		var mvMatrix = mat4.create();
		mat4.identity(mvMatrix);
		
		background = new Object(createVertexPositionBuffer(vertices), createTexcoordsBuffer(texcoords), mvMatrix, 0)
	}
	
	return {
		getVertices: getVertices,
		getTexcoords: getTexcoords,
		getNumItems: getNumItems
	};
}();