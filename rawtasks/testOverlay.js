export const task = {
	title: "Test Overlay",
	template: `from myplanet import *
\t
scene = Scene.load("centralEurope.json")

overlay = scene.addOverlay()

for p in scene.pixels:
\tif p.country == 40:
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.r = 250
`,
	templateJS: `
const {Scene} = myplanet

scene = await Scene.load("centralEurope.json")

overlay = await scene.addOverlay()

for(let p of scene.pixels) {
\tif(p.country == 40) {
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.r = 250
\t}
}
`
}