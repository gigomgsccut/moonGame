function init_canvas(){
	//console.log('initial_start');

	canvas = document.getElementById("canvas_main");
	if(canvas.getContext){
		ctx = canvas.getContext('2d');

		imgData.src = imgURL;

		ctx.clearRect(0, 0, ctx.width, ctx.height);

		$('#canvas_main').mousemove(function(e) {
			/*
			mX = e.clientX - e.delegateTarget.offsetLeft;
			mY = e.clientY - e.delegateTarget.offsetTop;
			mObj = click_area(mX,mY);
			console.log('obj :'+mObj.itemtype+' id:'+mObj.itemid);
			*/

			mX = e.offsetX;
			mY = e.offsetY;
			chosen = -1;
			$.each(spArray, function(index, el) {

				if(el.isOver(mX, mY)){
					chosen = el.getID();
				}
			});
			if(chosen >= 0){
				$(this).css('cursor','pointer');
			}else{
				$(this).css('cursor','default');
			}
		});
		
		
		back_setup();

		var k;
		for(var i=0;i<4;i++){
			k = new MGSP(imgURL,'girl');
			spArray.push(k);
			k.setupPPL(-1,-1,-1,-1);
			k.ownRender();
			k.drawOut(i);
		}
		for(var i=0;i<4;i++){
			k = new MGSP(imgURL,'boy');
			spArray.push(k);
			k.setupPPL(-1,-1,-1,-1);
			k.ownRender();
			k.drawOut(i);
		}
		
		for(var i=0;i<3;i++){
			k = new MGSP(imgURL,'item');
			spArray.push(k);
			k.setupItem(-1);
			k.ownRender();
			k.drawOut(i);
		}
		
	}
}

function back_setup(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.clearRect(0, 0, ctx.width, ctx.height);

	drawItem = new Object();

	drawItem.itemtype	= 'bottom';
	drawsth(drawItem);

	/*
	for(i=0;i<8;i++){
		drawItem.itemtype 	= 'people';
		drawItem.cloth 		= i;
		drawItem.face 		= i;
		drawItem.hair 		= i;
		drawItem.trait 		= i;
		drawItem.pos 		= i;
		drawsth(drawItem);

		drawItem.itemtype 	= 'dream';
		drawItem.dt 		= Math.floor(Math.random()*32);
		drawsth(drawItem);
	}
	*/

	drawItem.itemtype 	= 'statusbar';
	drawsth(drawItem);
	
	drawItem.itemtype 	= 'moonGod';
	drawsth(drawItem);

	drawItem.itemtype 	= 'moonGodChat';
	drawsth(drawItem);

	drawItem.itemtype 	= 'stoneleo';
	drawsth(drawItem);

	/*
	drawItem.itemtype 	= 'item';
	drawItem.item = 0;
	drawItem.itemPos = 0;
	
	drawsth(drawItem);

	drawItem.itemtype 	= 'item';
	drawItem.item = 1;
	drawItem.itemPos = 1;
	drawsth(drawItem);

	drawItem.itemtype 	= 'item';
	drawItem.item = 2;
	drawItem.itemPos = 2;
	drawsth(drawItem);
	*/
}


function drawsth(obj){

	switch(obj.itemtype){
		case 'people':
			//shadow
			ctx.drawImage(imgData,shadow_x,shadow_y,shadow_w,shadow_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos]+ppl_h-shadow_h,shadow_w,shadow_h);
			//cloth
			ctx.drawImage(imgData,ppl_cloth_x[obj.cloth],ppl_cloth_y[obj.cloth],ppl_w,ppl_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos],ppl_w,ppl_h);
			//face
			ctx.drawImage(imgData,ppl_face_x[obj.face],ppl_face_y[obj.face],ppl_w,ppl_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos],ppl_w,ppl_h);
			//hair
			ctx.drawImage(imgData,ppl_hair_x[obj.hair],ppl_hair_y[obj.hair],ppl_w,ppl_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos],ppl_w,ppl_h);
			//trait
			ctx.drawImage(imgData,ppl_trait_x[obj.trait],ppl_trait_y[obj.trait],ppl_w,ppl_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos],ppl_w,ppl_h);
			break;
		case 'dream':
			//back
			ctx.drawImage(imgData,dream_x,dream_y,dream_w,dream_h,ppl_des_x[obj.pos],ppl_des_y[obj.pos]-dream_h,dream_w,dream_h);
			//front (暫用文字)
			ctx.fillStyle = "#333";
			ctx.fillText(dt_des[obj.dt],ppl_des_x[obj.pos]+(ppl_w-dt_w)/2,ppl_des_y[obj.pos]-dream_h+7+20);
			break;
		case 'bottom':
			ctx.fillStyle = "rgba(255,128,128,0.85)";
			ctx.fillRect(0,659,1080,81);
			break;

		case 'statusbar':
			ctx.drawImage(imgData,sb_x,sb_y,sb_w,sb_h,40,21,sb_w,sb_h);
			break;

		case 'moonGod':
			ctx.drawImage(imgData,971,367 ,118,216,56,489,118,216);
			break;
		case 'moonGodChat':
			//back
			ctx.drawImage(imgData,849,690,172,90,180,530,172,90);
			//text
			ctx.fillText('月老有話說',210,560,81);
			break;

		case 'stoneleo':
			ctx.drawImage(imgData,971,200,120,156,901,547,120,156);
			break;
		case 'item':
			ctx.drawImage(imgData,item_x[obj.item],item_y[obj.item],item_w,item_h,item_des_x[obj.itemPos],item_des_y[obj.itemPos],item_w,item_h);
			break;
		default:
	}

	//ctx.drawImage(imgData,0,0,96,198,des_x,des_y,96,198);
}


function click_area(x, y){
	//人員按鈕
	var retObj = new Object();
	retObj.itemtype = 'none';
	retObj.itemid = 0;

	if(y > 263 && y < 461){
		if(x > 56 && x < 152){
			retObj.itemtype = 'girl';
			retObj.itemid = 0;
		}
		if(x > 153 && x < 248){
			retObj.itemtype = 'girl';
			retObj.itemid = 1;
		}
		if(x > 249 && x < 344){
			retObj.itemtype = 'girl';
			retObj.itemid = 2;
		}
		if(x > 345 && x < 440){
			retObj.itemtype = 'girl';
			retObj.itemid = 3;
		}

		if(x > 640 && x < 736){
			retObj.itemtype = 'boy';
			retObj.itemid = 0;
		}
		if(x > 737 && x < 832){
			retObj.itemtype = 'boy';
			retObj.itemid = 1;
		}
		if(x > 833 && x < 928){
			retObj.itemtype = 'boy';
			retObj.itemid = 2;
		}
		if(x > 929 && x < 1024){
			retObj.itemtype = 'boy';
			retObj.itemid = 3;
		}
	}

	//道具紐
	if(y > 583 && y <  703){
		if(x > 540 && x < 650){
			retObj.itemtype = 'obj';
			retObj.itemid = 2;
		}
		if(x > 656 && x < 766){
			retObj.itemtype = 'obj';
			retObj.itemid = 1;
		}
		if(x > 772 && x < 882){
			retObj.itemtype = 'obj';
			retObj.itemid = 0;
		}
	}

	//Stoneleo
	if(y > 547 && y <  703){
		if(x > 901 && x < 1021){
			retObj.itemtype = 'stoneleo';
			retObj.itemid = 0;
		}
	}

	return retObj;
}
