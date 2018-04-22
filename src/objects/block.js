Block = function() {
	//returns the vertice positions as a vector
	function getVertices(){
		return [
			0.5, 0.5, -8.0,
			0.5, -0.5, -8.0,
			-0.5, 0.5, -8.0,
			-0.5, -0.5, -8.0
		];
	}
	
	//returns the number of items
	function getNumItems() {
		return 4;
	}
	
	return {
		getVertices: getVertices,
		getNumItems: getNumItems
	}
}();