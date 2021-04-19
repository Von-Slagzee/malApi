var HTMLParser = require('node-html-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * parses mal's search result
 * @param {string} url: url to parse from
 */
function parseSearch(url){
	var document = HTMLParser.parse(url);
	var all = document.querySelectorAll("tr td a strong");
	var result = [];
	all.forEach(found => {
		//result.push(`${found.innerText} : ${found.parentNode.rawAttributes.href}`);
		result.push(`${encodeURI(found.parentNode.rawAttributes.href)}`);
	});
	return result;
}

/**
 * parses mal's Genre peek result
 * @param {string} url: url to parse from
 */
function parseGenre(url){
	var document = HTMLParser.parse(url);
	var all = document.querySelectorAll(".title-text .link-title");
	var result = [];
	all.forEach(found => {
		//result.push(`${found.innerText} : ${found.rawAttributes.href}`);
		result.push(`${encodeURI(found.rawAttributes.href)}`);
	});
	return result;
}

/**
 * parses mal's Top manga/anime result
 * @param {string} url: url to parse from
 */
function parseTop(url){
	var document = HTMLParser.parse(url);
	var all = document.querySelectorAll(".manga_h3 a");
	var result = [];
	all.forEach(found => {
		//result.push(`${found.innerText} : ${found.rawAttributes.href}`);
		result.push(`${encodeURI(found.rawAttributes.href)}`);
	});
	return result;
}

function parseEntry(url){
	var document = new JSDOM(url).window.document;
	var entry = {names: []};
	entry.names.push(document.querySelector(`span[itemprop="name"]`).childNodes[0].data);
	[...document.querySelectorAll(`h2 ~ .spaceit_pad`)].splice(0,2).forEach(x => {
		entry.names.push(x.textContent.split(": ")[1]);
	});	
	document.querySelectorAll(`td.borderClass`)[0].querySelectorAll(`br ~ div:not(.clearfix, h2, .spaceit_pad)`).forEach(x => {
		var sp = x.textContent.replace(/(\r\n|\n|\r)/gm, "").split(": ");
		entry[sp[0]] = sp[1];
	});

	//clean up genres
	entry.Genres = entry.Genres.replaceAll(" ", "").split(",");
	for(var i = 0; i < entry.Genres.length; i++){
		entry.Genres[i] = entry.Genres[i].slice(entry.Genres[i].length/2);
	}

	//clean up description
	try{
		entry.Description = document.querySelector(`span[itemprop="description"]`).textContent;
		entry.Description = entry.Description.split("\n").filter(function(x){
			return x != "";
		});
	}catch(e){};

	entry.rank = document.querySelector(".numbers.ranked").childNodes[1].textContent.replace("#", "");

	return entry;
}

module.exports = {
	parseSearch,
	parseGenre,
	parseTop,
	parseEntry
};
