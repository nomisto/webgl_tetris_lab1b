Block = function() {
	function getVertices(){
		return [
			0.5, 0.5, -8.0,
			0.5, -0.5, -8.0,
			-0.5, 0.5, -8.0,
			-0.5, -0.5, -8.0
		];
	}
	
	function getNumItems() {
		return 4;
	}
	
	return {
		getVertices: getVertices,
		getNumItems: getNumItems
	}
}();