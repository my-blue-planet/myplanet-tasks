export const task = {
	title: "Playground",
	template: `from myplanet import *

___SCENEORCOLLECTION___ = ___SCENEORCOLLECTIONCLASS___.load("___TEMPLATE___.json")

print(scene.W, scene.H)

overlay = ___SCENEORCOLLECTION___.addOverlay()

for p in overlay.pixels:
\tif p.x < 1 and p.y < 1:
\t\tprint("Do something...")
`,
	templateJS: `const {Scene, Collection} = myplanet

___SCENEORCOLLECTION___ = await ___SCENEORCOLLECTIONCLASS___.load("___TEMPLATE___.json")

print(scene.W, scene.H)

overlay = ___SCENEORCOLLECTION___.addOverlay()

for(let p of overlay.pixels) {
\tif (p.x < 1 && p.y < 1) {
\t\tprint("Do something...")
\t}
}	
`
}