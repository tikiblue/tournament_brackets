$brackets = $("#brackets");

tournamentStatus = {};

$(function(){
	$(document).on("click","#brackets .round .game .player", function(){
		onPlayerClicked(this);
	});
	$(document).on({
	    mouseenter: function () {
	        highlightPlayer($(this).attr("num"));
	    },
	    mouseleave: function () {
	        unhighlightPlayers();
	    }
	}, "#brackets .game .player");
});

function highlightPlayer(num){
    unhighlightPlayers();
    if(num==-1)return;
    $("#brackets .game .player.player-"+num).addClass("highlighted");
}

function unhighlightPlayers(){
	$("#brackets .game .player").removeClass("highlighted");
}

function resetBrackets(players){
	var games = Math.ceil(players.length/game.opponents);
	tournamentStatus["rounds"] = new Array();
	tournamentStatus["rounds"][0] = new Array();
	var randomPlayers = new Array();
	for(i in players){
		randomPlayers[i] = players[i];
	}
	randomPlayers = shuffle(randomPlayers);
	var playersassigned = 0;
	for(i in randomPlayers){
		var gamenum = Math.floor(playersassigned / game.opponents);
		if(getGame(0).length<=gamenum){
			var currentGame = new Array();
		}else{
			var currentGame = getGame(0,gamenum);
		}
		playersassigned++;
		var newPlayer = {"order":i, "won":false};
		newPlayer["name"]=randomPlayers[i]["name"];
		newPlayer["id"]=randomPlayers[i]["id"];
		currentGame[currentGame.length]=newPlayer;
		tournamentStatus["rounds"][0][gamenum] = currentGame;
	}
	var i = 0;
	while(tournamentStatus["rounds"][i].length*game.winners>game.winners){
		var players = tournamentStatus["rounds"][i].length;
		var nextPlayers = 0;
		for(j in tournamentStatus["rounds"][i]){
			if(tournamentStatus["rounds"][i][j].length>=game.winners){
				nextPlayers += game.winners;
			}else{
				nextPlayers += tournamentStatus["rounds"][i][j].length;
			}
		}
		i++;
		tournamentStatus["rounds"][i] = new Array();
		var playersassigned = 0;
		for(var j=0; j<nextPlayers; j++){
			var gamenum = Math.floor(playersassigned / game.opponents);
			if(getGame(i).length<=gamenum){
				var currentGame = new Array();
			}else{
				var currentGame = getGame(i,gamenum);
			}
			playersassigned++;
			currentGame[currentGame.length] = {"id":-1, "name":"tbd", "order":0};
			tournamentStatus["rounds"][i][gamenum] = currentGame;
		}
		if(i%2!=0){
			tournamentStatus["rounds"][i] = tournamentStatus["rounds"][i].reverse();
		}
	}
	updateBrackets();
}

function getGame(round, number){
	if(number==null)return tournamentStatus["rounds"][round];
	return tournamentStatus["rounds"][round][number];
}

function updateBrackets(){
	$brackets.html("");
	if(!tournamentStatus["rounds"])return;
	for(var i=0; i<tournamentStatus["rounds"].length; i++){
		showRound(tournamentStatus["rounds"][i], i);
	}
	localStorage.setItem("brackets",JSON.stringify(tournamentStatus));
}

function showRound(round, num){
	var $round = $('<div class="round" id="round-'+num+'"></div>');
	for(g in round){
		$round.append(createGame(round[g]));
	}
	$brackets.append($round);
}

function createGame(game){
	var $game = $('<div class="game"></div>');
	for(p in game){
		var player = game[p];
		var pId = player["id"];
		var bgcolor = "#bbb";
		var name = "tbd";
		if(pId!=-1){
			var bgcolor = colors[pId%colors.length];
			var name = players[pId].name;
		}
		var $player = $('<div class="player player-'+pId+'" order="'+player["order"]+'" num="'+pId+'"><img src="img/user.png" style="background-color:'+bgcolor+'"></img><div class="name">'+name+'</div></div>');
		if(player["won"]){
			$player.addClass("won");
		}
		$game.append($player);
	}
	return $game;
}

function onPlayerClicked(player){
	var $player = $(player);
	var playerid = $player.attr("num");
	var order = $player.attr("order");
	if(playerid==-1)return;
	var round = $player.closest(".round").index();
	var game = $player.closest(".game").index();
	var players = tournamentStatus["rounds"][round][game];
	for(var i=0; i<players.length; i++){
		if(players[i]["id"]==playerid){
			if(players[i]["won"]){
				tournamentStatus["rounds"][round][game][i]["won"] = false;
				removePlayer(playerid, round+1);
			}else{
				tournamentStatus["rounds"][round][game][i]["won"] = true;
				addPlayer(playerid, round+1, order);
			}
			break;
		}
	}
	updateBrackets();
}

function removePlayer(id, round){
	var rounds = tournamentStatus["rounds"].length;
	for(var i=round; i<rounds; i++){
		var games = tournamentStatus["rounds"][i].length;
		for(var j=0; j<games; j++){
			var game = tournamentStatus["rounds"][i][j];
			for(var k=0; k<game.length; k++){
				if(game[k]["id"]==id){
					tournamentStatus["rounds"][i][j][k] = {"id":-1, "name":"tbd", "order":0};
				}
			}
		}
	}
}

function addPlayer(id, round, order){
	if(tournamentStatus["rounds"].length<=round){
		playerWon(id);
		return;
	}
	var playersForNextRound = new Array();
	var games = tournamentStatus["rounds"][round].length;
	for(var j=0; j<games; j++){
		var game = tournamentStatus["rounds"][round][j];
		for(var k=0; k<game.length; k++){
			if(game[k]["id"]!=-1){
				var newPlayer = {"won":false};
				newPlayer["name"] = game[k]["name"];
				newPlayer["id"] = game[k]["id"];
				newPlayer["order"] = game[k]["order"];
				playersForNextRound[playersForNextRound.length] = newPlayer;
			}
		}
	}
	var newPlayer = {"won":false};
	newPlayer["name"] = players[id]["name"];
	newPlayer["id"] = id;
	newPlayer["order"] = order;
	playersForNextRound[playersForNextRound.length] = newPlayer;

	playersForNextRound.sort(function(a,b){
		return a["order"]-b["order"];
	});

	var participants = 0;

	for(var i=0; i<games; i++){
		for(var j=0; j<tournamentStatus["rounds"][round][i].length; j++){
			if(participants<playersForNextRound.length){
				var player = playersForNextRound[participants];
			}else{
				var player = {"id":-1, "name":"tbd", "order":0}; 
			}
			tournamentStatus["rounds"][round][i][j]=player;
			participants++;
		}
	}
}

function playerWon(id){
	if(id<0||id>=players.length)return;
	console.log(players[id], "WON!!!");
	var $won = $('<div id="won"></div>');
	var $img = $('<img src="img/won.png"></img>');
	var $text = $('<div id="winnertext">'+players[id]["name"]+'<br/>wins!!!</div>');
	$won.append($img);
	$won.append($text);
	$("body").append($won);
	$won.click(function(){
		$won.remove();
	});
}