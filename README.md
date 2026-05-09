# ARS Home Improvements — GitHub Pages

Static rebuild of [arshomeimprovements.com](https://arshomeimprovements.com/), originally hosted on WordPress.com (Margarethe theme), now deployable on GitHub Pages.

Plain HTML / CSS / JS — no build step.

## Pages

- `index.html` — Home (hero, FAQs, CTA)
- `about.html` — Who We Are
- `projects.html` — Recent Projects (before/after slider, gallery, accordion)

## Required image assets

Drop these into `assets/images/` before deploying. Filenames are referenced from the HTML — match them exactly.

| File | Used on | Description |
| --- | --- | --- |
| `logo.png` | header (all pages), OG image | The geometric peak / "A" logo (red/orange/amber). Square, 1500×1500 ideal. |
| `favicon-32.png` | `<link rel="icon">` | 32×32 cropped logo |
| `favicon-192.png` | `<link rel="icon">` | 192×192 cropped logo |
| `apple-touch-icon.png` | iOS home screen | 180×180 cropped logo |
| `img-1389.jpg` | homepage hero, projects gallery | Finished bedroom with LVP flooring (portrait) |
| `img-1387.jpg` | projects gallery | Bedroom mid-demo, yellow drywall patches |
| `img-1388.jpg` | projects gallery | Bedroom with gray walls, no flooring yet |
| `img-1391.jpg` | projects "before" slider | Bathroom subfloor torn up |
| `img-1393.jpg` | projects "after" slider | Bathroom with new LVP flooring |

The slider/gallery file extensions in the HTML are `.jpg`. If your originals are `.png`, either rename them or update the `<img src>` references.

## Forms (Google Forms)

The "Get Started" / "Work with me" / "Schedule a consultation" buttons all open a modal containing an iframe. The iframe currently loads `about:blank` and has a `data-google-form` attribute with a placeholder.

To wire up the form:

1. Build the form in Google Forms with these fields (matches the original WPForms):
   - **Name** (First, Last) — required
   - **What type of space is this for?** (Residential / Commercial) — required
   - **Which services are you looking for?** (multi-select: Flooring, Drywall Installation or Repair, Carpet Installation, Interior Painting, Trim & Molding, Full Room Remodel, Other) — required
   - **Tell us a bit about your project** (long answer)
   - **Project Location** (short answer, "city and state")
   - **When would you like to start the project?** (ASAP / Within a month / 1 - 3 months from now / Just planning/getting quotes) — required
   - **What's your price range?** (Under $1,000 / $1,000 - $5,000 / $5,000 - $10,000 / $10,000 - $30,000 / $30,000+) — optional
   - **Phone Number** — required
   - **Email** — required
2. In Google Forms, click **Send → Embed HTML (`< >`)** and copy the `src` URL from the iframe.
3. In `index.html`, `about.html`, and `projects.html`, find the iframe inside `#consultation-modal` and replace `src="about:blank"` with the Google Forms embed URL. Remove the `data-google-form` placeholder attribute.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this branch to GitHub.
2. **Settings → Pages → Source:** Deploy from branch.
3. Choose the branch (`main` once merged, or this feature branch for preview).
4. Add `arshomeimprovements.com` to **Custom domain** if migrating the live domain. Create a `CNAME` file at the repo root containing the bare domain string, e.g.:
   ```
   arshomeimprovements.com
   ```
5. Update DNS at your registrar:
   - `A` records for the apex domain pointing to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), OR
   - `CNAME` for `www` pointing to `<username>.github.io`.
6. Enforce HTTPS in the Pages settings once the cert provisions.

The `.nojekyll` file at the root tells Pages to skip Jekyll processing — important so files/folders starting with `_` aren't ignored.

## Brand reference

- Tagline: "Crafted with care, built to endure."
- Phone: 402-581-8291
- Email: info@arshomeimprovements.com
- Instagram: [@arshomeimprovements](https://instagram.com/arshomeimprovements)
- Hours: Sun closed · Mon–Fri 7a–7p · Sat 8a–2p
- Colors: base `#f3f2ee`, primary `#3d3d31`, contrast `#ce2d13`, secondary `#fcfcfa`
- Fonts: Jost (body), Cormorant Garamond (headings — substitute for the original Lucette, which is licensed)
