game = {
	opponents : 2,
	winners : 1
}

$(function(){
	$("#opponentsinput").change(function(){
		game.opponents = parseInt($(this).val());
		$brackets.html("");
	});
	$("#winnersinput").change(function(){
		game.winners = parseInt($(this).val());
		$brackets.html("");
	});
});