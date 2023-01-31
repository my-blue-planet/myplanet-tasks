export const task = {
	title: "Korea",
	subtitle: "Gebiete vergleichen",
	explanation: `<p>Die Grenze zwischen Nord- und Südkorea ist im Kanal <dfn>night</dfn> deutlich zu erkennen.</p>
<ul  class="tasks">
<li>Für beide Länder sollen die Fläche, Bevölkerung und nächtliche Beleuchtung aufsummiert werden.</li>
<li>Anschliessend soll die nächtliche Beleuchtung (in Watt) auch pro km² und pro Kopf angegeben werden.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Auf die gleiche Art können weitere Vergleiche (NOx) gemacht werden.</li>
<li>Das Anzeigen der Ländergrenzen als Overlay wäre eine sinnvolle Ergänzung.</li>
</ul>`,

	template: `from myplanet import *
scene = Scene.load("korea.json")

area_s = 0
people_s = 0
nightlights_s = 0
area_n = 0
people_n = 0
nightlights_n = 0

for p in scene.pixels:
\tarea_in_km2 = (p.size / 1000)**2
\t# todo: if country == ...

print("Nordkorea")
print(round(area_n), "km²")
print(round(people_n), " 👪")
print(round(nightlights_n), " W")
print("-----------")
print("Südkorea")
print(round(area_s), "km²")
print(round(people_s), " 👪")
print(round(nightlights_s), " W")

# ToDo: Watt/km² and Watt/👪
`,
	templateJS: `const {Scene} = myplanet
const scene = await Scene.load("korea.json")

area_s = 0
people_s = 0
nightlights_s = 0
area_n = 0
people_n = 0
nightlights_n = 0

for(let p of scene.pixels) {
\tarea_in_km2 = (p.size / 1000)**2
\t// ToDo: if(country == ...)
}

round = Math.round

print("Nordkorea")
print(round(area_n), "km²")
print(round(people_n), " 👪")
print(round(nightlights_n), " W")

print("-----------")
print("Südkorea")
print(round(area_s), "km²")
print(round(people_s), " 👪")
print(round(nightlights_s), " W")

// ToDo: Watt/km² and Watt/👪
`,
	solution: `from myplanet import *

scene = Scene.load("korea.json")
overlay = scene.addOverlay("borders")

area_s = 0
people_s = 0
nightlights_s = 0
area_n = 0
people_n = 0
nightlights_n = 0

def isBorderPixel(pixel, country):
\tif p.country == country:
\t\tfor n in p.getNeighbours():
\t\t\tif n.country != country:
\t\t\t\treturn True
\treturn False

for p in scene.pixels:
\tarea_in_km2 = (p.size / 1000)**2
\tq = overlay.getPixel(p.x, p.y)
\tif p.country == 184:
\t\tarea_n += area_in_km2
\t\tpeople_n += p.pop * area_in_km2
\t\tnightlights_n += p.night * area_in_km2
\tif p.country == 125:
\t\tarea_s += area_in_km2
\t\tpeople_s += p.pop * area_in_km2
\t\tnightlights_s += p.night * area_in_km2
\tif isBorderPixel(p, 184):
\t\tq.red = 200
\tif isBorderPixel(p, 125):
\t\tq.blue = 200
\t\t

print("Nordkorea")
print(round(area_n), "km²")
print(round(people_n), " 👪")
print(round(nightlights_n), " W")
print(round(nightlights_n/people_n, 3), " W/👪")
print(round(nightlights_n/area_n), " W/km²")
print("-----------")
print("Südkorea")
print(round(area_s), "km²")
print(round(people_s), " 👪")
print(round(nightlights_s), " W")
print(round(nightlights_s/people_s, 3), " W/👪")
print(round(nightlights_s/area_s), " W/km²")
`,
	solutionJS: `const {Scene} = myplanet
const scene = await Scene.load("korea.json")

area_s = 0
people_s = 0
nightlights_s = 0
area_n = 0
people_n = 0
nightlights_n = 0

for(let p of scene.pixels) {
\tarea_in_km2 = (p.size / 1000)**2
\tif(p.country == 184) {
\t\tarea_n += area_in_km2
\t\tpeople_n += p.pop * area_in_km2
\t\tnightlights_n += p.night * area_in_km2
\t}
\tif(p.country == 125) {
\t\tarea_s += area_in_km2
\t\tpeople_s += p.pop * area_in_km2
\t\tnightlights_s += p.night * area_in_km2
\t}
}

round = Math.round

print("Nordkorea")
print(round(area_n), "km²")
print(round(people_n), " 👪")
print(round(nightlights_n), " W")
print((nightlights_n/people_n).toFixed(3), " W/👪")
print(round(nightlights_n/area_n), " W/km²")
print("-----------")
print("Südkorea")
print(round(area_s), "km²")
print(round(people_s), " 👪")
print(round(nightlights_s), " W")
print((nightlights_s/people_s).toFixed(3), " W/👪")
print(round(nightlights_s/area_s), " W/km²")
`
}


/* more object oriented solution:
from myplanet import *

scene = Scene.load("korea.json")
overlay = scene.addOverlay("borders")

class CountryStats:
	def __init__(self, countryCode):
		self.area = 0.0
		self.nightlights = 0.0
		self.people = 0.0
		self.country = countryCode

	def handlePixel(self, pixel):
		if pixel.country == self.country:
			self.updateStats(pixel)
			self.markBorder(pixel)

	def updateStats(self, pixel):
		area = (pixel.size / 1000)**2 # in mk2
		self.area += area
		self.people += pixel.pop * area
		self.nightlights += pixel.night * area

	def isBorder(self, pixel):
		for n in pixel.getNeighbours():
			if n.country != self.country:
				return True
		return False

	def markBorder(self, pixel):
		if self.isBorder(pixel):
			q = overlay.getPixel(pixel.x, pixel.y)
			if self.country == 125:
				q.blue = 200
			else:
				q.red = 200

	def renderStats(self, name):
		print(name)
		print(round(self.area), "km²")
		print(round(self.people), " 👪")
		print(round(self.nightlights), " W")
		wattPerPerson = self.nightlights/self.people
		print(round(wattPerPerson, 3), " W/👪")
		wattPerKm2 = self.nightlights/self.area
		print(round(wattPerKm2), " W/km²")
		print("-----------")

southKorea = CountryStats(125)
northKorea = CountryStats(184)

for pixel in scene.pixels:
	northKorea.handlePixel(pixel)
	southKorea.handlePixel(pixel)

northKorea.renderStats("Nordkorea")
southKorea.renderStats("Südkorea")
 */