export const task = {
	title: "Feuerland",
	subtitle: "Objekte zählen, z.B. Inseln",
	explanation: `
<ul  class="tasks">
<li>Versuchen Sie die Inseln auf dem Bild von einem Programm zählen zu lassen.</li>
<li>Tipp:
	<ol>
		<li>Erstellen Sie ein Overlay, wo Sie bereits besuchte Pixel markieren.</li>
		<li>Bei jedem noch unbesuchten Landpixel müssen Sie die Nachbarn überprüfen.</li>
		<li>Wenn diese auch unbesuchte Landpixel sind, müssen Sie deren Nachbarn überprüfen usw.</li>
		<li>Wenn es keine unbesuchten Nachbarn gibt, können Sie den Inselzähler um 1 erhöhen und eine neue Insel suchen.</li>
	</ol>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Auf die gleiche Art könnte man auch viele andere Objekte zählen (Schafe, Solardächer, Windturbinen, ...)</li>
<li>Der in der Lösung verwendete Algorithmus heisst Breitensuche.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("feuerland.json")
`,
	templateJS: `const {Scene} = myplanet

scene = await Scene.load("feuerland.json")
`,
	solution: `from myplanet import *

scene = Scene.load("feuerland.json")
overlay = scene.addOverlay("visited")

islands = 0
pixelsToCheck = []
currentGreen = 0

def isLand(x, y):
\tpixel = scene.getPixel(x, y)
\treturn pixel.country != 255

def isVisited(x, y):
\tpixel = overlay.getPixel(x, y)
\treturn pixel.blue == 255

def markAsVisited(x, y):
\tpixel = overlay.getPixel(x, y)
\tpixel.blue = 255
\tpixel.green = currentGreen
\treturn

def addPixel(x, y):
\tif scene.contains(x,y):
\t\tp = scene.getPixel(x, y)
\t\tpixelsToCheck.append(p)

def checkPixel(pixel):
\tx = pixel.x
\ty = pixel.y
\tif isLand(x, y) and not isVisited(x, y):
\t\tmarkAsVisited(x, y)
\t\taddPixel(x+1, y)
\t\taddPixel(x-1, y)
\t\taddPixel(x, y+1)
\t\taddPixel(x, y-1)

for p in scene.pixels:
\tx = p.x
\ty = p.y
\tif isLand(x, y) and not isVisited(x, y):
\t\tislands += 1
\t\tcurrentGreen = (currentGreen + 167) % 255
\t\tpixelsToCheck = [p]
\t\tprint(islands)
\t\tfor nextPixel in pixelsToCheck:
\t\t\tcheckPixel(nextPixel)

print(islands - 1, " Inseln")
print("weil eine das Festland ist.")
`,
	solutionJS: `const {Scene} = myplanet

scene = await Scene.load("feuerland.json")
overlay = await scene.addOverlay("visited")

islands = 0
pixelsToCheck = []
currentGreen = 0

function isLand(x, y) {
\tpixel = scene.getPixel(x, y)
\treturn pixel.country != 255
}

function isVisited(x, y) {
\tpixel = overlay.getPixel(x, y)
\treturn pixel.blue == 255
}

function markAsVisited(x, y) {
\tpixel = overlay.getPixel(x, y)
\tpixel.blue = 255
\tpixel.green = currentGreen
\treturn
}

function addPixel(x, y) {
\tif(scene.contains(x,y)) {
\t\tp = scene.getPixel(x, y)
\t\tpixelsToCheck.push(p)
\t}
}

function checkPixel(pixel) {
\tx = pixel.x
\ty = pixel.y
\tif(isLand(x, y) && !isVisited(x, y)) {
\t\tmarkAsVisited(x, y)
\t\taddPixel(x+1, y)
\t\taddPixel(x-1, y)
\t\taddPixel(x, y+1)
\t\taddPixel(x, y-1)
\t}
}

for(let p of scene.pixels) {
\tx = p.x
\ty = p.y
\tif(isLand(x, y) && !isVisited(x, y)) {
\t\tislands += 1
\t\tcurrentGreen = (currentGreen + 167) % 255
\t\tpixelsToCheck = [p]
\t\tprint(islands)
\t\tfor(let nextPixel of pixelsToCheck) {
\t\t\tcheckPixel(nextPixel)
\t\t}
\t}
}

print(islands - 1, " Inseln")
print("weil eine das Festland ist.")
`
}