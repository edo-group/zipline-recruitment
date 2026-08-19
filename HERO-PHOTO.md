# Adding the hero photo

The hero has a slot for the photo of the Zipline operator with the tablet.
It's not embedded yet because the image was pasted into chat rather than saved to disk.

## To add it

1. Save the image into this folder as `hero.jpg` (or `.png`).
2. Base64-encode it and inline it (keeps the page a single self-contained file):

```bash
python3 - <<'PY'
import base64, pathlib
img = pathlib.Path('hero.jpg').read_bytes()
uri = 'data:image/jpeg;base64,' + base64.b64encode(img).decode()
p = pathlib.Path('index.html')
h = p.read_text(encoding='utf-8')
tag = f'<img class="route-photo" src="{uri}" alt="Opératrice Zipline sur un hub en Côte d\'Ivoire">'
h = h.replace('<p class="route-lbl">', tag + '\n      <p class="route-lbl">', 1)
p.write_text(h, encoding='utf-8')
print('done —', round(len(h)/1024), 'KB')
PY
```

3. Resize to ~1400px wide and compress first — keep the page under ~400KB so it
   loads fast on mobile data, which is where the Meta ad traffic lands.

The `.route-photo` CSS class is already defined (16:9, rounded, object-fit cover).
