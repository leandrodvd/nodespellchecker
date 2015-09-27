//init spellchecker
var fs = require('fs');
var spellcheck = require('nodehun-sentences');
var nodehun = require('nodehun');
var hunspell = new nodehun(
		fs.readFileSync('pt_BR.aff'),
		fs.readFileSync('pt_BR.dic')
);
	
//spellchecker functions declarations	
function countErrors(sentence,callback){
	spellcheck(hunspell, sentence, function(err, typos) {
		if (err) {
			callback(err);
		}
		if(typeof callback === 'function'){
			callback(null,typos.length);
		}
		
	});
	
}


//app execution

//proccess inputs
if (process.argv.length<3){
	console.error("Voce deve informar um apalavra ou frase para ser analisada.");
	process.exit(1);
}
if (process.argv.length>3){
	console.error("Frases devem ser colocadas entre aspas. Ex.: node app.js \"Joao subiu no pe de feijao\".");
	process.exit(1);
}

var sentece = process.argv[2];
countErrors(sentece,
	function(err,errorsCount){
		if (err) {
			console.error("Ocorreu um erro "+err);
		}
		console.log("Total de erros encontrados:"+errorsCount);
	}
);