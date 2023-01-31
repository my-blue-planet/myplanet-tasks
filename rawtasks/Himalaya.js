export const task = {
	title: "Himalaya",
	subtitle: "Pixel finden und zählen",
	explanation: `<p>Das Beispiel zeigt, wie ein Datensatz geladen wird. Dieser Datensatz enthält ausschliesslich Höhendaten.</p>
<ul  class="tasks">
<li>Eine Zählervariable <dfn>count</dfn> soll am Ende anzeigen, wie viele Pixel sich auf 8000 m oder mehr befinden.
<li>Eine Variable <dfn>peak</dfn> soll am Ende anzeigen, wie hoch der höchste Punkt liegt.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Das Zählen von Pixeln, die eine bestimmte Bedingung erfüllen, wird in verschiedensten Bereichen nützlich sein, z.B. Wie viele Quadratmeter leiden unter Trockenheit?</li>
<li>Das Finden des höchtsen Wertes in einem Datensatz hat ebenfalls viele Anwendungsbereiche, z.B. Wo in einer Stadt ist die Stickoxidbelastung am höchsten?</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("himalaya.json")

W = scene.getWidth()
H = scene.getHeight()

print("Scene: ", W, "x", H)

for pixel in scene.pixels:
\tif pixel.elevation >= 8000:
\t\tprint(pixel)
`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("himalaya.json")

W = scene.getWidth()
H = scene.getHeight()

print("Grösse in Pixeln: ", W, "x", H)

for(let pixel of scene.pixels) {
\tif (pixel.elevation >= 8000) {
\t\tprint(pixel)
\t}
}

`,
	solution: `from myplanet import *

scene = Scene.load("himalaya.json")

W = scene.getWidth()
H = scene.getHeight()

print("Scene: ", W, "x", H)

count = 0
peak = 0

for pixel in scene.pixels:
\tif pixel.elevation >= 8000:
\t\tcount += 1
\tif pixel.elevation > peak:
\t\tpeak = pixel.elevation

print(count, " pixels above 8000 m")
print("Height of highest peak: ", peak)
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