$bgcolor = "white";
$posx = 0;
$posy = 0;

function createTable(selector){
	var $table = $(selector);
	var i,j;
	var $sorok = $('<table>');
	//$table.addClass('cells');

	for(i = 0; i<8; i++){
		var $tr = $('<tr id="'+i+'">');
		for(j = 0; j<8; j++){
			$tr.append(
				$('<td id="'+i+''+j+'" class="white">').click(
					function(event){
						//$(this).toggleClass($bgcolor);
						$(this).attr('class',$bgcolor);
					}
				)
			);
		}
		$sorok.append($tr);
	}
	$table.append($sorok);
}

function createControls(selector){
	var $controls = $(selector);
	$red = $('<div class="red"></div>').click(
			function(event){
				//localStorage.setItem("color","red");
				$bgcolor = "red";
			}
		);
	$green = $('<div class="green"></div>').click(
			function(event){
				//localStorage.setItem("color","green");
				$bgcolor = "green";
			}
		);
	$blue = $('<div class="blue"></div>').click(
			function(event){
				//localStorage.setItem("color","blue");
				$bgcolor = "blue";
			}
		);


//buttons to step towards
/*
	$right = $('<button class="right">RIGHT</button>').click(
			function(event){
				//localStorage.setItem("color","blue");
				step(1);
			}
		);

	$left = $('<button class="left">LEFT</button>').click(
			function(event){
				//localStorage.setItem("color","blue");
				step(0);
			}
		);

	$up = $('<button class="up">UP</button>').click(
			function(event){
				//localStorage.setItem("color","blue");
				step(2);
			}
		);

	$down = $('<button class="left">DOWN</button>').click(
			function(event){
				//localStorage.setItem("color","blue");
				step(3);
			}
		);
*/
	
	$controls.append($red);
	$controls.append($green);
	$controls.append($blue);
/*
	$controls.append($left);
	$controls.append($right);
	$controls.append($up);
	$controls.append($down);
*/
}

function save(){
	var tds = $('#table tr td');
	alert("Your picture has been saved! :)");
	var pixels = [];
	for(var i in tds){
		var pixel = {};
		pixel.id = tds[i].id;
		pixel.color = tds[i].className;
		pixels.push(pixel);
	}
	localStorage.setItem("picture",JSON.stringify(pixels));
}

function load(){
	var pixels = JSON.parse(localStorage.getItem("picture"));
	for(var i in pixels){
		$('#'+pixels[i].id).attr('class',pixels[i].color);
	}
}

function createSaveLoad(selector){
	var $saveload = $(selector);
	$save = $('<button id="save">save</button>').click(
			function(){
				save();
			}
		);
	$load = $('<button id="load">load</button>').click(
			function(){
				load();
			}
		);
	$saveload.append($save);
	$saveload.append($load);
}

function crateMan(){
	var actual = $("#00");
	actual.addClass('man');
}

function checkSteppable($posx,$posy){
	var cell = $("#" + $posx + "" + $posy).attr('class');
	if(cell == "white"){
		return 0;
	}
	return 1;
}

function stepLeft(){
	var r = checkSteppable($posx,$posy-1);
	if(($posy>0) && (r == 0)){
		var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posy--;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}
}

function stepRight(){
	var r = checkSteppable($posx,$posy+1);
	if(($posy<7) && (r == 0)){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posy++;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}
}

function stepUp(){
	var r = checkSteppable($posx-1,$posy);
	if(($posx>0) && (r == 0)){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posx--;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}
}

function stepDown(){
	var r = checkSteppable($posx+1,$posy);
	if(($posx<7) && (r == 0)){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posx++;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}
}

//if Homer gets into the last cell
function checkWin(){
	if($posx==7 && $posy==7){
		alert('You win!');
	}
}

function step($step){
	switch($step){
		case 37: stepLeft();
			break;

		case 39: 
			stepRight();
			break;

		case 38: 
			stepUp();
			break;

		case 40: 
			stepDown()
			break;
		default: break;
	}
	checkWin();
}

window.onload = function(){
	createTable("#table");
	createControls("#controls");
	createSaveLoad("#saveload");
	crateMan();
}