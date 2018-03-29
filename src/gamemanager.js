GameManager = function(){
	var numberUnitsHeight = 16;
	var numberUnitsWidth = 8;
	
	var gravity=false;
	
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
	
	function stopGame(){
	}
	
	function spawnTetromino(){
		AnimationHandler.flush();
		var i = Math.floor((Math.random() * 7) + 1);
		ObjectManager.addTetromino(i);
		startGravity();
	}
	
	function forEachBlockOfCurrent(func,orientationAfterRotation){
		if(current!=null){
			var currentBlocks = current.getRotatedBlocks(orientationAfterRotation);
			for(i=0; i<current.blocklength; i++){
					var x = currX + currentBlocks[2*i];
					var y = currY - currentBlocks[2*i+1];
					func(x,y);
			}
		}
	}
	
	function occupied(movX,movY,orientationAfterRotation){
		var result = false;
		forEachBlockOfCurrent(function(x,y){
			x += movX;
			y += movY;
			if(x >= numberUnitsWidth || y >= numberUnitsHeight || getBlock(x,y)){
				result += true;
			}
		},orientationAfterRotation);
		return result;
	}
	
	function moveRight(){
		if(!occupied(1,0)){
			AnimationHandler.addAnimation(1);
			currX++;
		}
	};
	
	function moveLeft(){
		if(!occupied(-1,0)){
			AnimationHandler.addAnimation(2);
			currX--;
		}
	};
	
	function rotateCCl(){
		var orientationAfterRotation = current.getTetrominoOrientation() - 1;
		if(!occupied(0,0,orientationAfterRotation)){
			AnimationHandler.addAnimation(5);
		}
	};
	
	
	function rotateCl(){
		var orientationAfterRotation = current.getTetrominoOrientation() + 1;
		if(!occupied(0,0,orientationAfterRotation)){
			AnimationHandler.addAnimation(6);
		}
	};
	
	
	function gravitate() {
		if(!occupied(0,1)){
			if(gravity){
				AnimationHandler.addAnimation(4);
				currY++;
			}
		} 
		else if(!occupied(0,0)){
			updateOccupiedBlocks();
			stopGravity();
			checkFullLine();
			spawnTetromino();
		} else {
			ObjectManager.deleteLast();
			stopGame();
		}
	}
	
	function checkFullLine(){
		var fullY = [];
		forEachBlockOfCurrent(function(x,y){
			var check = 0;
			for(j=0; j<8; j++){
				if(occupiedBlocks[j][y]==0){break;}
				else {check++;}
			}
			
			if(check==8){
				fullY = fullY.filter(value => value!=y);
				fullY.push(y);
			}
		});
		if(fullY.length!=0){
			fullY.sort(function(a, b){return a - b});
			fullY.forEach(function(o){
				var alteredTetros = deleteFullLine(o);
				falldownAlteredTetros(alteredTetros,o);
				print();
				falldownAll();
				print();
			});
		}
	}
	
	function deleteFullLine(o){
		var changedTetros = [];
		for(k=0; k<8; k++){
			var tetrominoblockid = occupiedBlocks[k][o];
			var blockid = tetrominoblockid % 10;
			var tetrominoid = Math.floor(tetrominoblockid/10);
			var tetro = ObjectManager.getTetrominoByIndex(tetrominoid);
			
			tetro.deleteBlock(blockid);
			setCurrent(tetro);
			updateOccupiedBlocks();
			occupiedBlocks[k][o]=0;
			if(tetro.blocklength!=0){
				changedTetros = changedTetros.filter(value => value!=tetrominoid);
				changedTetros.push(tetrominoid);
			}
		}
		return changedTetros;
	}
	
	
	function falldownAll() {
		var fallen = [];
		ObjectManager.getAllTetrominos().forEach(function(tetro){
			console.log(tetro);
			if(tetro.blocklength!=0){
				setCurrent(tetro);
				forEachBlockOfCurrent(function(x,y){
					occupiedBlocks[x][y]=0;
				});
				if(!occupied(0,1)){
					fallen.push(tetro.index);
					currY++;
				}
				updateOccupiedBlocks();
			}
		});
		if(fallen.length!=0){
			AnimationHandler.addAnimation(7,fallen);
			falldownAll();
		}
	}
	
	function falldownAlteredTetros(alteredTetros,o){
		alteredTetros.forEach(function(tetrominoid){
			setCurrent(ObjectManager.getTetrominoByIndex(tetrominoid));
			forEachBlockOfCurrent(function(x,y){
				if(y < o){
					occupiedBlocks[x][y]=0;
					y++;
					occupiedBlocks[x][y] = 10 * current.index + i;
					current.blocks[2*i+1] -=1;
					if(current.getTetrominoOrientation() == 0) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,-1,0]); }
					else if(current.getTetrominoOrientation() == 1) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[1,0,0]); }
					else if(current.getTetrominoOrientation() == 2) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[0,1,0]); }
					else if(current.getTetrominoOrientation() == 3) { mat4.translate(current.mvMatrixArray[i],current.mvMatrixArray[i],[-1,0,0]); }
				}
			});
		});
	}
	
	function updateOccupiedBlocks(){
			forEachBlockOfCurrent(function(x,y){
				occupiedBlocks[x][y]= current.index * 10 + i;
			});
			current.currX=currX;
			current.currY=currY;
	}
	
	function startGravity(){
		if(!gravity){
			AnimationHandler.setGravitationSpeed(600);
			gravity=true;
			gravitate();
		} else {
			AnimationHandler.setGravitationSpeed(200);
		}
	}
	
	function stopGravity(){
		gravity=false;
	}
	
	function getBlock(x,y){
		if(x<0) {return 1;}
		return occupiedBlocks[x][y];
	}
	
	function setCurrent(tetro){
		current = tetro;
		currX=tetro.currX;
		currY=tetro.currY;
	}
	
	function getCurrent(){
		return current;
	}
	
	function print(){
		console.log("----1-2-3-4-5-6-7-8----------\n");
		for(j=0; j<16; j++){
			var str = j + "|| ";
			for(i=0; i<8; i++){
				str += (Math.floor(occupiedBlocks[i][j]/10) + "" + occupiedBlocks[i][j]%10 + " ");
			}
			console.log(str + "\n");
		}
	}
	
	return{
		initializeGame: initializeGame,
		gravitate: gravitate,
		startGravity: startGravity,
		stopGravity: stopGravity,
		setCurrent: setCurrent,
		getCurrent: getCurrent,
		print: print,
		moveRight: moveRight,
		moveLeft: moveLeft,
		rotateCl: rotateCl,
		rotateCCl: rotateCCl
	}
}();