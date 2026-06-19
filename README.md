# John Gavin Deposoy — Portfolio

Personal portfolio website. Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## Project Structure

```
portfolio/
├── index.html               Main single-page entry point
├── css/
│   ├── style.css            Core styles and design system
│   └── responsive.css       Breakpoints (480 / 768 / 1024 / 1280px)
├── js/
│   ├── script.js            Cursor, nav behavior, contact form alert
│   ├── accordion.js         Projects list expand/collapse
│   └── carousel.js          Gallery carousel (touch + arrows + dots)
├── images/
│   ├── profile.png          Profile photo placeholder (400x400)
│   ├── skills/              Skill icon placeholders (80x80 each)
│   └── projects/            Project image placeholders
└── README.md
```

## Replacing Placeholder Images

All `.png` files in `images/` are blank placeholders sized for their slots.
To replace one: swap the file and keep the same filename. No HTML changes needed.

| File                           | Size     | Used for                    |
|--------------------------------|----------|-----------------------------|
| images/profile.png             | 400x400  | Hero profile photo          |
| images/projects/proj-featured.png | 800x520 | Featured project block     |
| images/projects/proj-1.png    | 560x380  | Carousel slide 1            |
| images/projects/proj-2.png    | 560x380  | Carousel slide 2            |
| images/projects/proj-3.png    | 560x380  | Carousel slide 3            |
| images/skills/skill-*.png     | 80x80    | Skill card icons            |

## Running Locally

**Option A — Open directly (simplest)**
Double-click `index.html` in File Explorer. Works out of the box.

**Option B — Python dev server (recommended, avoids any path quirks)**
```
python -m http.server 3000
```
Then open http://localhost:3000 in your browser.

**Option C — VS Code Live Server**
Install the Live Server extension, right-click `index.html`, click "Open with Live Server".
