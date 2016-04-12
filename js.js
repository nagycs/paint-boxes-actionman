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
						$(this).toggleClass($bgcolor);
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

	
	$controls.append($red);
	$controls.append($green);
	$controls.append($blue);

	$controls.append($left);
	$controls.append($right);
	$controls.append($up);
	$controls.append($down);
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

function stepLeft(){
	if($posy>0){
		var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posy--;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}else{
		alert('DOH!!!');
	}
}

function stepRight(){
	 if($posy<7){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posy++;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}else{
		alert('DOH!!!');
	}
}

function stepUp(){
	 if($posx>0){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posx--;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}else{
		alert('DOH!!!');
	}
}

function stepDown(){
	 if($posx<7){
	 	var act = $("#"+ $posx + $posy);
		act.removeClass('man');
		$posx++;
		act = $("#"+ $posx + $posy);
		act.addClass('man');
	}else{
		alert('DOH!!!');
	}
}

function step($step){
	switch($step){
		case 0: stepLeft();
			break;

		case 1: 
			stepRight();
			break;

		case 2: 
			stepUp();
			break;

		case 3: 
			stepDown()
			break;
		default: break;
	}




}

window.onload = function(){
	createTable("#table");
	createControls("#controls");
	createSaveLoad("#saveload");
	crateMan();
}