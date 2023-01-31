export const task = {
	title: "Höhenkarte",
	template: `
#height	
from SimpleImage import *
scene = Scene("switzerland.json")
print(scene.W, scene.H)
for x in range(scene.W):
\tfor y in range(scene.H):
\t\tscene.setColorAt(x, y, [30, 60, 90])
`,
	templateJS: `
//highest Mountain v1
const {Scene} = myplanet

const scene = await Scene.load("switzerland.json")

for(let p of scene.getPixels()) {
\tif(p.x === p.y) {
\t\tscene.setColorAt(p.x, p.y, [255, 0, 0])
\t}
}	
`
}