export const task = {
	title: "Abholzung",
	subtitle: "Analyse einer Zeitreihe",
	explanation: `
<p>Das Beispiel zeigt, wie eine Bildserie (<dfn>Collection</dfn>) analysiert werden kann.</p>
<ul  class="tasks">
<li>Hier wird versucht, die Abholzung zu erkennen, wenn der Blaukanal <dfn>pixel.blue</dfn> einen bestimmten Schwellenwert überschreitet.
Dies funktioniert jedoch nicht gut, da es in manchen Jahren im Durchschnitt zu viele Wolken hatte. Welches wäre ein besserer Farbkanal und ein besserer Schwellenwert, um das Verschwinden des Waldes möglichst gut zu erkennen?</li>
<li>Wenn es gut klappt, können Sie die gesamte Abholzung in diesem Bildbereich aufsummieren. Welche Kantone der Schweiz haben ungefähr eine ähnliche Fläche?</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Die Erkennung kann verbessert werden, wenn das Programm für jedes Jahr selbst einen passenden Schwellenwert sucht.</li>
<li>Mit Infrarotkanälen würde es noch besser funktionieren.</li>
</ul>`,

	template: `from myplanet import *

collection = Collection.load("timelapse-amazonas.json")
overlay = collection.addOverlay()

for scene in collection.scenes:
\tcollection.forceFrame(scene)
\t
\t# handle year
\tnewDeforestation = 0
\tfor p in scene.pixels:
\t\tif p.blue > 45:
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif q.red < 255:
\t\t\t\tq.red = 255
\t\t\t\tq.alpha = 50
\t\t\t\tnewDeforestation += q.getAreaInKm2()
\tprint(scene.label, newDeforestation)

`,
	templateJS: `const {Scene, Collection} = myplanet

collection = await Collection.load("timelapse-amazonas.json")
overlay = await collection.addOverlay("Abholzung")

for(let scene of collection.scenes) {
\tcollection.forceFrame(scene)
\t// handle year
\tnewDeforestation = 0
\tfor(let p of scene.pixels) {
\t\t// check if it is forest
\t\tif(p.blue > 45) {
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif(q.red < 255) {
\t\t\t\tq.red = 255
\t\t\t\tq.alpha = 50
\t\t\t\tnewDeforestation += q.getAreaInKm2()
\t\t\t}
\t\t}
\t}
\tprint(scene.label, newDeforestation)
}
`,
	solution: `from myplanet import *

collection = Collection.load("timelapse-amazonas.json")
overlay = collection.addOverlay()

totalDeforestation = 0
for scene in collection.scenes:
\tcollection.forceFrame(scene)

\t# handle year
\tnewDeforestation = 0
\tfor p in scene.pixels:
\t\tif p.red > 40:
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif q.red < 255:
\t\t\t\tq.red = 255
\t\t\t\tq.alpha = 50
\t\t\t\tnewDeforestation += q.getAreaInKm2()
\tprint(scene.label, newDeforestation)
\ttotalDeforestation += newDeforestation

print(totalDeforestation)
`,
	solutionJS: `const {Scene, Collection} = myplanet

collection = await Collection.load("timelapse-amazonas.json")
overlay = await collection.addOverlay()

totalDeforestation = 0

for(let scene of collection.scenes) {
\tcollection.forceFrame(scene)
\t// handle year
\tnewDeforestation = 0
\tfor(let p of scene.pixels) {
\t\t// check if it is forest
\t\tif(p.red > 40) {
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif(q.red < 255) {
\t\t\t\tq.red = 255
\t\t\t\tq.alpha = 50
\t\t\t\tnewDeforestation += q.getAreaInKm2()
\t\t\t}
\t\t}
\t}
\tprint(scene.label, newDeforestation)
\ttotalDeforestation += newDeforestation
}

print(totalDeforestation)
`
}