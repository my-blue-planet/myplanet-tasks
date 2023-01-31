export const task = {
	title: "Vulkan",
	subtitle: "Entfernungen eintragen",
	explanation: `
<p>Mit <dfn>scene.getPixelSize()</dfn> kann die Seitenlänge eines Pixels angezeigt werden.</p>
<ul  class="tasks">
<li>Es sollen (in einem Overlay) alle Pixel rot markiert werden (<dfn>pixel.red&nbsp;=&nbsp;255</dfn>
mit einer Deckkraft von <dfn>pixel.alpha&nbsp;=&nbsp;50</dfn>), 
welche näher als 4000 m beim Vesuv liegen.</li>
<li>Wenn die Pixel näher als 2000 m beim Vesuv sind, soll zudem der Grünkanal auf <dfn>200</dfn> gesetzt werden, damit eine gelb-oranger Kreis entsteht.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Auf ähnliche Weise könnten auch die Reichweite von Mobilfunksendern oder die Auswirkungen von Katastophen (Chemieunfall, Explosionen) eingezeichnet werden.</li>
<li>Wie später gezeigt wird, haben bei grossräumigeren Kartenausschnitten je nach Projektion nicht alle Pixel die gleiche Grösse.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("vesuv.json")
overlay = scene.addOverlay("danger")

vesuv = scene.getPixel(275, 303)
overlay.addMarker(vesuv.x, vesuv.y)

scale = scene.getPixelSize()
print("1 px: ", round(scale, 2), " m")

for p in scene.pixels:
\tdx = p.x - vesuv.x
\tdy = p.y - vesuv.y
`,
	templateJS: `const {Scene} = myplanet

scene = await Scene.load("vesuv.json")
overlay = await scene.addOverlay("danger")

vesuv = scene.getPixel(275, 303)
overlay.addMarker(vesuv.x, vesuv.y)

scale = scene.getPixelSize()
print("1 px: ", scale.toFixed(2), " m")

for(let p of scene.pixels) {
\tdx = p.x - vesuv.x
\tdy = p.y - vesuv.y
}
`,
	solution: `from myplanet import *

scene = Scene.load("vesuv.json")
overlay = scene.addOverlay("danger")

vesuv = scene.getPixel(275, 303)
overlay.addMarker(vesuv.x, vesuv.y)

scale = scene.getPixelSize()
print("1 px: ", round(scale, 2), " m")

for p in scene.pixels:
\tdx = p.x - vesuv.x
\tdy = p.y - vesuv.y
\trPx = (dx**2 + dy**2)**0.5
\tr = scale * rPx 
\tif r < 4000:
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.red = 255
\t\tq.alpha = 50
\t\tif r < 2000:
\t\t\tq.green = 200
`,
	solutionJS: `const {Scene} = myplanet

scene = await Scene.load("vesuv.json")
overlay = await scene.addOverlay("danger")

vesuv = scene.getPixel(275, 303)

overlay.addMarker(vesuv.x, vesuv.y)

scale = scene.getPixelSize()
print("1 px: ", scale.toFixed(2), " m")

for(let p of scene.pixels) {
\tdx = p.x - vesuv.x
\tdy = p.y - vesuv.y
\trPx = (dx**2 + dy**2)**0.5
\tr = scale * rPx 
\tif(r < 4000) {
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.red = 255
\t\tq.alpha = 50
\t\tif(r < 2000) {
\t\t\tq.green = 200
\t\t}
\t}
}`
}