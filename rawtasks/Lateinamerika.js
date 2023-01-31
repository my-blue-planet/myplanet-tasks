export const task = {
	title: "Lateinamerika",
	subtitle: "Fläche von Gebiten bestimmen",
	explanation: `
<p>Im Beispielcode wird die Fläche von Venezuela bestimmt, einerseits als Anzahl Pixel, andererseits in km².</p>
<ul  class="tasks">
<li>Machen Sie das gleiche zusätzlich für Chile.</li>
<li>Was fällt auf?</li>
<li>Was ist der Grund für diese Auffälligkeit?</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Dieser Effekt spielt vor allem bei grossflächigen Kartenausschnitten eine Rolle.</li>
<li>Mehr finden Sie <a href="https://de.wikipedia.org/wiki/Mercator-Projektion">hier</a>.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("southAmerica.json")
overlay = scene.addOverlay("progress")

venezuelaPixels = 0
venezuelaKm2 = 0

for p in scene.pixels:
\t
\t# show progress
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 25
\t
\tareaInKm2 = (p.size / 1000)**2
\t
\tif p.country == 243:
\t\tvenezuelaPixels += 1
\t\tvenezuelaKm2 += areaInKm2
\t
\t
print("Venezuela")
print("Pixel: ", venezuelaPixels)
print("Km2: ", round(venezuelaKm2))
`,
	templateJS: `const {Scene} = myplanet

scene = await Scene.load("southAmerica.json")
overlay = await scene.addOverlay("progress")

venezuelaPixels = 0
venezuelaKm2 = 0

for(let p of scene.pixels) {
\t
\t// show progress
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 25
\t
\tareaInKm2 = (p.size / 1000)**2
\t
\tif(p.country == 243) {
\t\tvenezuelaPixels += 1
\t\tvenezuelaKm2 += areaInKm2
\t}
}
print("Venezuela")
print("Pixel: ", venezuelaPixels)
print("Km2: ", Math.round(venezuelaKm2))
`,
	solution: `from myplanet import *

scene = Scene.load("southAmerica.json")
overlay = scene.addOverlay("progress")

venezuelaPixels = 0
venezuelaKm2 = 0

chilePixels = 0
chileKm2 = 0

for p in scene.pixels:
\t
\tq = overlay.getPixel(p.x, p.y)
\t
\tareaInKm2 = (p.size / 1000)**2
\t
\tif p.country == 243:
\t\tvenezuelaPixels += 1
\t\tvenezuelaKm2 += areaInKm2
\t\tq.red = 200
\t\t
\tif p.country == 41:
\t\tchilePixels += 1
\t\tchileKm2 += areaInKm2
\t\tq.red = 200
\t
print("Venezuela")
print("Pixel: ", venezuelaPixels)
print("Km2: ", round(venezuelaKm2))

print("Chile")
print("Pixel: ", chilePixels)
print("Km2: ", round(chileKm2))
`,
	solutionJS: `const {Scene} = myplanet

scene = await Scene.load("southAmerica.json")
overlay = await scene.addOverlay("progress")

venezuelaPixels = 0
venezuelaKm2 = 0

chilePixels = 0
chileKm2 = 0

for(let p of scene.pixels) {
\tif(p.country == 243) {
\t\tvenezuelaPixels += 1
\t\tvenezuelaKm2 += p.getAreaInKm2()
\t}
\tif(p.country == 41) {
\t\tchilePixels += 1
\t\tchileKm2 += p.getAreaInKm2()
\t}
\t// show progress
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 25
}
print("Venezuela")
print("Pixel: ", venezuelaPixels)
print("Km2: ", Math.round(venezuelaKm2))
print("Chile")
print("Pixel: ", chilePixels)
print("Km2: ", Math.round(chileKm2))`
}