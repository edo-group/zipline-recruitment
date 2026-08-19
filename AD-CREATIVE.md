# The Instagram mockup in the hero

The hero shows a phone running the Instagram feed, matching the real screenshot:
status bar, Instagram wordmark, stories row, the sponsored post, action icons,
caption and bottom nav.

## The ad creative is HTML, not an image

The creative inside the post is **composed in HTML/CSS**, not a flat picture.
That means it switches language with the rest of the page automatically:

| | FR | EN |
|---|---|---|
| Headline | Nous **recrutons !** | We are **hiring!** |
| Sub | 6 metiers. Aucune experience requise — nous vous formons. | 6 jobs. No experience needed — we train you. |
| Button | Postulez maintenant | Apply now |
| Footer | Cliquez sur le lien pour les JOBS ! | Click the link for the JOBS! |

To edit the wording, search `ig-cr-h`, `ig-cr-sub`, `ig-cr-btn`, `ig-cr-foot`
in `index.html` and change both the `lang="fr"` and `lang="en"` halves.

Only the photo band is a real image (`cr-photo.jpg`, inlined as base64) — a
text-free frame cropped from the ad screenshot.

## Privacy

The stories row shows abstract blurred circles and blurred name bars. No real
person's photo or handle appears. The post is attributed to `edomatch`
(the ad account), not a personal handle.

## Watch out when editing CSS

`.route > svg` is deliberately a direct-child selector. Using `.route svg`
would also match every icon inside the phone mockup and blow them up to
full width.
