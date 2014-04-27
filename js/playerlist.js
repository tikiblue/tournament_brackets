players = []

$(function(){
	emptyplayer = $("#participantlist").html();
	$("#participantlist").find(".icon").css("background-color",colors[0]);
	$(document).on("blur",".participantname",updatePlayers);
	$(document).on("keyup",".participantname",function(event){
		if(event.keyCode == 13){
			$(this).trigger("blur");
			var empty = $(".participant").last().find("input")[0];
			empty.focus();
		}
	});
	$("#participants #fill").click(function(){
		resetBrackets(players);
		minimizePlayers();
		minimizeGame();
	})
});

function updatePlayers(){
	players = [];
	var id = 0;
	$(".participant").each(function(){
		$player = $(this);
		var playername = $player.find(".participantname").val().trim();
		if(playername.length==0){
			$player.remove();
		}else{
			var num = parseInt($player.attr("num"));
			players[num] = {"name":playername, "id":num};
			if(num>id)id=num;
		}
	});
	var $emptyPlayer = $(emptyplayer);
	$emptyPlayer.attr("num", id+1);
	$emptyPlayer.find(".icon").css("background-color",colors[id+1%colors.length]);
	$("#participantlist").append($emptyPlayer);
	localStorage.setItem("players",JSON.stringify(players));
	updateBrackets();
}

function fillPlayers(players){
	for(i in players){
		var $emptyPlayer = $(emptyplayer);
		$emptyPlayer.attr("num", i);
		$emptyPlayer.find(".icon").css("background-color",colors[i%colors.length]);
		$emptyPlayer.find("input").val(players[i]["name"]);
		$("#participantlist").append($emptyPlayer);
	}
	updatePlayers();
}