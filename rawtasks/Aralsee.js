export const task = {
	title: "Aralsee",
	subtitle: "Analyse einer Zeitreihe II",
	explanation: `
<p>Die Bildserie (<dfn>Collection</dfn>) zeigt das Austrocknen des Aralsees.</p>
<ul class="tasks">
<li>Implementieren Sie die Funktion <dfn>isLake(pixel)</dfn>, um möglichst gut zu erkennen, ob das Pixel zum See gehört.</li>
<li>Wenn es gut klappt, können Sie die gesamte Zeitreihe untersuchen statt nur Bild 21.</li>
<li>Zusatzaufgabe: Stellen Sie das Jahr der Austrocknung als Farbverlauf das, indem die Farbe des Overlays vom Wert vom Jahr abhängt.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Das Programm wird schneller, wenn Sie die Analyse auf den Bereich mit dem See beschränken.</li>
<li>Es gibt auch Kompositbilder aus Infrarotkanälen, welche Wasser besonders gut erkennen.</li>
</ul>`,

	template: `from myplanet import *

collection = Collection.load("timelapse-aral.json")
overlay = collection.addOverlay("Aralsee")

def isLake(pixel):
\t# to do
\treturn False

frame = 0
for scene in collection.scenes[21:22]:
\tcollection.forceFrame(scene)
\tlakeArea = 0
\tfor p in scene.pixels:
\t\t# check if it is lake
\t\tif isLake(p):
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tq.red = 255 - 4 * frame
\t\t\tq.blue = 4 * frame
\t\t\t# lake in latest year
\t\t\tif scene.label == "2022":
\t\t\t\tq.blue = 50
\t\t\t\tq.green = 40
\t\t\t\tq.red = 0
\t\t\tlakeArea += p.getAreaInKm2()
\tframe += 1
\tprint(scene.label, round(lakeArea))
`,
	templateJS: `const {Scene, Collection} = myplanet

collection = await Collection.load("timelapse-aral.json")
overlay = await collection.addOverlay("Aralsee")

function isLake(pixel) {
\t// to do
\treturn false
}

frame = 0
for(let scene of collection.scenes.slice(21, 22) {
\tcollection.forceFrame(scene)
\tlakeArea = 0
\tfor(let p of scene.pixels) {
\t\tif(isLake(p)) {
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tq.red = 255
\t\t\tlakeArea += p.getAreaInKm2()
\t\t}
\t}
\tframe += 1
\tprint(scene.label, Math.round(lakeArea))
}
`,
	solution: `from myplanet import *

collection = Collection.load("timelapse-aral.json")
overlay = collection.addOverlay("Aralsee")

def isLake(pixel):
\tif pixel.blue == 0:
\t\treturn False # too dark/black
\tif pixel.red > 140:
\t\treturn False # too bright/red
\treturn pixel.red < 0.54 * (pixel.green + pixel.blue)

frame = 0
for scene in collection.scenes:
\tcollection.forceFrame(scene)
\tlakeArea = 0
\tfor p in scene.pixels:
\t\tif isLake(p):
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tq.red = 255 - 4 * frame
\t\t\tq.blue = 4 * frame
\t\t\t# lake in latest year
\t\t\tif scene.label == "2022":
\t\t\t\tq.blue = 50
\t\t\t\tq.green = 40
\t\t\t\tq.red = 0
\t\t\tlakeArea += p.getAreaInKm2()
\tframe += 1
\tprint(scene.label, round(lakeArea))
`,
	solutionJS: `const {Scene, Collection} = myplanet

collection = await Collection.load("timelapse-aral.json")
overlay = await collection.addOverlay("Aralsee")

function isLake(pixel) {
\tif(pixel.blue < 1) return false 
\tif(pixel.red > 140) return false
\treturn pixel.red < 0.54 * (pixel.green + pixel.b)
}

frame = 0
for(let scene of collection.scenes) {
\tcollection.forceFrame(scene)
\tlakeArea = 0
\tfor(let p of scene.pixels) {
\t\tif(isLake(p)) {
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tq.red = 255 - 4 * frame
\t\t\tq.blue = 4 * frame
\t\t\tif(scene.label == "2022") {
\t\t\t\tq.blue = 50
\t\t\t\tq.green = 40
\t\t\t\tq.red = 0
\t\t\t}
\t\t\tlakeArea += p.getAreaInKm2()
\t\t}
\t}
\tframe += 1
\tprint(scene.label, Math.round(lakeArea))
}
`
}