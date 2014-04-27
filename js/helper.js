// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// from D3js.org
var colors = [
	"#1f77b4", //blue
	"#ff7f0e", //orange
	"#2ca02c", //green
	"#d62728", //red
	"#ff9896", //lightred
	"#9467bd", //purple
	"#8c564b", //brown
	"#e377c2", //pink
	"#7f7f7f", //gray
	"#bcbd22", //ocre
	"#17becf", //turqoise
	"#9edae5", //lightturqoise
	"#aec7e8", //lightblue
	"#ffbb78", //lightorange
	"#98df8a", //lightgreen
	"#c5b0d5", //lightpurple
	"#c49c94", //lightbrown
	"#f7b6d2", //lightpink
	"#c7c7c7", //lightgray
	"#dbdb8d", //lightocre
	"#393b79", 
	"#5254a3", 
	"#6b6ecf", 
	"#9c9ede", 
	"#637939", 
	"#8ca252", 
	"#b5cf6b", 
	"#cedb9c", 
	"#8c6d31", 
	"#bd9e39", 
	"#e7ba52", 
	"#e7cb94", 
	"#843c39", 
	"#ad494a", 
	"#d6616b", 
	"#e7969c", 
	"#7b4173", 
	"#a55194", 
	"#ce6dbd", 
	"#de9ed6",
	"#3182bd", 
	"#6baed6", 
	"#9ecae1", 
	"#c6dbef", 
	"#e6550d", 
	"#fd8d3c", 
	"#fdae6b",
	"#31a354", 
	"#74c476", 
	"#a1d99b", 
	"#c7e9c0", 
	"#756bb1", 
	"#9e9ac8", 
	"#bcbddc", 
	"#dadaeb", 
	"#636363", 
	"#969696", 
	"#bdbdbd", 
	"#d9d9d9"
];