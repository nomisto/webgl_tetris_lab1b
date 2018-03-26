InputHandler = function(){
	currentlyPressedKeys=[];
	var strokeBlock = false;
	
	/* Determines which key is currently pressed and adds the linked animation to the animationhandler.
	   The value strokeBlock prevents multiple strokes if one key is pressed. */
	function handleInput() {
		if ((currentlyPressedKeys[68] || currentlyPressedKeys[39]) && strokeBlock == false) {
			strokeBlock=true;
			GameManager.moveRight();
		}
		if ((currentlyPressedKeys[65] || currentlyPressedKeys[37]) && strokeBlock == false) {
			strokeBlock=true;
			GameManager.moveLeft();
		}
		if ((currentlyPressedKeys[87] || currentlyPressedKeys[38]) && strokeBlock == false) {
			strokeBlock=true;
			GameManager.stopGravity();
		}
		if ((currentlyPressedKeys[83] || currentlyPressedKeys[40]) && strokeBlock == false) {
			strokeBlock=true;
			GameManager.startGravity();
		}
		if ((currentlyPressedKeys[49] || currentlyPressedKeys[56]) && strokeBlock == false) {
			strokeBlock=true;
			AnimationHandler.addAnimation(5);
		}
		if ((currentlyPressedKeys[51] || currentlyPressedKeys[48]) && strokeBlock == false) {
			strokeBlock=true;
			AnimationHandler.addAnimation(6);
		}
	}

	// if a key is pressed, the value of the array currentlyPressedKeys in index keyCode is set to true
	function handleKeyDown(event) {
		currentlyPressedKeys[event.keyCode] = true;
	}
	
	// if a key is pressed, the value of the array currentlyPressedKeys in index keyCode is set to true
	function handleKeyUp(event) {
		strokeBlock = false;
		currentlyPressedKeys[event.keyCode] = false;
	}
	
	return{
		handleInput: handleInput,
		handleKeyDown: handleKeyDown,
		handleKeyUp: handleKeyUp
	}
}();