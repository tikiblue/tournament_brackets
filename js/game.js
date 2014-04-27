game = {
	opponents : 2,
	winners : 1
}

$(function(){
	$("#opponentsinput").change(function(){
		game.opponents = parseInt($(this).val());
		localStorage.setItem("game", JSON.stringify(game));
		$brackets.html("");
	});
	$("#winnersinput").change(function(){
		game.winners = parseInt($(this).val());
		localStorage.setItem("game", JSON.stringify(game));
		$brackets.html("");
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

});