const malApi = require('./src/api');
const fs = require('fs');

var count = 0;
async function main(){
	//var results = await malApi.queryTopManga(10000);
	//fs.appendFile("files.json", JSON.stringify(results), () => {});
	var results = JSON.parse(fs.readFileSync('files.json', 'utf8'));
	fs.appendFile("data.json", "[", () => {});
	for(var i = 3616; i < results.length; i++){
		console.log(count++);
		try{
			var x = await malApi.queryEntry(results[i]);
			fs.appendFile("data.json", `${JSON.stringify(x)},`, () => {});
		}catch(e){
			console.log(e);
			fs.appendFile("error.json", `${results[i]}\n`, () => {});
		}finally{
			malApi.sleep(5000);
		}
	}
	fs.appendFile("data.json", "]", () => {});
}

main();
