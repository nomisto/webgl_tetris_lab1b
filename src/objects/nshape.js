NShape = function() {
	
	//returns an array of the vertices of this shape
	function getVertices(){
		return [
			-1.0, 1.0, -5.0,
			-1.0, 0.0, -5.0,
			1.0, 1.0, -5.0,
			0.0, 0.0, -5.0,
			1.0, 0.0, -5.0,
			0.0, -1.0, -5.0,
			2.0, 0.0, -5.0,
			2.0, -1.0, -5.0
		];
	}
	
	//returns the texture coordinates of this shape
	function getTexcoords(){
		return [
			2048/4608, 512/1024,
			2048/4608, 640/1024,
			2304/4608, 512/1024,
			2176/4608, 640/1024,
			2304/4608, 640/1024,
			2176/4608, 768/1024,
			2432/4608, 640/1024,
			2432/4608, 768/1024
		]
	}
	
	//returns the number of vertices stored in the getVertices()
	function getNumItems() {
		return 8;
	}
	return {
		getVertices: getVertices,
		getTexcoords: getTexcoords,
		getNumItems: getNumItems
	}
}();