const fs = require('fs')
const readline = require('readline-sync')
const printer = require('printer')
const robots = {
	text: require('./robots/texto.js')
}
async function start() {
    const content = {}
    content.searchTheme = askAndReturnSearchTheme()
    content.Lang = askAndReturnLanguage()
	await robots.text(content)
	function askAndReturnSearchTheme(){
	return readline.question('Type a Wikipedia search Theme: ')
	
	}
	function askAndReturnLanguage(){
		const language = ['pt','en']
		const selectedLangIndex = readline.question('[0] Português'+'\n[1] Inglês'+'\nChoice Language: ')
		const selectedLangText = language[selectedLangIndex]
		return selectedLangText
	}
	function saveArchive(){
		console.log('\nTodos os arquivos são salvos em Archives-saves')
		var archiveName = readline.question('Qual o nome do arquivo: ')
		fs.writeFile("./Archives-saves/"+archiveName+".odt",content.sourceContentOriginal, function(err){
			if(err){
				return console.log('erro!!')
			}
			else{
				console.log('Arquivo salvo com sucesso!')
				const printerYN = [false,true]
				var resposeIndex = readline.question('Imprimir? [1] Sim [0] Não: ')
				const response = printerYN[resposeIndex] 
				if (response == true){
					return printer()
				}
				else{
					return console.log('Program exit!')
				}
			}
		})
	}
	function printer(){
		console.log('debugging')
	}
	saveArchive()
}
start()
