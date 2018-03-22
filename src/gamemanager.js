GameManager = function(){
	var numberUnitsHeight;
	var numberUnitsWidth;
	
	function initializeGame(){
		numberUnitsHeight = parseInt(500/ObjectManager.getUnitLength());
		numberUnitsWidth = parseInt(1000/ObjectManager.getUnitLength())
		console.log(numberUnitsHeight);
		console.log(numberUnitsWidth);
	}
	return{
		initializeGame: initializeGame
	}
}();