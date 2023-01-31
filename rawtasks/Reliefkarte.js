export const task = {
	title: "Reliefkarte",
	subtitle: "Terrain verdeutlichen mittels &lquo;Hillshading&rquo;",
	explanation: `
<p>Zur Verdeutlichung des Reliefs sind Schatteneffekte hilfreich:</p>
<div>
<img class="sketchinvert" style="display: block; max-width: 55%; margin: auto;" src="/img/myplanet/HillshadingExplanation.png">
</div>
<ul  class="tasks">
<li>Es soll für jedes Pixel die Höhendifferenz <dfn>dh</dfn> vom linken zum rechten Nachbarn berechnet werden. Im vorliegenden Beispiel wäre diese...
		<p>...positiv, wenn wir auf der Schattenseite sind.</p>
		<p>...negativ, wenn wir auf der Sonnenseite sind.</p>
		<p>...nahe bei null auf dem Gipfel oder wenn es flach ist.</p>
</li>
<li>Aus dieser Höhendifferenz soll nun ein Faktor berechnet werden: <dfn>f&nbsp;=&nbsp;1&nbsp;-&nbsp;0.015&nbsp;*&nbsp;dh</dfn></li>
<li>Im Overlay soll jeder Farbkanal des Ursprungsbildes mit diesem Faktor multipliziert werden.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Noch genauer wäre es, wenn man für die Helligkeitsänderungen die Trigonometrie berücksichtigt.</li>
<li>Neben den Eigenschatten könnten auch Schlagschatten eingezeichnet werden.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("hillshading.json")
overlay = scene.addOverlay("hillshading")

for p in scene.pixels:
\tdh = 0
\tif 1 <= p.x < scene.W - 1:
\t\tleft = scene.getPixel(p.x - 1, p.y)
\t\t# todo: difference between left and right
\tq = overlay.getPixel(p.x, p.y)
`,
	templateJS: `const {Scene, Collection} = myplanet

scene = await Scene.load("hillshading.json")
overlay = await scene.addOverlay("hillshading")

for (let p of scene.pixels) {
\tdh = 0
\tif(p.x >= 1 && p.x < scene.W - 1) {
\t\tleft = scene.getPixel(p.x - 1, p.y)
\t\t// todo: difference between left and right
\t}
\tq = overlay.getPixel(p.x, p.y)
}`,
	solution: `from myplanet import *

scene = Scene.load("hillshading.json")
overlay = scene.addOverlay("hillshading")

for p in scene.pixels:
\tdh = 0
\tif 1 <= p.x < scene.W - 1:
\t\tleft = scene.getPixel(p.x - 1, p.y)
\t\tright = scene.getPixel(p.x + 1, p.y)
\t\tdh = right.elevation - left.elevation
\tf = 1 - 0.015 * dh
\tq = overlay.getPixel(p.x, p.y)
\tq.red = p.red * f
\tq.green = p.green * f
\tq.blue = p.blue * f
`,
	solutionJS: `const {Scene, Collection} = myplanet

scene = await Scene.load("hillshading.json")
overlay = await scene.addOverlay("hillshading")

for (let p of scene.pixels) {
\tdh = 0
\tif(p.x >= 1 && p.x < scene.W - 1) {
\t\tleft = scene.getPixel(p.x - 1, p.y)
\t\tright = scene.getPixel(p.x + 1, p.y)
\t\tdh = right.elevation - left.elevation
\t}
\tf = 1 - 0.015 * dh
\tq = overlay.getPixel(p.x, p.y)
\tq.red = p.red * f
\tq.green = p.green * f
\tq.blue = p.blue * f
}`
}