const fs = require('fs')
const readline = require('readline-sync')
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
		const selectedLangIndex = readline.question('\n<<<<Language>>>>\n[0] Português'+'\n[1] Inglês'+'\nChoice Language: ')
		const selectedLangText = language[selectedLangIndex]
		return selectedLangText
	}
	function askAndReturnSummarizer(){
		var response = readline.question('\n<<<<Resumir>>>>\n[1] Sim\n[2] Não\nResumir: ')
		if (response == '1'){
			return resumir()
		}
		else{
			return saveArchive()
		}
	}
	async function resumir(){
		console.log('\nResumindo...')
		const algorithmia = require("algorithmia");
		const algorithmiaApiKey = require('./credentials/algorithmia.json').apiKey
		var input = content.sourceContentOriginal
		const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
		const summarizerAlgorithm = algorithmiaAuthenticated.algo("nlp/Summarizer/0.1.8")
		const summarizerResponse= await summarizerAlgorithm.pipe(input)
		const summarizerText = summarizerResponse.get()
		content.sourceContentOriginal = summarizerText
		console.log('Pronto!')
		saveArchive()
	}
	function saveArchive(){
		console.log('\nTodos os arquivos são salvos em Archives-saves')
		var archiveName = readline.question('Qual o nome do arquivo: ')
		fs.writeFile("./Archives-saves/"+archiveName+".odt",content.sourceContentOriginal, function(err){
			if(err){
				return console.log('erro!!')
			}
			else{
				console.log('\nArquivo salvo com sucesso!')
				const printerYN = [false,true]
				var resposeIndex = readline.question('\nImprimir? [1] Sim [0] Não: ')
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
		console.log(printer.printerOptions(printer))
	}
	askAndReturnSummarizer()
}
start()

