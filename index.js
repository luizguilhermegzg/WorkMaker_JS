const fs = require('fs')
const readline = require('readline-sync')
const robots = {
	text: require('./robots/texto.js')
}
var startProgram = 0
async function start() {
	if(startProgram ==0){
		console.log('github: https://github.com/luizguilhermegzg\ngit-repository: https://github.com/luizguilhermegzg/work-maker')
	}
	else{

	}
    const content = {}
    content.searchTheme = askAndReturnSearchTheme()
    content.Lang = askAndReturnLanguage()
	await robots.text(content)
	function askAndReturnSearchTheme(){
	return readline.question('\nType a Wikipedia search Theme: ')

	}
	function askAndReturnLanguage(){
		const language = ['pt','en','ko','jp']
		const selectedLangIndex = readline.keyInSelect(language, "Escolha uma linguagem: ")
		const selectedLangText = language[selectedLangIndex]
		return selectedLangText
	}
	function askAndReturnSummarizer(){
		if(readline.keyInYN('\nDeseja resumir o texto: ')){
			resumir()
		}
		else{
			saveArchive()
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
		console.log('\nTodos os arquivos são salvos na pasta principal!')
		fs.writeFile("./"+content.searchTheme+".odt",content.sourceContentOriginal, function(err){
			if(err){
				return console.log('erro!!')
			}
			else{
				if (readline.keyInYN('\nReiniciar o programa: ')){
					content.searchTheme = ''
					startProgram +=1
          start()

				}
				else{
					readline.keyInPause("\nPressione qualquer tecla para sair...")

				}
			}
		})
	}

	askAndReturnSummarizer()
}
start()

