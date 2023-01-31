export const task = {
	title: "Nachthimmel",
	subtitle: "Durschnitt aus der Umgebung",
	explanation: `<p>Welche Orte sind zur Beobachtung des Nachthimmels besonders geeignet?
Dazu soll die Helligkeit des Pixels (im Kanal <dfn>night</dfn>) mit derjenigen seiner Nachbarpixel vermischt werden.
Je weiter weg der Nachbar ist, desto geringer soll sein Einfluss sein. Dies kann z.B. mit folgender Gewichtung erreicht werden:</p>
<div><img class="sketchinvert" src="/img/myplanet/FilterExplanation.png"></div>
<ul  class="tasks">
<li>Warum teilt man das Ergebnis der gewichteten Summe  durch 16?</li>
<li>Berechnen Sie für jeden Pixel der Schweiz diese gewichtete Summe <dfn>sum</dfn>.</li>
<li>Stellen Sie das Ergebnis im Overlay dar, indem Sie z.B. den Blaukanal auf <dfn>255 - sum</dfn> setzen.</li>
<li>Noch deutlicher wird es, wenn man den Grünkanal zudem auf <dfn>255 - 5*sum</dfn> setzt.</li>
<li>In einem weiteren Overlay können Sie nun eine Markierung bei allen Punkten setzen, welche die niedrigste summierte Gesamthelligkeit haben.</li>
</ul>
<h4>Ausblick</h4>
<ul>
<li>Solche Filter können auch eingesetzt werden, um ein verpixeltes Bild zu glätten.</li>
</ul>`,

	template: `from myplanet import *

scene = Scene.load("switzerland.json")
overlay = scene.addOverlay("night")

for p in scene.pixels:
\tif p.country == 40:
\t\tq = overlay.getPixel(p.x, p.y)`,
	templateJS: `const {Scene} = myplanet

const scene = await Scene.load("switzerland.json")
overlay = await scene.addOverlay()

overlay.addMarker(100, 200)

for(let pixel of scene.pixels) {
\tif (pixel.country == 40) {
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t}
}

`,
	solution: `from myplanet import *

scene = Scene.load("switzerland.json")
overlay = scene.addOverlay("night")

def getNight(x,y):
\tp = scene.getPixel(x, y)
\treturn p.night

def getNightOfArea(pixel):
\tsum = 0
\tx = pixel.x
\ty = pixel.y
\tsum += 4 * getNight(x, y)
\tsum += 2 * getNight(x+1, y)
\tsum += 2 * getNight(x-1, y)
\tsum += 2 * getNight(x, y+1)
\tsum += 2 * getNight(x, y-1)
\tsum += 1 * getNight(x+1, y-1)
\tsum += 1 * getNight(x+1, y+1)
\tsum += 1 * getNight(x-1, y-1)
\tsum += 1 * getNight(x-1, y+1)
\treturn sum / 16

darkest = 999999
darkest_pixel = None

for p in scene.pixels:
\tif p.country == 40:
\t\tsum = getNightOfArea(p)
\t\tif sum < darkest:
\t\t\tdarkest = sum
\t\t\tdarkest_pixel = p
\t\tq = overlay.getPixel(p.x, p.y)
\t\tq.blue = 255 - sum
\t\tq.green = 255 - 5 * sum

print(darkest_pixel.x, darkest_pixel.y)
print(darkest)

darkspots = scene.addOverlay("darkspots")
for p in scene.pixels:
\tif p.country == 40:
\t\tsum = getNightOfArea(p)
\t\tif sum == darkest:
\t\t\tdarkspots.addMarker(p.x, p.y)`,
	solutionJS: `const {Scene} = myplanet

scene = await Scene.load("switzerland.json")
overlay = await scene.addOverlay("night")

function getNight(x,y){
\tp = scene.getPixel(x, y)
\treturn p.night
}

function getNightOfArea(pixel) {
\tsum = 0
\tx = pixel.x
\ty = pixel.y
\tsum += 4 * getNight(x, y)
\tsum += 2 * getNight(x+1, y)
\tsum += 2 * getNight(x-1, y)
\tsum += 2 * getNight(x, y+1)
\tsum += 2 * getNight(x, y-1)
\tsum += 1 * getNight(x+1, y-1)
\tsum += 1 * getNight(x+1, y+1)
\tsum += 1 * getNight(x-1, y-1)
\tsum += 1 * getNight(x-1, y+1)
\treturn sum / 16
}

darkest = 999999
darkest_pixel = null

for(let pixel of scene.pixels) {
\tif(pixel.country == 40) {
\t\tsum = getNightOfArea(pixel)
\t\tif(sum < darkest) {
\t\t\tdarkest = sum
\t\t\tdarkest_pixel = pixel
\t\t}
\t\tq = overlay.getPixel(pixel.x,pixel.y)
\t\tq.blue = 255-sum
\t\tq.green = 255-5*sum
\t}
}

print(darkest_pixel.x, darkest_pixel.y)
print(darkest)

darkspots = await scene.addOverlay("darkspots")
for(let pixel of scene.pixels) {
\tif(pixel.country == 40) {
\t\tsum = getNightArea(pixel)
\t\tif(sum == darkest) {
\t\t\tdarkspots.addMarker(pixel.x, pixel.y)
\t\t}
\t}
}
`
}