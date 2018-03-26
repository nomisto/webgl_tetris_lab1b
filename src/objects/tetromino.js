class Tetromino{
	constructor(vertexPositionBufferArray, texcoordsBufferArray, mvMatrixArray, blocks, vectorToRotationOriginArray, orientation) {
		this.vertexPositionBufferArray=vertexPositionBufferArray;
		this.texcoordsBufferArray=texcoordsBufferArray;
		this.mvMatrixArray = mvMatrixArray;
		this.vectorToRotationOriginArray = vectorToRotationOriginArray;
		this.blocks = blocks;
		this.orientation = orientation;
	}
	
	
	// returns the orientation of the tetromino of given index
	getTetrominoOrientation(){
		return ((this.orientation % 4) + 4) % 4;
	}
	
	getBlocks(){
		return this.blocks;
	}
	
	getRotatedBlocks(){
		var orientation = this.getTetrominoOrientation();
		if(orientation==0){return this.blocks;}
		var result = [];
		for(i=0;i<4;i++){
			var resultX = this.blocks[2*i] + this.vectorToRotationOriginArray[2*i];
			var resultY = this.blocks[2*i+1] + this.vectorToRotationOriginArray[2*i+1];
			
			if(orientation==1){
				resultX  -= this.vectorToRotationOriginArray[2*i+1];
				resultY += this.vectorToRotationOriginArray[2*i];
			} else if(orientation==2) {
				resultX  += this.vectorToRotationOriginArray[2*i];
				resultY += this.vectorToRotationOriginArray[2*i+1];
			} else if(orientation==3) {
				resultX  += this.vectorToRotationOriginArray[2*i+1];
				resultY -= this.vectorToRotationOriginArray[2*i];
			}
			result.push(resultX);
			result.push(resultY);
		}
		return result;
	}
};