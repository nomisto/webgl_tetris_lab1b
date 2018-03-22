Background = function() {
	
	//returns an array of the vertices of this shape
	function getVertices(){
		return [
			-10.0, 5.0, -8.0,
			-10.0, -5.0, -8.0,
			10.0, 5.0, -8.0,
			10.0, -5.0, -8.0
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

	return {
		getVertices: getVertices,
		getTexcoords: getTexcoords,
		getNumItems: getNumItems
	};
}();