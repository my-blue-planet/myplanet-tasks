export const task = {
	title: "Bern",
	subtitle: "Grünflächen suchen",
	explanation: `<p>Wo in der Stadt Bern gibt es wie viele Grünflächen?</p>
<ul  class="tasks">
<li>Für jeden Pixel soll ein Wert <dfn>greenScore</dfn> berechnet werden: Dieser entspreche dem Grünwert minus dem Blauwert und dem Rotwert.
</li>
<li>Im Overlay soll dann bei jedem Pixel der Grünkanal auf 255 und der Alphakanal (Deckkraft) auf das Fünffache von 
<dfn>greenScore</dfn> gesetzt werden.</li>
<li>Nun kann man das Overlay ein- und ausblenden.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Das Erzeugen eines Mischbildes aus verschiedenen Kanälen heisst <i>Komposit</i>.</li>
<li>Mit Hilfe von infrarotem Licht wären noch aussagekräftigere Kompositbilder für Vegetation möglich. Damit könnte man sogar vom Weltall aus Kunstrasen von Naturrasen unterscheiden!</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("bern.json")
overlay = scene.addOverlay("greenScore")

# p: pixel
for p in scene.pixels:
\t
\t#TODO: calculate green score
\t
\t# q: pixel in overlay (same position)
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 20
`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("bern.json")
overlay = await scene.addOverlay("greenScore")

//p: pixel
for(let p of scene.pixels) {
\t
\t//TODO: calculate green score
\t
\t//q: pixel in overlay (same position)
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 20
}

`,
	solution: `from myplanet import *

scene = Scene.load("bern.json")
overlay = scene.addOverlay("greenScore")

# p: pixel
for p in scene.pixels:
\t
\tgreenScore = p.green - p.red - p.blue
\t
\t# q: pixel in overlay (same position)
\tq = overlay.getPixel(p.x, p.y)
\tq.green= 255
\tq.alpha = 5 * greenScore
`,
	solutionJS: `const {Scene} = myplanet

const scene = await Scene.load("bern.json")
overlay = await scene.addOverlay("greenScore")

//p: pixel
for(let p of scene.pixels) {
\tgreenScore = p.green - p.blue - p.red
\t
\t//q: pixel in overlay (same position)
\tq = overlay.getPixel(p.x, p.y)
\tq.green = 255
\tq.alpha = 5 * greenScore
}
`
}