export const task = {
	title: "Schneemangel",
	subtitle: "Höhenstufen markieren",
	explanation: `<p>Die mittlere Schneefallgrenze werde im Zuge des Klimawandels immer weiter ansteigen,
sagt der Meteorologe Jürg Marquardt und wagt eine düstere Prognose: «Skigebiete zwischen 1000 und 1500 Metern
über Meer haben keine Zukunft.»</p>
<div class="linkbox">
	<img style="width: 25%;" src="/img/myplanet/schneemangel.webp">
	<a href="https://www.watson.ch/schweiz/winter/684955514-diese-schweizer-skigebiete-sind-dem-tod-geweiht">
		Diese Skigebiete sind dem Tod geweiht (Watson, 09.01.2023)
	</a>
</div>
<ul  class="tasks">
<li>Wo liegen die Gebiete in der Schweiz, welche zwischen 1000 und 1500 m über Meer liegen?</li>
<li>Wie viele % der Landesfläche sind das?</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>In den weiteren Kapiteln gibt es ähnliche Fragen zum Ausprobieren und Erforschen.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("switzerlandLarge.json")
overlay = scene.addOverlay("1000 m - 1500 m")

for pixel in scene.pixels:

\tif pixel.country == 40:

\t\t# same pixel in overlay
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t\tq.blue = 150
\t\tq.alpha = 30
`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("switzerlandLarge.json")
overlay = await scene.addOverlay("1000 m - 1500 m")

for(let pixel of scene.pixels) {

\tif (pixel.country == 40) {
\t\t// same pixel in overlay
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t\tq.blue = 150
\t\tq.alpha = 30
\t}
}
`,
	solution: `from myplanet import *

scene = Scene.load("switzerlandLarge.json")
overlay = scene.addOverlay("1000 m - 1500 m")

targetArea = 0
swissArea = 0

for pixel in scene.pixels:

\tif pixel.country == 40:

\t\t# same pixel in overlay
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t\t
\t\tareaInKm2 = pixel.size ** 2 / 1000000
\t\t
\t\tif pixel.h > 1000 and pixel.h <= 1500:
\t\t\tq.red = 255
\t\t\tq.green = 80
\t\t\tq.alpha = 120
\t\t\ttargetArea += areaInKm2
\t\t\t
\t\tswissArea += areaInKm2

print(targetArea, swissArea)
print(targetArea / swissArea * 100, "%")
`,
	solutionJS: `const {Scene} = myplanet

const scene = await Scene.load("switzerlandLarge.json")
overlay = await scene.addOverlay("1000 m - 1500 m")

targetArea = 0
swissArea = 0

for(let pixel of scene.pixels) {

\tif (pixel.country == 40) {

\t\t// same pixel in overlay
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t\tq.blue = 150
\t\tareaInKm2 = pixel.size ** 2 / 1000000
\t\t
\t\tif(pixel.h > 1000 && pixel.h <= 1500) {
\t\t\tq.red = 255
\t\t\tq.blue = 0
\t\t\tq.alpha = 120
\t\t\ttargetArea += pixel.getAreaInKm2()
\t\t}
\t\t
\t\tswissArea += pixel.getAreaInKm2()
\t}
}

print(targetArea, swissArea)
print(targetArea/swissArea*100, "%")
`
}