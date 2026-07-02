# Hall's Balls & Exotics Pet Emporium — Website

A single-page, **dark-carnival** themed marketing site for Hall's Balls & Exotics Pet Emporium LLC — a family-owned shop in Martinez, GA (Marketplace West, Columbia County) run by Tony & Tiffany Hall, specializing in ball pythons, crested geckos, reptiles, and exotics.

Styled to match the brand art: **ICP-inspired neon** — toxic green + electric purple + magenta neon on a black brick wall, with the clown/jack-in-the-box logo featured in the hero.

No build step. No dependencies. Just open it.

## Run it

```bash
# simplest: open the file
xdg-open index.html        # Linux
# or serve it (recommended so fonts/anchors behave)
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files

| File | What it is |
|------|-----------|
| `index.html` | All page content & structure |
| `styles.css` | The full dark-carnival theme |
| `script.js`  | Animal roster, filters, reveals, forms |
| `img/logo.*` | **Featured hero image** — the clown + snake + neon-sign artwork (logo-A) |
| `img/header-logo-desktop.png` | **Desktop header** — the wide Hall's Balls & Exotics wordmark |
| `img/header-logo.*` | **Mobile header** — the round HB snake emblem |
| `img/logo-b.*` | **Footer** — the stacked neon wordmark lockup (logo-B) |
| `img/owners.*` | **Our Story** — photo of the owners outside the storefront |
| `img/favicon.png` | Browser-tab icon |
| `design/` | Source artwork — original opaque exports + transparent masters (**not served**) |

The main logo variants ship as both `.webp` (small) and `.png` (fallback), served via `<picture>`.

## Sections

Hero → Ticker → **The Menagerie** (filterable livestock) → Supplies & Feeders → Our Story → Care Grimoire → Testimonials → Visit + Contact → Newsletter → Footer.

## What's still placeholder (search for these)

Real business details (owners, "since 2019", address, phone, Ball Python/Crested Gecko focus, The Chipper substrate) are pulled from the [Columbia County CVB listing](https://www.visitcolumbiacountyga.com/listing/halls-balls-%26-exotics-pet-emporium/829/) and the [Show Me Reptile Show vendor spotlight](https://showmereptileshow.com/resources/vendor-spotlight-halls-balls--exotics). Still to fill in:

- **Hours** — the Visit ticket currently says "hours vary — call ahead" (search `Hours vary`). Drop in real opening hours when known.
- **Livestock** — the `BEASTS` array in `script.js` is *sample* stock. Replace with real available animals + prices. Each entry has `name`, `cat` (`python`/`lizard`/`serpent`/`oddity`), `emoji`, `price`, `level`, `blurb`. Swap emoji art for real photos if you like (see below).
- **Testimonials** — the "Tales from Our Keepers" quotes are placeholders; swap in real Facebook reviews.

### Using real animal photos instead of emoji

In `script.js`, the `beast-art` block renders an emoji over a gradient. To use photos, drop images in an `img/` folder and change `cardHTML()` to output an `<img>` inside `.beast-art`.

## Forms

The contact and newsletter forms are **front-end only** — they validate and show a confirmation but don't send anywhere yet. To make them live, wire the submit handlers in `script.js` (marked with `TODO`) to a service like [Formspree](https://formspree.io), [Netlify Forms](https://docs.netlify.com/forms/setup/), or your own endpoint.

## Deploy

Drag the folder into **Netlify**, or push to a repo and enable **GitHub Pages** / **Cloudflare Pages**. It's a static site — any host works.

## Notes

- Fonts load from Google Fonts (Bungee for signage headings, Creepster for horror-carnival accents, Pacifico for the neon script line, Barlow for body). An internet connection renders them; offline falls back to system fonts.
- Palette lives in CSS custom properties at the top of `styles.css` (`--green`, `--purple`, `--magenta`, etc.) — retune the whole site from there.
- **Four logos are in play:** the clown/snake artwork (`img/logo.*`) is the featured hero image; the wide wordmark (`img/header-logo-desktop.png`) is the desktop header logo; the round HB snake emblem (`img/header-logo.*`) is the mobile header logo; and the footer uses the stacked wordmark (`img/logo-b.*`). To swap any logo, replace the matching `img/` files at similar dimensions.
- The palette is tuned to the logo: magenta `--magenta`, toxic green `--green`, electric purple `--purple`. Change them in `styles.css` to re-tint everything.
- The brick wall is an inline SVG data-URI background — no separate image request.
- Respects `prefers-reduced-motion` — animations calm down for users who ask for it.
- Responsive down to small phones; nav collapses to a hamburger under 860px.
