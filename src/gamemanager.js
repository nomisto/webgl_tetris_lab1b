GameManager = function(){
	var numberUnitsHeight = 16;
	var numberUnitsWidth = 8;
	
	var gravity=true;
	
	var occupiedBlocks = [];
	
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
		currX = 3;
		currY = 0;
		startGravity();
		spawnTetromino();
	}
	
	function spawnTetromino(){
		var i = Math.floor((Math.random() * 7) + 1);
		ObjectManager.addTetromino(i);
	}
	
	function occupied(x,y){
		if(x>=numberUnitsWidth||y>=numberUnitsHeight||getBlock(x,y)){
			return true;
		}
		return false;
	}
	
	function gravitate() {
		if(gravity && !occupied(currX,currY+1)){
			AnimationHandler.addAnimation(4);
			currY++;
		} 
		else {
			spawnTetromino();
			currX = 3;
			currY = 0;
			gravitate();
		}
	}
	
	function startGravity(){
		gravity=true;
		gravitate();
	}
	
	function stopGravity(){
		gravity=false;
	}
	
	function getBlock(x,y){
		return occupiedBlocks[x][y];
	}
	
	return{
		initializeGame: initializeGame,
		gravitate: gravitate,
		startGravity: startGravity,
		stopGravity: stopGravity
	}
}();