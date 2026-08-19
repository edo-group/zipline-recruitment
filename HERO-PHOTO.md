# Hero photo

The hero photo **is already embedded** in `index.html` as an inlined base64 JPEG
(~100 KB), so the page stays a single self-contained file with no external requests.

`hero.jpg` in this folder is the source image, kept for future edits. It is **not**
loaded at runtime — editing it alone changes nothing on the page.

## Where it came from

Cropped from the Meta ad creative (the region clear of the headline, CTA and logo
overlays), upscaled 2x and sharpened. It's deliberately the same person and scene as
the ad so a candidate who taps through recognises where they landed.

## Replacing it with a higher-quality original

1. Drop the new image in this folder as `hero.jpg`.
2. Re-inline it:

```bash
python3 - <<'PY'
import base64, pathlib, re
uri = 'data:image/jpeg;base64,' + base64.b64encode(pathlib.Path('hero.jpg').read_bytes()).decode()
p = pathlib.Path('index.html')
h = p.read_text(encoding='utf-8')
h = re.sub(r'(<img class="route-photo" src=")[^"]*(")', lambda m: m.group(1) + uri + m.group(2), h, count=1)
p.write_text(h, encoding='utf-8')
print('done —', round(len(h)/1024), 'KB total')
PY
```

3. Keep it around 1400px on the long edge and under ~150 KB. The Meta ad traffic
   lands on mobile data, so page weight costs you applications.

The `.route-photo` CSS handles framing (4:5 portrait on mobile, 3:4 on desktop,
`object-position: 50% 22%` to keep her face centred).
