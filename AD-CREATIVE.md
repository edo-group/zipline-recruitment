# The Instagram mockup in the hero

The hero shows a phone running the Instagram feed. Inside the post sits the
**complete ad creative, uncropped** — a square image, one per language.

## Two files

| Language | File |
|---|---|
| FR | `creative-fr.jpg` |
| EN | `creative-en.jpg` |

Both `<img class="ig-cr-img">` tags currently point at the same placeholder.
Replace them with the final exports before the campaign runs.

## To swap them in

Save both squares in this folder, then:

```bash
python3 - <<'PY'
import base64, io, pathlib, re
from PIL import Image
def uri(p):
    im = Image.open(p).convert('RGB')
    im = im.resize((640, round(640*im.height/im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=82, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
fr, en = uri('creative-fr.jpg'), uri('creative-en.jpg')
p = pathlib.Path('index.html'); h = p.read_text(encoding='utf-8')
h = re.sub(r'(<img class="ig-cr-img" lang="fr" src=")[^"]*(")', lambda m: m.group(1)+fr+m.group(2), h, count=1)
h = re.sub(r'(<img class="ig-cr-img" lang="en" src=")[^"]*(")', lambda m: m.group(1)+en+m.group(2), h, count=1)
p.write_text(h, encoding='utf-8')
print('done —', round(len(h)/1024), 'KB total')
PY
```

Keep each square under ~60 KB after compression. The page ships as one
self-contained file and most traffic arrives on mobile data.

## Check before launch

Make sure the towns named in the creatives match the towns listed on the page.
If they differ, candidates apply for jobs in the wrong place.

## Privacy

The stories row is abstract blurred circles with blurred name bars. No real
person's photo or handle appears. The post is attributed to `edomatch`.

## Watch out when editing CSS

`.route > svg` is deliberately a direct-child selector. `.route svg` would also
match every icon inside the phone mockup and blow them up to full width.
