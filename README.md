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

---

## Deploying to AWS S3 (Static Website Hosting — Free Tier)

### Step 1: Create an S3 bucket

1. Go to AWS Console > S3 > Create bucket
2. Name it something like `johngavindeposoy-portfolio`
3. Uncheck "Block all public access" (you want the site to be public)

### Step 2: Enable static website hosting

1. Open the bucket > Properties tab
2. Scroll to "Static website hosting" > Enable
3. Set index document to `index.html`
4. Note the bucket website endpoint URL shown at the bottom

### Step 3: Add a public read bucket policy

Go to Permissions > Bucket policy, paste this (replace YOUR-BUCKET-NAME):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

### Step 4: Upload files

Upload all files from this folder to the bucket root. Keep the folder structure exactly as-is (css/, js/, images/ subfolders).

Your site is now live at the S3 website endpoint.

---

## Optional: CloudFront for HTTPS and CDN (Free Tier)

S3 static hosting only serves over HTTP. For HTTPS and faster global delivery:

1. Go to AWS Console > CloudFront > Create distribution
2. Set the origin domain to your S3 bucket **website endpoint** (not the bucket itself)
3. Set default root object to `index.html`
4. Deploy — takes a few minutes
5. Your site is now available over HTTPS at a `.cloudfront.net` subdomain

Free tier includes 1 TB data transfer out and 10 million requests per month for 12 months.

All paths in this project are relative, so the site works as-is after upload with no changes.
