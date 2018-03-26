GameManager = function(){
	var numberUnitsHeight = 16;
	var numberUnitsWidth = 8;
	
	var gravity=true;
	
	var occupiedBlocks = [];
	
	var current;
	var currX;
	var currY;
	
	function initializeGame(){
		
		for(i=0; i<8; i++){
			occupiedBlocks[i] = [];
			for(j=0; j<16; j++){
				occupiedBlocks[i][j]=0;
			}
		}
		
		Texture.loadTextures();
		ObjectManager.addBackground();
		startGame();
	}
	
	function startGame(){
		spawnTetromino();
	}
	
	function spawnTetromino(){
		AnimationHandler.flush();
		var i = Math.floor((Math.random() * 7) + 1);
		ObjectManager.addTetromino(i);
		currX = 3;
		currY = 0;
		gravitate();
	}
	
	function occupied(x,y,index=0){
		var currentBlocks = current.getRotatedBlocks();
		var overallX = x + currentBlocks[2*index];
		var overallY = y - currentBlocks[2*index + 1];
		if(overallX >= numberUnitsWidth || overallY >= numberUnitsHeight || getBlock(overallX,overallY)){
			return true;
		} else if(index == 3){
			return false;
		} else {
			return occupied(x,y,++index);
		}
	}
	
	
	function moveRight(){
		if(!occupied(currX+1,currY)){
			AnimationHandler.addAnimation(1);
			currX++;
		}
	};
	
	function moveLeft(){
		if(gravity && !occupied(currX-1,currY)){
			AnimationHandler.addAnimation(2);
			currX--;
		}
	};
	
	function rotateCl(){
	};
	
	function rotateCCl(){
	};
	
	function gravitate() {
		if(gravity){
			if(!occupied(currX,currY+1)){
				AnimationHandler.addAnimation(4);
				currY++;
			} 
			else {
				updateOccupiedBlocks();
				spawnTetromino();
			}
		}
	}
	
	function updateOccupiedBlocks(){
		var currentBlocks = current.getRotatedBlocks();
		for(i=0; i<4; i++){
			var x = currX + currentBlocks[2*i];
			var y = currY - currentBlocks[2*i+1];
			occupiedBlocks[x][y]=1;
		}
	}
	
	function startGravity(){
		if(!gravity){
			gravity=true;
			gravitate();
		}
	}
	
	function stopGravity(){
		gravity=false;
	}
	
	function getBlock(x,y){
		if(x<0) {return 1;}
		return occupiedBlocks[x][y];
	}
	
	function setCurrent(input){
		current = input;
	}
	
	function getCurrent(){
		return current;
	}
	
	return{
		initializeGame: initializeGame,
		gravitate: gravitate,
		startGravity: startGravity,
		stopGravity: stopGravity,
		setCurrent: setCurrent,
		getCurrent: getCurrent,
		moveRight: moveRight,
		moveLeft: moveLeft
	}
}();