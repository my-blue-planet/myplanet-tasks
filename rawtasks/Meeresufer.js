export const task = {
	title: "Meeresküste",
	subtitle: "Küstenfächen markieren und zählen",
	explanation: `
<ul  class="tasks">
<li>Welche Pixel liegen an Land, grenzen aber direkt (nicht diagonal) an ein Meerespixel?</li>
<li>Diese Küstenpixel sollen in einem Overlay auf blau gesetzt werden.</li>
<li>Zusatzaufgabe: Welches Land auf der Karte hat am meisten Küstenpixel?</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Auf die gleiche Art könnte man auch Ländergrenzen markieren.</li>
<li>Oft ist es hilfreich, den Code in einzelne Funktionen zu gliedern.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("africa.json")
overlay = scene.addOverlay("coast")

def isCoast(x, y):
\t# todo: check if pixel is next to ocean pixel
\treturn False

# p: pixel
for p in scene.pixels:
\tif isCoast(p.x, p.y):
\t\t# q: same pixel in overlay
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.b = 255
`,
	templateJS: `const {Scene} = myplanet

scene = await Scene.load("africa.json")
overlay = await scene.addOverlay("coast")

function isCoast(x, y) {
\t// todo: check if pixel is next to ocean pixel
\treturn false
}

//p: pixel
for(let p of scene.pixels) {
\tif(isCoast(p.x, p.y)) {
\t\t//q: same pixel in overlay
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.blue = 255
\t}
}
`,
	solution: `from myplanet import *

scene = Scene.load("africa.json")
overlay = scene.addOverlay("coast")

coastOfCountry = {}

def isOcean(x, y):
\tif not scene.contains(x,y):
\t\treturn False
\tp = scene.getPixel(x, y)
\treturn p.country == 255


def isCoast(x, y):
\tif isOcean(x, y):
\t\treturn False
\treturn (
\t\tisOcean(x+1,y) or
\t\tisOcean(x-1,y) or
\t\tisOcean(x,y+1) or
\t\tisOcean(x,y-1)
\t)

# p: pixel
for p in scene.pixels:
\tif isCoast(p.x, p.y):
\t\t# q: same pixel in overlay
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.blue = 255
\t\tif p.country in coastOfCountry:
\t\t\tcoastOfCountry[p.country] += 1
\t\telse:
\t\t\tcoastOfCountry[p.country] = 1

mostCoastCountry = None
mostCoast = 0
for c in coastOfCountry.keys():
\tif coastOfCountry[c] > mostCoast:
\t\tmostCoast = coastOfCountry[c]
\t\tmostCoastCountry = c

print(mostCoastCountry, mostCoast)
`,
	solutionJS: `const {Scene} = myplanet

const scene = await Scene.load("africa.json")
overlay = await scene.addOverlay("coast")

coastOfCountry = {}

function isOcean(x, y) {
\tif(!scene.contains(x,y)) {
\t\treturn false
\t}
\tp = scene.getPixel(x, y)
\treturn p.country == 255
}

function isCoast(x, y) {
\tif(isOcean(x, y)) {
\t\treturn false
\t}
\treturn (
\t\tisOcean(x+1,y) || 
\t\tisOcean(x-1,y) ||
\t\tisOcean(x,y+1) ||
\t\tisOcean(x,y-1)
\t)
}

//p: pixel
for(let p of scene.pixels) {
\tif(isCoast(p.x, p.y)) {
\t\t//q: same pixel in overlay
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.b = 255
\t\tif(p.country in coastOfCountry) {
\t\t\tcoastOfCountry[p.country] += 1
\t\t}
\t\telse {
\t\t\tcoastOfCountry[p.country] = 1
\t\t}
\t}
}

mostCoastCountry = null
mostCoast = 0
for(let c in coastOfCountry) {
\tif(coastOfCountry[c] > mostCoast) {
\t\tmostCoast = coastOfCountry[c]
\t\tmostCoastCountry = c
\t}
}
print(mostCoastCountry, mostCoast)
`
}