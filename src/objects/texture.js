Texture = function() {
	
	// asynchronosly loads the image, creates a texture and binds it
	function loadTextures(){
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		
		var image = new Image();
		image.src = "resources/textures.png";
		image.addEventListener('load', function() {
		  gl.bindTexture(gl.TEXTURE_2D, texture);
		  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
		  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		});
	};
		
	//calculates the texcoords and returns it as a vector
	function getTextureCoords(texturetypex, texturetypey, blockx, blocky){
		return [
			(512*texturetypex + 2048 + blockx*128 + 128) / 4608, (512*texturetypey + 128*blocky) / 1024,
			(512*texturetypex + 2048 + blockx*128 + 128) / 4608, (512*texturetypey + 128*blocky + 128) / 1024,
			(512*texturetypex + 2048 + blockx*128) / 4608, (512*texturetypey + 128*blocky) / 1024,
			(512*texturetypex + 2048 + blockx*128) / 4608, (512*texturetypey + 128*blocky + 128) / 1024
		]
	}
	
	return{
		loadTextures: loadTextures,
		getTextureCoords: getTextureCoords
	}
}();