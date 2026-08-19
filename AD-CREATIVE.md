# Swapping the Instagram ad creative

The hero shows a phone mockup with the Instagram ad inside it, so a candidate
arriving from Meta recognises the creative they just tapped.

The ad image is **inlined in `index.html`** as base64. `ig-ad.jpg` in this folder
is the source copy and is *not* loaded at runtime.

## Current placeholder

The mockup currently shows the **English** creative ("I save lives with a drone."),
because that is the only creative saved on disk. The French creative
("Vous cherchez du travail ?") is the one that will actually run in Côte d'Ivoire
and should replace it before launch.

## To swap it in

1. Save the French creative in this folder as `ig-ad.jpg` (square, 1:1).
2. Re-inline it:

```bash
python3 - <<'PY'
import base64, io, pathlib, re
from PIL import Image
im = Image.open('ig-ad.jpg').convert('RGB')
s = min(im.size)
im = im.crop(((im.width-s)//2, (im.height-s)//2, (im.width-s)//2+s, (im.height-s)//2+s))
im = im.resize((640, 640), Image.LANCZOS)
buf = io.BytesIO(); im.save(buf, 'JPEG', quality=80, optimize=True, progressive=True)
uri = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
p = pathlib.Path('index.html'); h = p.read_text(encoding='utf-8')
h = re.sub(r'(<img class="ig-media" src=")[^"]*(")', lambda m: m.group(1)+uri+m.group(2), h, count=1)
p.write_text(h, encoding='utf-8')
print('done —', round(len(h)/1024), 'KB total')
PY
```

3. Also update the caption text under the post if the ad's wording changed —
   search `class="ig-cap"` in `index.html`.

Keep the creative square and under ~60 KB after compression; the page is served
as one self-contained file and the Meta traffic lands on mobile data.
