const parser = require('./parse');
const getHTML = require('./get');
const paths = require('./paths');

/**
 * searchAnime.
 *
 * @param {string} anime
 * @param {int} items
 */
async function searchAnime(anime, to = 10, from = 0){
	return genaricQuery(function(i){
		return paths.searchAnime(anime,  i);
	}, parser.parseSearch, to, from);
}

/**
 * searchManga.
 * looks up manga based on text input
 *
 * @param {string} manga
 * @param {int} items
 */
async function searchManga(manga, to = 10, from = 0){
	return genaricQuery(function(i){
		return paths.searchManga(manga,  i);
	}, parser.parseSearch, to, from);
}

/**
 * queryGenreManga.
 * looks up manga belonging to a genre
 *
 * @param {string} genre
 * @param {int} items
 */
async function queryGenreManga(genre, to = 10, from = 0){
	return genaricQuery(function(i){
		return paths.mangaByGenre(genre,  i);
	}, parser.parseGenre, to, from);
}

/**
 * queryTopManga.
 * returns top rated X manga of all time.
 *
 * @param {int} items
 */
async function queryTopManga(to = 10, from = 0){
	return genaricQuery(function(i){
		return paths.topManga(i);
	}, parser.parseTop, to, from);
}

/**
 * searchManga.
 * looks up manga based on text input
 *
 * @param {string} manga
 * @param {int} items
 */
async function queryEntry(url){
	var query = await getHTML(url);
	return parser.parseEntry(query);	
}

/**
 * genaricQuery.
 * acts as a container for modular queries.
 *
 * @param {function} internalQuery the query function for a certain page
 * @param {function} parsingMethod the parsing method for the the modulke
 * @param {int} items the number of desired items
 */
async function genaricQuery(internalQuery, parsingMethod, to, from){
	var result = [];
	for(var i = from/50;  i < to/50 + 1; i++){
		var query = await getHTML(internalQuery(i));
		parsingMethod(query).forEach(x => {
			result.push(x);
		});
		if(result.length > to-from) break;
		sleep(200);
	}
	return result.slice(0, to-from);
}

function sleep(dur) {
 var d = new Date().getTime() + dur;
  while(new Date().getTime() <= d ) {}
}

module.exports = {
	searchAnime, searchManga, queryGenreManga, queryTopManga, queryEntry, sleep
}
