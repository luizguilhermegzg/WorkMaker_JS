const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
async function robots(content) {
	await fetchContentFromWikipedia(content)
	async function fetchContentFromWikipedia(content){
		const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
		const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
		const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTheme)
		const wikipediaContent = wikipediaResponde.get()
		
		content.sourceContentOriginal = wikipediaContent.content
	}
}
module.exports = robots
