/**
 *
 * Class contains static methods that return urls to crawl
 * @class
 */
class paths {	
	/**
	 * @param {genre} genre: the genre's index or name
	 * @param {int} page: index of page
	 */
	static searchAnime(name, page=0){
		return `https://myanimelist.net/anime.php?q=${name}&cat=anime&show=${page*50}`;
	}

	/**
	 * @param {genre} genre: the genre's index or name
	 * @param {int} page: index of page
	 */
	static searchManga(name, page=0){
		return `https://myanimelist.net/manga.php?q=${name}&cat=manga&show=${page*50}`;
	}

	/**
	 * @param {string} genre: the genre name
	 * @param {int} page: index of page
	 */
	static mangaByGenre(genre, page=0){
		if(genres[genre] == undefined)
			throw new Error("genre does not exist. Check the long ass variable in api.js");

		return `https://myanimelist.net/manga/genre/${genres[genre]}/${genre}?page=${page+1}`;
	}

	/**
	 * gets the best 50 mangas ranked starting 50*(page+1)
	 * @param {int} page: the page index
	 */
	static topManga(page=0){
		return `https://myanimelist.net/topmanga.php?limit=${page*50}`	
	}

}

let genres = {
    "Action": 1,
    "Adventure": 2,
    "Cars": 3,
    "Comedy": 4,
    "Dementia": 5,
    "Demons": 6,
    "Doujinshi": 43,
    "Drama": 8,
    "Ecchi": 9,
    "Fantasy": 10,
    "Game": 11,
    "GenderBender": 44,
    "Harem": 35,
    "Hentai": 12,
    "Historical": 13,
    "Horror": 14,
    "Josei": 42,
    "Kids": 15,
    "Magic": 16,
    "MartialArts": 17,
    "Mecha": 18,
    "Military": 38,
    "Music": 19,
    "Mystery": 7,
    "Parody": 20,
    "Police": 39,
    "Psychological": 40,
    "Romance": 22,
    "Samurai": 21,
    "School": 23,
    "Sci-Fi": 24,
    "Seinen": 41,
    "Shoujo": 25,
    "ShoujoAi": 26,
    "Shounen": 27,
    "ShounenAi": 28,
    "SliceofLife": 36,
    "Space": 29,
    "Sports": 30,
    "SuperPower": 31,
    "Supernatural": 37,
    "Thriller": 45,
    "Vampire": 32,
    "Yaoi": 33,
    "Yuri": 34,
    "ShounenJumpWeekly": 83,
    "Sho-Comi": 22,
    "ShounenSunday": 229,
    "Margaret": 17,
    "RibonMagazine": 9,
    "Betsucomi": 54,
    "ComicMegastore": 404,
    "HanatoYume": 21,
    "ShounenMagazineWeekly": 8,
    "ComicKairaku-ten": 533,
    "MagazineBexBoy": 126,
    "ComicLO": 348,
    "YoungJump": 87,
    "ShounenJump": 1209,
    "Nakayoshi": 20,
    "Cheese": 124,
    "Afternoon": 4,
    "GanganOnline": 419,
    "DengekiDaioh": 23,
    "BessatsuFriend": 111,
    "BessatsuMargaret": 53,
    "ShounenChampion": 206,
    "ShounenAce": 27,
    "Dear": 99,
    "ComicYuriHime": 423,
    "ComicAlive": 137,
    "ComicTenma": 328,
    "BigComicSpirits": 3,
    "ComicMujin": 555,
    "DragonAge": 98,
    "LaLa": 11,
    "drap": 156,
    "ComicHotmilk": 258,
    "ComicAun": 571,
    "Morning": 72,
    "AsukaMonthly": 14,
    "Hanaoto": 138,
    "YoungMagazineWeekly": 10,
    "GUSH": 131,
    "PetitComic": 73,
    "AngelClub": 641,
    "CompAce": 112,
    "Harlequin": 248,
    "LaLaDX": 135,
    "ComicKairaku-tenBeast": 581,
    "Ciao": 59,
    "Dessert": 95,
    "YoungGangan": 24,
    "ShounenGangan": 13,
    "JumpSQ": 161
}

module.exports = paths;
