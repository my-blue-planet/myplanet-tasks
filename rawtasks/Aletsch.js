export const task = {
	title: "Aletsch",
	subtitle: "Lokale Maxima markieren",
	explanation: `<p>Mit dem Befehl <dfn>overlay.addMarker(x, y)</dfn> kann eine Markierung erstellt werden (z.&nbsp;B. bei einem Berggipfel).</p>
<ul  class="tasks">
<li>Es sollen alle Pixel markiert werden, deren Meereshöhe grösser ist als diejenige aller 4 Nachbarn.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Lokale Maxima können z.B. helfen, Baumkronen in einer Plantage zu zählen.</li>
<li>Das Finden der Nachbarpixel ist sehr nützlich. Es könnte sich lohnen, eine Funktion dafür zu erstellen.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("aletschSmall.json")
overlay = scene.addOverlay("peaks")

overlay.addMarker(128, 156)

for pixel in scene.pixels:
\tif pixel.elevation >= 8000:
\t\tprint(pixel)
`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("aletsch.json")
overlay = await scene.addOverlay()

overlay.addMarker(100, 200)

for(let pixel of scene.pixels) {
\tif (pixel.elevation >= 8000) {
\t\tprint(pixel)
\t}
}

`,
	solution: `from myplanet import *

scene = Scene.load("aletschSmall.json")
overlay = scene.addOverlay("peaks")

overlay.addMarker(128, 156)

def addPixelIfExists(list, x, y):
\tif scene.contains(x, y):
\t\tlist.append(scene.getPixel(x, y))

def getNeighbours(x, y):
\tneighbours = []
\taddPixelIfExists(neighbours, x-1, y)
\taddPixelIfExists(neighbours, x+1, y)
\taddPixelIfExists(neighbours, x, y-1)
\taddPixelIfExists(neighbours, x, y+1)
\treturn neighbours

def isHigherThanNeighbours(pixel):
\tfor n in getNeighbours(pixel.x, pixel.y):
\t\tif n.elevation >= pixel.elevation:
\t\t\treturn False
\treturn True

for pixel in scene.pixels:
\tif isHigherThanNeighbours(pixel):
\t\toverlay.addMarker(pixel.x, pixel.y)
`,
	solutionJS: `const {Scene} = myplanet

const scene = await Scene.load("himalaya.json")

W = scene.getWidth()
H = scene.getHeight()

print("Grösse in Pixeln: ", W, "x", H)

count = 0
peak = 0

for(let pixel of scene.pixels) {
\tif (pixel.elevation >= 8000) {
\t\tcount++
\t}
\tif (pixel.elevation > peak) {
\t\tpeak = pixel.elevation
\t}
}

print(count, " pixels above 8000 m")
print("Height of highest peak: ", peak)
`
}