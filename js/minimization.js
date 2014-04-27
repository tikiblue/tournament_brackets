MINIMIZATION_SPEED = 250;
originalPlayerWidth = 0;
originalGameHeight = 0;

$(function(){
	initPlayerMinimization();
	initGameMinimization();
});

function initPlayerMinimization(){
	$playercontent = $("#playercontent");
	originalPlayerWidth = $playercontent.width();
	$("#minimizeplayers").click(OnMinimizePlayersClicked);
}

function initGameMinimization(){
	$gamecontent = $("#gamecontent");
	originalGameHeight = $gamecontent.height();
	$("#minimizegame").click(OnMinimizeGameClicked);
}

function OnMinimizePlayersClicked(){
	$playercontent.stop();
	if($playercontent.width() == originalPlayerWidth){
		minimizePlayers();
	}else{
		maximizePlayers();
	}
}

function OnMinimizeGameClicked(){
	$gamecontent.stop();
	if($gamecontent.height() == originalGameHeight){
		minimizeGame();
	}else{
		maximizeGame();
	}
}

function minimizePlayers(){
	$playercontent.animate({"width":"0"},MINIMIZATION_SPEED);
}

function minimizeGame(){
	$gamecontent.animate({"height":"0"},MINIMIZATION_SPEED);
}

function maximizePlayers(){
	$playercontent.animate({"width":originalPlayerWidth},MINIMIZATION_SPEED);
}

function maximizeGame(){
	$gamecontent.animate({"height":originalGameHeight},MINIMIZATION_SPEED);
}