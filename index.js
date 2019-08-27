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
	console.log(content.sourceContentOriginal)
}
start()
