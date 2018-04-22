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
	
	//returns a vector to the rotation origin of each block
	function getVectorToRotationOrigin(){
		return [
			1,-1,
			0,-1,
			0,0,
			0,1
		]
	}
	
	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




JShape = function() {
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			1,0,
			0,-1,
			0,-2
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0,-1,
			-1,-1,
			0,0,
			0,1
		]
	}
	
	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




ZShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			1,0,
			1,-1,
			2,-1
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			1,-1,
			0,-1,
			0,0,
			-1,0
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




SShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,-1,
			1,-1,
			1,0,
			2,0
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			1,0,
			0,0,
			0,-1,
			-1,-1
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




OShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			1,0,
			0,-1,
			1,-1
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			0.5,-0.5,
			-0.5,-0.5,
			0.5,0.5,
			-0.5,0.5
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




IShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			0,-1,
			0,-2,
			0,-3
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			-0.5,-1.5,
			-0.5,-0.5,
			-0.5,0.5,
			-0.5,1.5
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();




TShape = function() {
	
	//returns an array of the vertices of this shape
	function getBlocks(){
		return [
			0,0,
			1,0,
			2,0,
			1,-1
		];
	}
	
	function getVectorToRotationOrigin(){
		return [
			1, 0,
			0, 0,
			-1, 0,
			0, 1
		]
	}

	return {
		getBlocks: getBlocks,
		getVectorToRotationOrigin: getVectorToRotationOrigin
	}
}();


