export const task = {
	title: "Test Overlay",
	template: `from myplanet import *

coll = Collection.load("timelapse-amazonas.json")

overlay = coll.addOverlay()

for scene in coll.scenes:
\tcoll.forceFrame(scene)
\tdarkest = 255
\tbrightest = 0
\tfor p in scene.pixels:
\t\tb = (p.r + p.g + p.b) / 3
\t\tif b > brightest:
\t\t\tbrightest = b
\t\tif b < darkest:
\t\t\tdarkest = b

\tcomp = 0.8*(brightest + darkest)/2

\tfor p in scene.pixels:
\t\tb = (p.r + p.g + p.b) / 3
\t\tif b > comp:
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif int(scene.label) < 2000:
\t\t\t\tq.g = 255
\t\t\tq.r = 255
\t\t\tq.a = 50
`,
	templateJS: `const {Scene, Collection} = myplanet

coll = await Collection.load("timelapse-amazonas.json")

overlay = await coll.addOverlay()

for(let scene of coll.scenes) {
\tcoll.forceFrame(scene)
\tdarkest = 255
\tbrightest = 0
\tfor(let p of scene.pixels) {
\t\tb = (p.r + p.g + p.b) / 3
\t\tif(b > brightest) {
\t\t\tbrightest = b
\t\t}
\t\tif(b < darkest) {
\t\t\tdarkest = b
\t\t}
\t}
\tfor(let p of scene.pixels) {
\t\tb = (p.r + p.g + p.b) / 3
\t\tif(b > 0.8*(brightest + darkest)/2) {
\t\t\tq = overlay.getPixel(p.x, p.y)
\t\t\tif(Number(scene.label) < 2000) {
\t\t\t\tq.g = 255
\t\t\t}
\t\t\tq.r = 255
\t\t\tq.a = 50
\t\t}
\t}
}
`
}