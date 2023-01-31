import {readdirSync, writeFileSync, existsSync, mkdirSync} from "fs";

const dev = false

/*
Compile files from js to json
*/
async function loadFiles() {
	const taskfiles = readdirSync("./rawtasks").filter(f=>f.endsWith(".js"))
	if (!existsSync("./compiledTasks")){
		mkdirSync("./compiledTasks");
	}
	for(let f of taskfiles) {
		const {task} = await import("./rawtasks/"+f)
		writeFileSync("./compiledTasks/" + f + "on", JSON.stringify(task), {encoding: "utf8"});
		if(dev) {
			writeFileSync("../myplanet-client/myplanettasks/" + f + "on", JSON.stringify(task), {encoding: "utf8"});
		}
	}
}

loadFiles()