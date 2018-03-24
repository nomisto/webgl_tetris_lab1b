LShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			1,0,
			1,-1,
			1,-2
		];
	}

	return {
		getBlocks: getBlocks
	}
}();
