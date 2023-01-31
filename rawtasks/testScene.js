export const task = {
	title: "Test Scene (Switzerland)",
	template: `from myplanet import *

scene = Scene.load("switzerland.json")

print(scene.W, scene.H)
print(scene.getDimensions())

print(scene.metersPerPixel(0,0))
q = scene.getPixel(0, scene.H-1)
print(q.sizeInMeters())

for x in range(scene.W):
\tfor y in range(scene.H):
\t\tif x == y:
\t\t\tscene.setChannelAt("r", x, y, 255)

for p in scene.pixels:
\tif 1500 > p.elevation > 1000:
\t\tp.b = 255

`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("switzerland.json")

print(scene.W, scene.H)
print(scene.getDimensions())

print(scene.metersPerPixel(0,0))
q = scene.getPixel(0, scene.H-1)
print(q.sizeInMeters())

for(let x = 0; x < scene.W; x++) {
\tfor(let y = 0; y < scene.H; y++) {
\t\tif(x == y) {
\t\t\tscene.setChannelAt("r", x, y, 255)
\t\t}
\t}
}

for(let p of scene.pixels) {
\tif(p.elevation > 1000 && p.elevation < 1500) {
\t\tp.b = 255
\t}
}	
`
}