game = {
	opponents : 2,
	winners : 1,
	image : "default"
}

$(function(){
	$("#opponentsinput").change(function(){
		game.opponents = parseInt($(this).val());
		updateGame();
	});
	$("#winnersinput").change(function(){
		game.winners = parseInt($(this).val());
		updateGame();
	});

	var gameString = localStorage.getItem("game");
	if(gameString){
		game = JSON.parse(gameString);
		$("#opponentsinput").val(game.opponents);
		$("#winnersinput").val(game.winners);
	}

	var playerString = localStorage.getItem("players");
	if(playerString){
		players = JSON.parse(playerString);
		fillPlayers(players);
	}

	var bracketsString = localStorage.getItem("brackets");
	if(bracketsString){
		tournamentStatus = JSON.parse(bracketsString);
		updateBrackets();
	}else{
		resetBrackets(players);
	}

	$("#game #gamecontent #gamebackground select").change(function(){
		game.image = $(this).val();
		updateBackgroundImage();
	});

	$("#game #gamecontent #gamebackground option").attr("selected", "");
	$("#game #gamecontent #gamebackground option[value="+game.image+"]").attr("selected", "selected");
	updateBackgroundImage();

});

function updateBackgroundImage(){
	var url = "img/games/"+game.image+".jpg";
	$("body").css("background","url('"+url+"')");
	$("body").css("background-size","125%");
	$("body").css("background-attachment","fixed");
	localStorage.setItem("game", JSON.stringify(game));
}

function updateGame(){
	if(game.winners >= game.opponents){
		game.winners = game.opponents-1;
		$("#winnersinput").val(game.winners);
	}
	localStorage.setItem("game", JSON.stringify(game));
	$brackets.html("");
}