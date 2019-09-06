const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
async function robots(content) {
	await fetchContentFromWikipedia(content)
    sanitizedContent(content)
	async function fetchContentFromWikipedia(content){
        var wait = console.log('\nBaixando conteudo da wikipedia...')
		const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
		const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
		const wikipediaResponde = await wikipediaAlgorithm.pipe({
            "lang" : content.Lang,
            "articleName" : content.searchTheme
        })
		const wikipediaContent = wikipediaResponde.get()
		wait = console.log('Conteudo baixado com sucesso!')
		content.sourceContentOriginal = wikipediaContent.content
	}
}

    function sanitizedContent(content){
               function removeBlankLines(text){
            const allLines = text.split('\n')
            const withoutBlankLines = allLines.filter((line) => {
                if(line.trim().length === 0) {
                    return false
                }
                return true
            })
            return withoutBlankLines
            //console.log(allLines)
        }
    }
    function removeMarkdown(lines){
        const withoutMarkdown = lines.filter((line) => {
            if(line.trim().startsWith('=')) {
                return false
            }
            return true
        })
        return withoutMarkdown
    }
    
module.exports = robots
