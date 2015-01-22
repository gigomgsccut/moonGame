//精靈物件

function MGSP(resImg, inType){
	var SPid 		= 0;
	var SPtype 		= '';
	var SPLoc		= 0;

	var PosX 		= 0;
	var PosY 		= 0;
	var sizeW		= 0;
	var sizeH		= 0;

	var state		= '';
	var frame_count = 0;
	var ownData		= new Object();
	var ownCanvas	= document.createElement('canvas');
	
	var ownCTX		= ownCanvas.getContext('2d');

	sourceImg 		= resImg;
	SPType 			= inType;

	SPid 			= spCounter;
	spCounter++;

	if(SPType == 'girl' || SPType =='boy'){
		sizeW = ppl_w;
		sizeH = 198;
	}

	if(SPType == 'item'){
		sizeW = item_w;
		sizeH = item_h;
	}

	ownCanvas.width = sizeW;
	ownCanvas.height = sizeH;

	ownCTX.clearRect(0, 0, sizeW, sizeH);

	this.getID = function(){
		return SPid;
	}

	this.getData = function(){
		return ownData;
	}

	this.setupPPL = function(hair,face,cloth,trait){
		if(hair > 0 && hair < 4){
			ownData.hair = hair;
		}else{
			ownData.hair = Math.floor(Math.random()*4);
		}
		if(face > 0 && face < 4){
			ownData.face = face;
		}else{
			ownData.face = Math.floor(Math.random()*4);
		}
		if(cloth > 0 && cloth < 4){
			ownData.cloth = cloth;
		}else{
			ownData.cloth = Math.floor(Math.random()*4);
		}
		if(trait > 0 && trait < 4){
			ownData.trait = trait;
		}else{
			ownData.trait = Math.floor(Math.random()*4);
		}
	}

	this.setupItem = function(inItem){
		if(inType > 0 && inType < 4){
			ownData.itemType = inType;
		}else{
			ownData.itemType = Math.floor(Math.random()*3);
		}
	}

	this.ownRender = function(){

		gp = 0;
		if(SPType == 'boy'){
			gp = 4;
		}
		
		if(SPType == 'girl' || inType == 'boy'){
			//ownCTX.rotate(0*Math.PI/180);
			//shadow
			ownCTX.drawImage(imgData,shadow_x,shadow_y,shadow_w,shadow_h,0,170,shadow_w,shadow_h);
			//cloth
			ownCTX.drawImage(imgData,ppl_cloth_x[ownData.cloth+gp],ppl_cloth_y[ownData.cloth+gp],sizeW,sizeH,0,0,sizeW,sizeH);
			//face
			ownCTX.drawImage(imgData,ppl_face_x[ownData.face+gp],ppl_face_y[ownData.face+gp],sizeW,sizeH,0,0,sizeW,sizeH);
			//hair
			ownCTX.drawImage(imgData,ppl_hair_x[ownData.hair+gp],ppl_hair_y[ownData.hair+gp],sizeW,sizeH,0,0,sizeW,sizeH);
			//trait
			ownCTX.drawImage(imgData,ppl_trait_x[ownData.trait+gp],ppl_trait_y[ownData.trait+gp],sizeW,sizeH,0,0,sizeW,sizeH);
		}

		if(SPType == 'item'){
			ownCTX.drawImage(imgData,item_x[ownData.itemType],item_y[ownData.itemType],sizeW,sizeH,0,0,sizeW,sizeH);
		}

	}

	this.drawOut = function(Pos){
		if(inType == 'girl' || inType == 'boy'){
			gp = 0;
			if(inType == 'boy'){
				gp = 4;
			}
			ctx.drawImage(ownCanvas,0,0,sizeW,sizeH,ppl_des_x[Pos+gp],ppl_des_y[Pos+gp],sizeW,sizeH);

			PosX = ppl_des_x[Pos+gp];
			PosY = ppl_des_y[Pos+gp];
		}

		if(inType == 'item'){
			ctx.drawImage(ownCanvas,0,0,sizeW,sizeH,item_des_x[Pos],item_des_y[Pos],sizeW,sizeH);
			PosX = item_des_x[Pos];
			PosY = item_des_y[Pos];
		}

		state = 'on';
	}

	this.isOver = function(x, y){
		sW = sizeW;
		sH = sizeH;

		if(SPType == 'girl' || SPType == 'boy'){
			sW = ppl_w;
			sH = ppl_h;
		}

		if (x > PosX && x < PosX+sW && y > PosY && y < PosY+sH){
			return true;
		}else{
			return false;
		}
	}

}

