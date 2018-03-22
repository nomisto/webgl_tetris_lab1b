LShape = function() {
	
	//returns an array of the vertices of this shape
	function getVertices(){
		return [
			1.0, 1.0, -5.0,
			1.0, -1.0, -5.0,
			-1.0, 1.0, -5.0,
			-1.0, -1.0, -5.0
		];
	}
	
	//returns the texture coordinates of this shape
	function getTexcoords(){
		return [
			2048/4608, 0.0,
			2048/4608, 128/1024,
			2304/4608, 0.0,
			2176/4608, 128/1024,
			2304/4608, 384/1024,
			2176/4608, 384/1024
		]
	}
	
	//returns the number of vertices stored in the getVertices()
	function getNumItems() {
		return 4;
	}
	
	return {
		getVertices: getVertices,
		getTexcoords: getTexcoords,
		getNumItems: getNumItems
	}
}();