# Pawan Maurya — Portfolio

Personal portfolio built with **Vite + React 18 + GSAP**. Single-page, fully responsive, dark-themed, with a custom cursor, scroll reveals, animated stats, and stylized project mockups.

**Live:** https://developerpawanmaurya.github.io

---

## Tech stack

- **React 18** + **Vite** for fast dev + minimal bundle.
- **GSAP + ScrollTrigger** for hero animation, parallax, and count-ups.
- **Vanilla CSS** (single `styles.css`) — no framework lock-in.
- **gh-pages** for one-command deploy to GitHub Pages.

---

## Local development

Prerequisites: **Node 18+** and **npm**.

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to ./dist)
npm run build

# Preview the production build locally
npm run preview
```

---

## Project structure

```
portfolio-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectMock.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Pitch.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── CustomCursor.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── experience.js
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Edit the content of each section by updating the files in `src/data/` — no need to touch components.

---

## Deploy to GitHub Pages (automated, recommended)

A GitHub Actions workflow at `.github/workflows/deploy.yml` is already wired up. Every push to `main` will build the site and publish it — **no manual steps, no `npm run deploy` required**.

### One-time setup

#### 1. Create the GitHub repo

On github.com, create a **new public repository** named **exactly** `developerpawanmaurya.github.io` (this naming is required for a user site served at `username.github.io`). **Do not** initialize it with a README or `.gitignore` — this project already has those.

#### 2. Push the source code

From inside this project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: portfolio v1"
git branch -M main
git remote add origin https://github.com/developerpawanmaurya/developerpawanmaurya.github.io.git
git push -u origin main
```

#### 3. Enable GitHub Pages with the Actions source

1. Go to your repo on github.com → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch").
3. Click **Save** if prompted.

That's it. The first push triggered the workflow — check the **Actions** tab to watch it build. Once the run turns green (usually 1–2 minutes), your site is live at:

**https://developerpawanmaurya.github.io**

### Future updates

Edit content, commit, push. The workflow rebuilds and publishes automatically.

```bash
git add .
git commit -m "Update content"
git push
```

You can also trigger a manual redeploy from **Actions → Build & Deploy to GitHub Pages → Run workflow**.

---

## Alternative: manual deploy via `gh-pages` (fallback)

If you'd rather deploy from your laptop without Actions, the `gh-pages` npm script is still wired up:

```bash
npm install
npm run deploy   # builds and pushes ./dist to the gh-pages branch
```

If you go this route, change **Settings → Pages → Source** to **Deploy from a branch** and pick `gh-pages` / `(root)`. Note: you can't use both methods at once — pick one.

---

## Troubleshooting