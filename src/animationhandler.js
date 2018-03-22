AnimationHandler = function(){
	var animationsStack = [];
	var animationsProgress = [];
	var mvMatrix;
	var tetrominos = ObjectManager.getAllTetrominos();
	var gravity=true;
	
	// returns the time elapsed between two executions of this function
	var then = new Date().getTime();
	function getDeltaTime() {
		var now = new Date().getTime();
		var delta = now - then;
		then = now;
		return delta;
	}
	
	/* deletes the first item of the animationsStack and the animationsProgress.
	   If the finished animation was a counterclockwise rotation, the orientation of the tetromino-object decrements by one.
	   If the finished animation was a clockwise rotation, the orientation of the tetromino-object increments by one. */
	function shift() {
		if(animationsStack[0]==6){ObjectManager.incrementTetrominoOrientation(0);}
		else if (animationsStack[0]==5) {ObjectManager.decrementTetrominoOrientation(0);}
		animationsStack.shift();
		animationsProgress.shift();
	    gravitate();
	}
	
	/* inserts the desired animation at the end of the queue animationsStack
	  1 ... Right
	  2 ... Left
	  3 ... Up
	  4 ... Down
	  5 ... Rotate Counterclockwise
	  6 ... Rotate Clockwise
	  and inserts a 0 at the end of the array animationsProgress, representing the Progress for this animation */
	function addAnimation(input){
		if(input==1){
			animationsStack.push(1);
			animationsProgress.push(0);
		}
		else if(input==2){
			animationsStack.push(2);
			animationsProgress.push(0);
		}
		else if(input==3){
			animationsStack.push(3);
			animationsProgress.push(0);
		}
		else if(input==4){
			animationsStack.push(4);
			animationsProgress.push(0);
		}
		else if(input==5){
			animationsStack.push(5);
			animationsProgress.push(0);
		}
		else if(input==6){
			animationsStack.push(6);
			animationsProgress.push(0);
		}
	}
	
	
	/* animates the first requested animation of the animationsStack for one step
	  and refreshes the deltaTime */
	var deltaTime;
	function animate() {
		console.log(animationsStack.length);
		if(mvMatrix==null){mvMatrix = tetrominos[0].mvMatrix;}
		deltaTime = getDeltaTime();
		if (animationsStack[0] == 1){
			moveX(getValue());
		}
		else if (animationsStack[0] == 2){
			moveX(-getValue());
		}
		else if (animationsStack[0] == 3){
			moveY(getValue());
		}
		else if (animationsStack[0] == 4){
			moveY(-getValue());
		}
		else if (animationsStack[0] == 5){
			rotate(getAngle());
		}
		else if (animationsStack[0] == 6){
			rotate(-getAngle());
		}
	}
	
	// returns the angle for one rotation animationstep using the deltatime
	function getAngle(){
		var angle = (75 * deltaTime) / 1000.0;		
		if ((angle+animationsProgress[0]) < 90) {
			animationsProgress[0] += angle;
		}
		else {
			angle = 90-animationsProgress[0];
			shift();
		}
		return angle;
	}
	
	// returns the value of one horizontal/vertical-movement animationstep using the deltatime
	function getValue(){
		var value = deltaTime/850;
		if ((value+animationsProgress[0]) < 1) {
			animationsProgress[0] += value;
		}
		else {
			value = 1 - animationsProgress[0];
			shift();
		}
		return value;
	}
	
	// converts the angle from degrees to radiant
	function gradToRad(angle){
		return angle * Math.PI / 180;
	}
	
	// calculates the rotation-matrix of the mvMatrix by the given angle around the z-axis
	function rotate(angle) {
		mat4.rotateZ(mvMatrix, mvMatrix, gradToRad(angle));
	}
	
	// determines the orientation of the object and translates it by the given value in relation to the display X-axis
	function moveX(value){
		var orientation = ObjectManager.getTetrominoOrientation(0);
		if(orientation == 0) { translateX(value); }
		else if(orientation == 1) { translateY(value); }
		else if(orientation == 2) { translateX(-value); }
		else if(orientation == 3) { translateY(-value); }
	}
	
	// determines the orientation of the object and translates it by the given value in relation to the display Y-axis
	function moveY(value){
		var orientation = ObjectManager.getTetrominoOrientation(0);
		if(orientation == 0) { translateY(value); }
		else if(orientation == 1) { translateX(-value); }
		else if(orientation == 2) { translateY(-value); }
		else if(orientation == 3) { translateX(value); }
	}
	
	// translates the mvMatrix in X-direction
	function translateX(value){
		mat4.translate(mvMatrix, mvMatrix, [value,0,0]);
	}
	// translates the mvMatrix in Y-direction
	function translateY(value){
		mat4.translate(mvMatrix, mvMatrix, [0,value,0]);
	}
	
	function setGravity(input){
		gravity=input;
	}
	
	function gravitate() {
		if(gravity==true){
			AnimationHandler.addAnimation(4);
		}
	}
	
	function startGravity(){
		gravity=true;
		gravitate();
	}
	
	function stopGravity(){
		gravity=false;
	}
	
	return{
		addAnimation: addAnimation,
		animate: animate,
		startGravity: startGravity,
		stopGravity: stopGravity
	}
}();