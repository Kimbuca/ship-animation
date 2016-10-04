//set of points, you can add later
var points = []; //each point has neighbors and they share same x or y components
var grid = []; 	 //grid in accordance to the points
var pathp = [];	 //already selected point
var figures = []; //available points


var height = 600;
var width = 1000;
var round = 0;


//THE MAGNIFICENT GRID

/*	50x925              550x925
	 ___________________
	|	|	|	|___|___|
	|	|	|	|	|	|
	|	
	|
	|
	50x550              550x550
*/

var init_x = 50; //based on width incrementing +175 
var init_y = 550; //based on height -100		
var i =0;



for(var j=0; j<6; j++){
	init_x = 50;

	for(var r=0; r<6; r++){
		points[i] = {x: '', y:'', neighbors:[]};
		points[i].x = init_x;
		points[i].y = init_y;

		if(r != 5){

			//make exception to borders
			points[i].neighbors.push({
				//right neigh
				x: init_x+175, y:init_y
			});

			points[i].neighbors.push({
				//left neigh
				x: init_x, y:init_y-100
			});

		}else{
			//ending just can go up
			points[i].neighbors.push({
				x: init_x, y:init_y-100
			});
		}
		console.log(points[i].neighbors[0].y +" and " +points[i].neighbors[0].x);
		i++;
		init_x += 175;
	}
	
	init_y -=100;

}




//function that plots the grid
var cx = document.querySelector("canvas").getContext("2d");
cx.lineWidth = 3;

drawGrid = function(){

  cx.strokeStyle = '#000000';
  cx.beginPath();
   
  //horizontal axis
  for(var i=0, y=550; i<6; i++, y-=100 ){
  	  cx.moveTo(50, y);
  	  cx.lineTo(925, y);
  	}
 	cx.stroke();

 	//vertical axis
 	for(var i=0, x=50; i<6; i++, x+=175 ){
  	  cx.moveTo(x, 550);
  	  cx.lineTo(x, 50);

   }
   cx.stroke();
}


var drawPath = function(){
	 cx.beginPath();
  cx.strokeStyle = '#ff0000';
   for(i=1;i<pathp.length;i++){
   	  cx.moveTo(pathp[i-1].x, pathp[i-1].y);
  	  cx.lineTo(pathp[i].x, pathp[i].y);
   }
  cx.stroke();
};


   //point class
   Point = function(x,y,r,c, n){
   		this.x = x; 
   		this.y = y;
   		this.r = r;
   		this.color = c;
   };


   
  drawOnCanvas = function(){


   		for(var i=0; i<figures.length; i++){
   			 	  cx.beginPath();
				  cx.arc(figures[i].x, figures[i].y, 22, 0, 2 * Math.PI, false);
				  cx.fillStyle = figures[i].color;
				  cx.fill();
				  cxlineWidth = 5;
				  cx.strokeStyle = '#003300';
				  cx.stroke();
   		}

   		for(var i=0; i<pathp.length; i++){
   			 cx.beginPath();
				 cx.arc(pathp[i].x, pathp[i].y, 22, 0, 2 * Math.PI, false);
				  cx.fillStyle = pathp[i].color;
				  cx.fill();
				  cxlineWidth = 5;
				  cx.strokeStyle = '#003300';
				  cx.stroke();
   		}

   };



   var draw_neighbors = function(current_point){

   		var my_neighbors;

   		//delete previous active points
   		console.log('prev pop ' +figures.length);
   		while(figures.length > 0){
   			figures.pop();
   			drawOnCanvas();
   		}

   		//search for specific point in Points
		for(var i= 0; i<points.length; i++){
			if(points[i].x == current_point.x &&
					points[i].y == current_point.y){

					my_neighbors = points[i].neighbors;
					//console.log('found!' +my_neighbors);
				}

		}

		//add points to current options
		for(var a=0; a<my_neighbors.length; a++){		
		   	var p = new Point(my_neighbors[a].x, my_neighbors[a].y, 22, 'green');
		   	figures.push(p);
		   	//console.log(p);	
		}

		drawOnCanvas();
	}





	var isTouching = function(xpos, ypos, point){
		var px = Math.pow(Math.abs(xpos - point.x),2);
		var py = Math.pow(Math.abs(ypos- point.y),2);
		var hyp = Math.sqrt(px+py);

		if(hyp <= point.r){ return true;
			}else{ return false;}
	};








	/// MOUSE EVENTS
	var canvas = document.getElementById("animation_module");
	canvas.onmousemove = function(mouse){
		
		var xCoord = mouse.clientX-mouse.target.offsetLeft;
		var yCoord = mouse.clientY-mouse.target.offsetTop;
		console.log(xCoord);

		for(var i =0; i<figures.length; i++){

			var current_point = figures[i];
			console.log(current_point);
			//console.log(hyp);
			if(isTouching(xCoord,yCoord,current_point)){
				current_point.color = 'blue';
			}else{
				current_point.color = 'green';
			}
			
			drawOnCanvas();
		};
	}


	canvas.onmousedown = function(mouse){

		var xCoord = mouse.clientX-mouse.target.offsetLeft;
		var yCoord = mouse.clientY-mouse.target.offsetTop;

		for(var i =0; i<figures.length; i++){

			var current_point = figures[i];

			if(isTouching(xCoord,yCoord,current_point)){
				//trigger animation
				current_point.color = 'red';
				pathp.push(current_point);
				draw_neighbors(current_point);
				//console.log('current point' +current_point.neighbors[0].x);
				cx.clearRect(0, 0, width, height);
				drawGrid();
				drawOnCanvas();

				//$('body').find('i[rel=modal]').open();
				 $('#vid').modal('show'); 
			}
		};
	};
	
	//changes from video to video
	$("#video").attr("src","https://www.youtube.com/embed/JE7tC9F5oVs");





	//////// INITIALIZATION

	drawGrid();

	
		//initial point
		/*
	   cx.beginPath();
	   cx.arc(points[0].x, points[0].y, 22, 0, 2 * Math.PI, false);
	   cx.fillStyle = 'red';
	   cx.fill();
	   cxlineWidth = 5;
	   cx.strokeStyle = '#003300';
	   cx.stroke();*/
  	   var p = new Point(points[0].x, points[0].y, 22, 'green');
	   pathp.push(p)
	 //draw initial neighbors
	   draw_neighbors(points[0]);
	   

	
   





