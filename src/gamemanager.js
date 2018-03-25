GameManager = function(){
	var numberUnitsHeight;
	var numberUnitsWidth;
	
	function initializeGame(){
		
		Texture.loadTextures();
		ObjectManager.addBackground();
		
		numberUnitsHeight = parseInt(500/ObjectManager.getUnitLength());
		numberUnitsWidth = parseInt(1000/ObjectManager.getUnitLength());
		
		startGame();
	}
	
	function startGame(){
		AnimationHandler.startGravity();
		spawnTetromino();
	}
	
	function spawnTetromino(){
		var i = Math.floor((Math.random() * 7) + 1);
		ObjectManager.addTetromino(i);
	}
	
	
	return{
		initializeGame: initializeGame
	}
}();