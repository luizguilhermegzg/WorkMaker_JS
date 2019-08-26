const readline = require('readline-sync')
function start() {
    	const content = {}
    
    	content.searchTheme = askAndReturnSearchTheme()
	function askAndReturnSearchTheme(){
	return readline.question('Type a Wikipedia search Theme: ')
	
	}
	console.log(content)

}
start()
