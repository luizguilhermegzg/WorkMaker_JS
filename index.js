const fs = require('fs')
const readline = require('readline-sync')
const robots = {
	text: require('./robots/texto.js')
}
async function start() {
    const content = {}
    content.searchTheme = askAndReturnSearchTheme()
	await robots.text(content)
	function askAndReturnSearchTheme(){
	return readline.question('Type a Wikipedia search Theme: ')
	
	}
	function saveArchive(){
		var archiveName = readline.question('Qual o nome do arquivo: ')
		fs.writeFile("./Archives-saves/"+archiveName,content.sourceContentOriginal, function(err){
			if(err){
				return console.log('erro!!')
			}
			else{
				return console.log('tudo certo!')
			}
		})
	}
	saveArchive()
}
start()
