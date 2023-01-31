export const task = {
	title: "Eigene Ideen",
	subtitle: "Weitere Fragestellungen untersuchen",
	explanation: `
<p>Nun ist es Zeit, eigene Fragestellungen zu untersuchen.
Hier gibt es einige vorgefertigte <dfn>Scenes</dfn> zum Laden:
</p>
<ul>
<li><dfn>centralEurope.json</dfn></li>
<li><dfn>usaLarge.json</dfn></li>
<li><dfn>world60to60.json</dfn></li>
<li><dfn>burgdorf.json</dfn></li>
</ul>
<p>Eigene Szenarien können <a href="./channelloader.html" title="Eigene Szenarien erstellen">hier</a> erstellt werden.</p>
`,

	template: `from myplanet import *

scene = Scene.load("centralEurope.json")
overlay = scene.addOverlay()

print(scene.W, scene.H)

for p in scene.pixels:
\t# do something
\tpass
`,
	templateJS: `const {Scene, Collection} = myplanet

scene = await Scene.load("centralEurope.json")
overlay = await scene.addOverlay()

print(scene.W, scene.H)

for(let p of scene.pixels) {
\t//do something
}	
`
}