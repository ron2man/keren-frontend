# kl-architects.co.il SEO/Perf/Bug Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the P0 gallery-counter bug and ship the P1 SEO/accessibility/performance items from the external audit of kl-architects.co.il, working against the real Vue 2 source (`keren-frontend`), not the compiled deploy repo (`kl-architects`).

**Architecture:** Vue 2.6 + vue-router 3 SPA, no SSR. Per-route `<head>` metadata is hand-rolled (no vue-meta dependency) via a `router.afterEach` hook. The homepage slideshow moves from a SCSS-generated CSS `background-image` loop to `<img>`-based slides through the existing (but currently non-functional) `ResponsiveImage` component, whose image-optimization pipeline has two pre-existing bugs that must be fixed first. Build output is copied into the sibling `kl-architects` repo's `public/` folder and served by its Express static server.

**Tech Stack:** Vue 2.6, vue-router 3, vuex 3 (unused by these changes), lightgallery.js 1.4, vue-cli 4 / webpack, sharp (image scripts), Express (deploy repo).

## Global Constraints

- **Repo split:** `keren-frontend` (`/Users/ron.shtaiman/git/keren-frontend`) is the real Vue source. `kl-architects` (`/Users/ron.shtaiman/git/kl-architects`) is the deploy repo — an Express server (`server.js`) serving a prebuilt `public/` folder. All template/component/script work happens in `keren-frontend`; `kl-architects` is only touched by copying a fresh build into it.
- **No test runner exists** in `keren-frontend` (no jest/vitest/cypress configured, `npm test` is a stub). Every task's "verify" step is manual: `npm run serve` + browser/DOM inspection, or `grep`/`curl` against build output. Do not invent a test suite that isn't there.
- **RTL site:** `<html lang="he" dir="rtl">` globally. Any element whose content is numeric/LTR-shaped (like "1 / 8") needs an explicit `direction`/`unicode-bidi` override, or the browser's bidi algorithm will visually reorder it.
- **Build output path bug:** `package.json`'s `build`/`build:legacy` scripts and both `scripts/*.js` image scripts currently target a sibling directory literally named `backend` (`../backend/public`), left over from the original developer's local folder layout. In this environment the deploy repo is named `kl-architects`, not `backend`. Task 2 repoints these at `../kl-architects/public`.
- **Scope:** implements P0 item 1 and P1 items 2–7 from the audit spec. **P2 items 8 (homepage tagline copy) and 9 (contact phone field) are deliberately excluded** — they require content/product sign-off per the spec's own guidance and have no tasks here.
- **Hebrew copy already drafted below** (meta titles/descriptions, OG copy, alt text) should be treated as a starting draft, same as the original spec — confirm final wording with the client before publishing if that matters to them.
- **Pre-existing baseline bug (not from the audit spec):** `npm run build` currently fails on `main`, before any of this plan's changes — `src/data/projects.js` references 33 image paths as `.jpg` where the actual files on disk are `.JPG`, across the "GAMING Midtown" and "Beyond Minds" projects. Task 1 fixes this first so every later task builds on a working baseline.
- **Worktree note:** Tasks 1–8 execute in a git worktree at `keren-frontend/.claude/worktrees/seo-perf-bugfixes/`, nested under the real repo rather than a true sibling of `kl-architects`. A placeholder `keren-frontend/.claude/worktrees/kl-architects/public/` directory exists purely so `../kl-architects/public`-relative build/script commands used in Tasks 2 and 9's verify steps resolve to *something* while working in the worktree — it is scratch, not the real deploy repo. Task 9's actual build-and-deploy-to-`kl-architects` step must be run from the real `/Users/ron.shtaiman/git/keren-frontend` checkout after this branch merges, where `../kl-architects` is a true sibling again.

---

## Task 1: Fix case-mismatched image path references in `data/projects.js`

Discovered while checking the baseline before starting this plan: `npm run build` fails on `main` today with `Cannot find module '../assets/projects/08-beyond-minds/1.jpg'`. Webpack's module resolution is case-sensitive even on macOS. The actual files on disk for two projects are `.JPG` (uppercase extension); `data/projects.js` references them as `.jpg`. One of these (`08-beyond-minds`'s card thumbnail, loaded via a static `require()`) crashes the build outright. The other 32 are inside `galleryPaths`, resolved at runtime by `LightGallery.vue` through a `require.context` + try/catch — those don't crash the build, but they do mean the "GAMING Midtown" and "Beyond Minds" lightbox galleries are silently missing photos on the live site right now.

This is unrelated to the SEO/perf spec, but blocks a working baseline build, so it's fixed first.

**Files:**
- Modify: `src/data/projects.js`

**Interfaces:** none (string literal corrections only, no logic changes).

- [ ] **Step 1: Fix the "GAMING Midtown" project's `galleryPaths`**

In the `"GAMING Midtown"` project entry, change the extension case on these 20 entries (all under `projects/07-midtown/`) from `.jpg` to `.JPG` — leave every other entry in this project's `galleryPaths` (`1`, `2`, `9`, `10`, `19`) untouched, they're already correct:

| Old | New |
|---|---|
| `"projects/07-midtown/3.jpg"` | `"projects/07-midtown/3.JPG"` |
| `"projects/07-midtown/4.jpg"` | `"projects/07-midtown/4.JPG"` |
| `"projects/07-midtown/5.jpg"` | `"projects/07-midtown/5.JPG"` |
| `"projects/07-midtown/6.jpg"` | `"projects/07-midtown/6.JPG"` |
| `"projects/07-midtown/7B.jpg"` | `"projects/07-midtown/7B.JPG"` |
| `"projects/07-midtown/8.jpg"` | `"projects/07-midtown/8.JPG"` |
| `"projects/07-midtown/8B.jpg"` | `"projects/07-midtown/8B.JPG"` |
| `"projects/07-midtown/11.jpg"` | `"projects/07-midtown/11.JPG"` |
| `"projects/07-midtown/11B.jpg"` | `"projects/07-midtown/11B.JPG"` |
| `"projects/07-midtown/12.jpg"` | `"projects/07-midtown/12.JPG"` |
| `"projects/07-midtown/13.jpg"` | `"projects/07-midtown/13.JPG"` |
| `"projects/07-midtown/14.jpg"` | `"projects/07-midtown/14.JPG"` |
| `"projects/07-midtown/15.jpg"` | `"projects/07-midtown/15.JPG"` |
| `"projects/07-midtown/16.jpg"` | `"projects/07-midtown/16.JPG"` |
| `"projects/07-midtown/17.jpg"` | `"projects/07-midtown/17.JPG"` |
| `"projects/07-midtown/18.jpg"` | `"projects/07-midtown/18.JPG"` |
| `"projects/07-midtown/20.jpg"` | `"projects/07-midtown/20.JPG"` |
| `"projects/07-midtown/21.jpg"` | `"projects/07-midtown/21.JPG"` |
| `"projects/07-midtown/22.jpg"` | `"projects/07-midtown/22.JPG"` |
| `"projects/07-midtown/23.jpg"` | `"projects/07-midtown/23.JPG"` |

- [ ] **Step 2: Fix the "Beyond Minds" project's `imgSrc` and `galleryPaths`**

First, in the `"Beyond Minds"` project entry's `imgSrc` line, change:

```js
imgSrc: require("../assets/projects/08-beyond-minds/1.jpg"),
```

to:

```js
imgSrc: require("../assets/projects/08-beyond-minds/1.JPG"),
```

Then in the same project's `galleryPaths`, change the extension case on these 13 entries from `.jpg` to `.JPG` — leave `2`, `3`, `10`, `13`, `14` untouched, they're already correct:

| Old | New |
|---|---|
| `"projects/08-beyond-minds/1.jpg"` | `"projects/08-beyond-minds/1.JPG"` |
| `"projects/08-beyond-minds/4.jpg"` | `"projects/08-beyond-minds/4.JPG"` |
| `"projects/08-beyond-minds/5.jpg"` | `"projects/08-beyond-minds/5.JPG"` |
| `"projects/08-beyond-minds/6.jpg"` | `"projects/08-beyond-minds/6.JPG"` |
| `"projects/08-beyond-minds/7.jpg"` | `"projects/08-beyond-minds/7.JPG"` |
| `"projects/08-beyond-minds/8.jpg"` | `"projects/08-beyond-minds/8.JPG"` |
| `"projects/08-beyond-minds/9.jpg"` | `"projects/08-beyond-minds/9.JPG"` |
| `"projects/08-beyond-minds/11.jpg"` | `"projects/08-beyond-minds/11.JPG"` |
| `"projects/08-beyond-minds/12.jpg"` | `"projects/08-beyond-minds/12.JPG"` |
| `"projects/08-beyond-minds/15.jpg"` | `"projects/08-beyond-minds/15.JPG"` |
| `"projects/08-beyond-minds/16.jpg"` | `"projects/08-beyond-minds/16.JPG"` |
| `"projects/08-beyond-minds/17.jpg"` | `"projects/08-beyond-minds/17.JPG"` |
| `"projects/08-beyond-minds/18.jpg"` | `"projects/08-beyond-minds/18.JPG"` |

- [ ] **Step 3: Verify**

```bash
node -e "
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync('src/data/projects.js', 'utf8');
const paths = [...src.matchAll(/\"projects\/[^\"]+\.(?:jpg|jpeg|png|JPG|JPEG|PNG)\"/gi)].map(m => m[0].slice(1, -1));
const reqs = [...src.matchAll(/require\(\"\.\.\/assets\/projects\/[^\"]+\"\)/g)].map(m => m[0].match(/projects\/.+/)[0].slice(0, -2));
const all = paths.concat(reqs);
const base = path.join(__dirname, 'src/assets');
let bad = [];
all.forEach(gp => {
  const full = path.join(base, gp);
  const dir = path.dirname(full);
  const wantBase = path.basename(full);
  const actual = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  if (!actual.includes(wantBase)) bad.push(gp);
});
console.log('Total checked:', all.length, '- Mismatches:', bad.length);
bad.forEach(b => console.log(' -', b));
"
```

Expected: `Total checked: <N> - Mismatches: 0`.

```bash
npm run build
```

Expected: builds successfully with no `Cannot find module` errors (other pre-existing warnings, e.g. sass legacy-API deprecation notices, are unrelated and fine to ignore).

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.js
git commit -m "fix: correct .jpg/.JPG case mismatches breaking the build and hiding gallery photos"
```

---

## Task 2: Fix the image-optimization pipeline (prerequisite for Task 7)

The `ResponsiveImage` component and its backing `image-map.json` already exist in source but have never actually worked, for two independent reasons discovered while reading this code (not mentioned in the original external spec, since that audit never saw this source):

1. `scripts/generate-responsive-images.js` writes **absolute filesystem paths** (e.g. `/Users/ronshtaiman/projects/kl-architects.co.il/backend/public/img/...`) into `image-map.json` instead of web-relative URLs (`/img/...`). Even if this file were served, the browser would request a nonsense path.
2. `data/projects.js` passes `imgSrc: require("../assets/projects/01-t-house/1.jpg")` to `ProjectItem` → `ResponsiveImage`. `require(...)` resolves at build time to a webpack-hashed URL like `/img/1.abc123.jpg`. `image-helper.js` then looks up that hashed URL as a key in `image-map.json`, whose keys are actually plain source-relative paths like `"01-t-house/1.jpg"`. The lookup always misses, so `ResponsiveImage` silently falls back to the raw unoptimized image — the whole responsive/WebP system currently no-ops.

This task fixes both, extends the scripts to also process `src/assets/background` (needed by Task 7), and repoints build output at the real deploy repo name.

**Files:**
- Modify: `package.json`
- Modify: `scripts/generate-responsive-images.js`
- Modify: `scripts/convert-to-webp.js`
- Modify: `src/utils/image-helper.js`
- Modify: `src/data/projects.js`

**Interfaces:**
- Produces: `image-map.json` entries keyed by `"<projects|background>/<...>.{jpg,png}"` (matching the existing `galleryPaths` convention), each value `{ thumbnail, medium, large }` holding a `/img/...` web-relative URL string (or `null` if that size failed to generate).
- Produces: `getResponsiveImageSrc(path, size)`, `getImageSrcSet(path)`, `getPictureSources(path)`, `hasOptimizedImages(path)` in `image-helper.js` — unchanged call signatures, but now given a plain relative-path string (not a webpack URL) and with a working fallback for paths missing from the map.
- Consumed by: Task 7 (`Slider.vue` will call `ResponsiveImage` with `src="background/1.jpg"` etc.)

- [ ] **Step 1: Fix `package.json` build destination**

Edit `package.json`, changing the `build` and `build:legacy` scripts:

```json
    "build": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build --dest ../kl-architects/public",
    "build:legacy": "NODE_OPTIONS=--openssl-legacy-provider vue-cli-service build --dest ../kl-architects/public",
```

- [ ] **Step 2: Rewrite `scripts/generate-responsive-images.js`**

Replace the entire file with:

```js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = [
  { dir: path.join(__dirname, '../src/assets/projects'), urlPrefix: 'projects' },
  { dir: path.join(__dirname, '../src/assets/background'), urlPrefix: 'background' }
];
const OUTPUT_BASE = path.join(__dirname, '../../kl-architects/public/img');
const WEB_BASE = '/img';

const SIZES = {
  thumbnail: { width: 350, height: 250, suffix: '_thumb' },
  medium: { width: 800, height: 600, suffix: '_medium' },
  large: { width: 1200, height: 900, suffix: '_large' }
};

async function generateResponsiveImage(inputPath, outputDir, baseName, urlDir) {
  const results = {};

  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputPath = path.join(outputDir, `${baseName}${config.suffix}.webp`);
    const urlPath = `${WEB_BASE}/${urlDir}/${baseName}${config.suffix}.webp`;

    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;

      results[sizeName] = {
        success: true,
        path: urlPath,
        size: optimizedSize,
        savings: ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)
      };
    } catch (error) {
      console.error(`Error generating ${sizeName} for ${inputPath}:`, error.message);
      results[sizeName] = { success: false, error: error.message };
    }
  }

  return results;
}

async function processImage(filePath, relativePath, urlPrefix) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return null;
  }

  const baseName = path.basename(filePath, ext);
  const relDir = path.dirname(relativePath).replace(/\\/g, '/');
  const urlDir = relDir === '.' ? urlPrefix : `${urlPrefix}/${relDir}`;
  const outputDir = path.join(OUTPUT_BASE, relDir === '.' ? urlPrefix : path.join(urlPrefix, relDir));

  fs.mkdirSync(outputDir, { recursive: true });

  const originalKey = `${urlPrefix}/${relativePath.replace(/\\/g, '/')}`;
  console.log(`Processing: ${originalKey}`);
  const results = await generateResponsiveImage(filePath, outputDir, baseName, urlDir);

  return {
    original: originalKey,
    sizes: results
  };
}

async function processDirectory(dir, urlPrefix, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath, urlPrefix, baseDir);
      results.push(...subResults);
    } else if (entry.isFile()) {
      const result = await processImage(fullPath, relativePath, urlPrefix);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

function generateImageMap(results) {
  const imageMap = {};

  results.forEach(result => {
    imageMap[result.original] = {
      thumbnail: result.sizes.thumbnail.success ? result.sizes.thumbnail.path : null,
      medium: result.sizes.medium.success ? result.sizes.medium.path : null,
      large: result.sizes.large.success ? result.sizes.large.path : null,
    };
  });

  return imageMap;
}

async function main() {
  console.log('Generating responsive image sizes...\n');

  let allResults = [];

  for (const { dir, urlPrefix } of SOURCE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.error(`Error: Source directory not found at ${dir}`);
      process.exit(1);
    }
    fs.mkdirSync(path.join(OUTPUT_BASE, urlPrefix), { recursive: true });
    const results = await processDirectory(dir, urlPrefix);
    allResults = allResults.concat(results);
  }

  const imageMap = generateImageMap(allResults);

  const mapPath = path.join(__dirname, '../src/utils/image-map.json');
  fs.mkdirSync(path.dirname(mapPath), { recursive: true });
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));

  console.log('\nGeneration Summary:');
  console.log(`  Processed: ${allResults.length} images`);
  console.log(`  Output directory: ${OUTPUT_BASE}`);
  console.log(`  Image map: ${mapPath}`);
  console.log('\nResponsive images generated successfully.');
}

main().catch(console.error);
```

- [ ] **Step 3: Extend `scripts/convert-to-webp.js` to also cover `background/`**

Replace the top of the file (constants) and the `main` function:

```js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = [
  path.join(__dirname, '../src/assets/projects'),
  path.join(__dirname, '../src/assets/background')
];
```

(remove the old `PROJECTS_DIR`/`OUTPUT_DIR` constants) and replace `main()` with:

```js
async function main() {
  console.log('Converting images to WebP format...\n');

  const totals = { converted: 0, failed: 0, totalSavings: 0, totalOriginalSize: 0, totalWebpSize: 0 };

  for (const sourceDir of SOURCE_DIRS) {
    if (!fs.existsSync(sourceDir)) {
      console.error(`Error: Source directory not found at ${sourceDir}`);
      process.exit(1);
    }
    const results = await processDirectory(sourceDir);
    totals.converted += results.converted;
    totals.failed += results.failed;
    totals.totalSavings += results.totalSavings;
    totals.totalOriginalSize += results.totalOriginalSize;
    totals.totalWebpSize += results.totalWebpSize;
  }

  console.log('\nConversion Summary:');
  console.log(`  Converted: ${totals.converted} images`);
  console.log(`  Failed: ${totals.failed} images`);
  console.log(`  Total size reduction: ${((totals.totalSavings / totals.totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`  Original total: ${(totals.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  WebP total: ${(totals.totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Space saved: ${(totals.totalSavings / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
```

`processDirectory`, `convertImageToWebP`, and the rest of the file stay as-is.

- [ ] **Step 4: Fix `src/utils/image-helper.js` lookup + fallback**

Replace the whole file:

```js
let imageMap = {};
try {
  imageMap = require('./image-map.json');
} catch (e) {
  console.warn('image-map.json not found or invalid, using original images');
}

const originalAssets = require.context('@/assets', true, /^\.\/(projects|background)\/.*\.(jpg|jpeg|png)$/i);

function resolveOriginalAsset(relativePath) {
  const key = `./${relativePath}`;
  try {
    return originalAssets(key);
  } catch (e) {
    console.warn(`ResponsiveImage: could not resolve original asset for ${relativePath}`, e);
    return '';
  }
}

export function getResponsiveImageSrc(originalPath, size = 'medium') {
  const normalizedPath = originalPath.replace(/\\/g, '/');
  const imageData = imageMap[normalizedPath];

  if (imageData && imageData[size]) {
    return imageData[size];
  }
  if (imageData && imageData.medium) {
    return imageData.medium;
  }
  return resolveOriginalAsset(normalizedPath);
}

export function getImageSrcSet(originalPath) {
  const normalizedPath = originalPath.replace(/\\/g, '/');
  const imageData = imageMap[normalizedPath];

  if (!imageData) {
    return null;
  }

  const srcset = [];
  if (imageData.thumbnail) {
    srcset.push(`${imageData.thumbnail} 350w`);
  }
  if (imageData.medium) {
    srcset.push(`${imageData.medium} 800w`);
  }
  if (imageData.large) {
    srcset.push(`${imageData.large} 1200w`);
  }

  return srcset.length > 0 ? srcset.join(', ') : null;
}

export function hasOptimizedImages(originalPath) {
  const normalizedPath = originalPath.replace(/\\/g, '/');
  return !!imageMap[normalizedPath];
}

export function getPictureSources(originalPath) {
  const normalizedPath = originalPath.replace(/\\/g, '/');
  const imageData = imageMap[normalizedPath];

  if (!imageData) {
    return null;
  }

  const sources = [];

  if (imageData.large) {
    sources.push({
      srcset: `${imageData.large} 1200w`,
      media: '(min-width: 1024px)',
      type: 'image/webp'
    });
  }

  if (imageData.medium) {
    sources.push({
      srcset: `${imageData.medium} 800w`,
      media: '(min-width: 768px)',
      type: 'image/webp'
    });
  }

  if (imageData.thumbnail) {
    sources.push({
      srcset: `${imageData.thumbnail} 350w`,
      media: '(max-width: 767px)',
      type: 'image/webp'
    });
  }

  return sources.length > 0 ? sources : null;
}
```

- [ ] **Step 5: Change `data/projects.js` to pass plain path strings instead of `require()`**

In `src/data/projects.js`, replace each `imgSrc: require("../assets/projects/...")` line with a plain string matching the `galleryPaths` convention already used in the same file. Twelve occurrences, exact replacements:

| Project | Old | New |
|---|---|---|
| T house | `require("../assets/projects/01-t-house/1.jpg")` | `"projects/01-t-house/1.jpg"` |
| R house | `require("../assets/projects/10-R-house/1.png")` | `"projects/10-R-house/1.png"` |
| ZEN House | `require("../assets/projects/03-zen-house/1.png")` | `"projects/03-zen-house/1.png"` |
| AG House | `require("../assets/projects/04-ag-house/1.png")` | `"projects/04-ag-house/1.png"` |
| EL house | `require("../assets/projects/02-el-house/1.png")` | `"projects/02-el-house/1.png"` |
| TS Apartment | `require("../assets/projects/06-ts-apartment/1.jpg")` | `"projects/06-ts-apartment/1.jpg"` |
| RI Luxury Bedroom | `require("../assets/projects/13-ri-bedroom/1.jpg")` | `"projects/13-ri-bedroom/1.jpg"` |
| IC house | `require("../assets/projects/11-ic-house/1-.jpg")` | `"projects/11-ic-house/1-.jpg"` |
| Golden Hour | `require("../assets/projects/09-golden-hour/1.jpg")` | `"projects/09-golden-hour/1.jpg"` |
| GAMING Midtown | `require("../assets/projects/07-midtown/1.jpg")` | `"projects/07-midtown/1.jpg"` |
| AY House | `require("../assets/projects/05-ay-house/1.png")` | `"projects/05-ay-house/1.png"` |
| Beyond Minds | `require("../assets/projects/08-beyond-minds/1.JPG")` (after Task 1's case fix) | `"projects/08-beyond-minds/1.JPG"` |

`galleryPaths` arrays (already plain strings) stay untouched.

- [ ] **Step 6: Verify**

```bash
npm run images:optimize
```

Expected: script logs processing every file under `src/assets/projects/**` and `src/assets/background/*.jpg`, no errors, and ends with "Responsive images generated successfully." Then:

```bash
node -e "const m = require('./src/utils/image-map.json'); console.log(m['projects/01-t-house/1.jpg']); console.log(m['background/1.jpg'])"
```

Expected: both print an object like `{ thumbnail: '/img/projects/01-t-house/1_thumb.webp', medium: '/img/projects/01-t-house/1_medium.webp', large: '/img/projects/01-t-house/1_large.webp' }` — i.e. values start with `/img/`, not `/Users/...`.

```bash
ls ../kl-architects/public/img/projects/01-t-house/ | head
ls ../kl-architects/public/img/background/ | head
```

Expected: `1_thumb.webp`, `1_medium.webp`, `1_large.webp` files exist in both.

- [ ] **Step 7: Commit**

```bash
git add package.json scripts/generate-responsive-images.js scripts/convert-to-webp.js src/utils/image-helper.js src/data/projects.js
git commit -m "fix: repoint build/image-pipeline output at kl-architects and fix broken image-map paths"
```

---

## Task 3 (P0): Fix the gallery counter showing "8 / 1" instead of "1 / 8"

**Root cause, established by reading the actual code:** this is not a swapped variable. `lightgallery.js`'s own counter code (bundled into `chunk-vendors.3a5015f7.js` in the deployed build) is standard: it renders `current+1` then `/` then `total`, in that order, both on init and on slide change. The bug is CSS: `#lg-counter` has no `direction`/`unicode-bidi` override in `src/style/style.scss`. Because the whole page is `dir="rtl"`, the browser's bidi algorithm visually reorders the two number runs around the `/`, so "1 / 8" (correct logical order) renders as "8 / 1" (reversed visual order).

**Files:**
- Modify: `src/style/style.scss`

**Interfaces:** none (pure CSS, no component changes).

- [ ] **Step 1: Add the RTL override**

In `src/style/style.scss`, add (anywhere after the reset block, e.g. near the end of the file):

```scss
// lightgallery's counter ("1 / 8") is inherently LTR content; without this,
// the page's global dir="rtl" causes the browser's bidi algorithm to
// visually reverse it to "8 / 1".
#lg-counter {
  direction: ltr;
  unicode-bidi: isolate;
}
```

- [ ] **Step 2: Verify**

```bash
npm run serve
```

Open `/projects` in a browser, click a project thumbnail to open its lightgallery lightbox. Confirm the counter reads `1 / N` (not `N / 1`) on first open. Click next/prev a few times and confirm the first number changes and the second number (total) stays fixed and matches the project's actual image count. Repeat for at least 3 projects with different image counts (e.g. "T house" = 8 images, "IC house" = 4 images, "GAMING Midtown" = 26 images, per `src/data/projects.js`).

- [ ] **Step 3: Commit**

```bash
git add src/style/style.scss
git commit -m "fix: gallery counter showing reversed order under RTL (bidi isolation)"
```

---

## Task 4: Per-route `<title>`, meta description, canonical URL, and Open Graph/Twitter tags

No `vue-meta`/`@vueuse/head` dependency exists. Given the app's small size (4 routes), this task hand-rolls head management with a `router.afterEach` hook and direct DOM meta-tag upserts — no new dependency needed.

**Files:**
- Create: `src/utils/head-manager.js`
- Modify: `src/router/index.js`
- Create: `public/img/og-cover.jpg` (1200×630 OG image)

**Interfaces:**
- Produces: `applyRouteMeta(route)` in `head-manager.js`, called from `router/index.js`'s `afterEach`. `route.meta` is expected to optionally have `{ title, description, ogImage }`.

- [ ] **Step 1: Generate the OG image**

Run a one-off script to crop the homepage hero photo to the standard 1200×630 OG size:

```bash
node -e "
const sharp = require('sharp');
sharp('src/assets/background/1.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85 })
  .toFile('public/img/og-cover.jpg')
  .then(() => console.log('OG image written'))
"
```

Expected: `public/img/og-cover.jpg` exists, is a valid JPEG at least 1200px wide (`file public/img/og-cover.jpg` should report `1200x630`). This file lives under `public/`, so vue-cli-service copies it to the build output root unchanged (i.e. it will be served at `/img/og-cover.jpg`).

- [ ] **Step 2: Create `src/utils/head-manager.js`**

```js
const SITE_URL = 'https://www.kl-architects.co.il';
const DEFAULT_TITLE = 'קרן ליזרוביץ - אדריכלות ועיצוב פנים';
const DEFAULT_DESCRIPTION = 'אדריכלית קרן ליזרוביץ – תכנון בתי יוקרה, עיצוב פנים ואדריכלות סינרגית בישראל';
const DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-cover.jpg`;

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applyRouteMeta(route) {
  const meta = route.meta || {};
  const title = meta.title || DEFAULT_TITLE;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${route.path}`;
  const image = meta.ogImage ? `${SITE_URL}${meta.ogImage}` : DEFAULT_OG_IMAGE;

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', image);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);
  upsertLink('canonical', url);
}
```

- [ ] **Step 3: Wire per-route meta and the `afterEach` hook into `src/router/index.js`**

Replace the full file:

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { applyRouteMeta } from '@/utils/head-manager'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Homepage.vue'),
    meta: {
      title: 'קרן ליזרוביץ – אדריכלות ועיצוב פנים',
      description: 'אדריכלית קרן ליזרוביץ – תכנון בתי יוקרה, עיצוב פנים ואדריכלות סינרגית בישראל'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
    meta: {
      title: 'צור קשר – קרן ליזרוביץ אדריכלית',
      description: 'צרו קשר עם הסטודיו של קרן ליזרוביץ לתחילת פרויקט אדריכלות או עיצוב פנים'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      title: 'אודות – קרן ליזרוביץ אדריכלית',
      description: 'הכירו את אדריכלית קרן ליזרוביץ, בוגרת הטכניון ו-Politecnico di Milano, ותהליך העבודה בסטודיו'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '@/views/Projects.vue'),
    meta: {
      title: 'פרויקטים – קרן ליזרוביץ אדריכלות ועיצוב פנים',
      description: 'גלריית פרויקטים: בתי יוקרה, וילות, דירות ומשרדים שתוכננו ועוצבו על ידי הסטודיו'
    }
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '@/views/Project.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isInitialNavigation = from.name === null
  if (!isInitialNavigation && to.path === from.path) {
    next(false)
  } else {
    next()
  }
})

router.afterEach((to) => {
  applyRouteMeta(to)
})

export default router
```

(`/project` intentionally has no `meta` — it's dead/unreferenced code with placeholder English content, not one of the 4 routes in scope; it will just fall back to the site-wide defaults in `head-manager.js` if ever visited directly.)

- [ ] **Step 4: Verify**

```bash
npm run serve
```

Open each of `/`, `/about`, `/projects`, `/contact` and check DevTools → Elements → `<head>`:
- `<title>` differs per route and matches the table above.
- `<meta name="description">` differs per route.
- `og:title`, `og:description`, `og:url`, `og:image`, `twitter:*` tags are present and route-specific.
- `<link rel="canonical">` points at the current route's full URL.

Confirm no two routes share identical title or description text, and each description is roughly 120–160 characters (Hebrew) per the spec's target — adjust wording if noticeably off, keeping meaning intact.

- [ ] **Step 5: Commit**

```bash
git add src/utils/head-manager.js src/router/index.js public/img/og-cover.jpg
git commit -m "feat: add per-route title/description/OG/Twitter meta tags"
```

---

## Task 5: JSON-LD structured data

**Files:**
- Create: `src/utils/structured-data.js`
- Modify: `src/App.vue`
- Modify: `src/views/About.vue`

**Interfaces:**
- Produces: `injectJsonLd(id, data)` / `removeJsonLd(id)` in `structured-data.js`.

- [ ] **Step 1: Create `src/utils/structured-data.js`**

```js
export function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id) {
  const el = document.getElementById(id);
  if (el) {
    el.remove();
  }
}
```

- [ ] **Step 2: Inject sitewide `LocalBusiness` JSON-LD from `App.vue`**

In `src/App.vue`, add a `mounted()` hook (the component has no `<script>` logic beyond `components` today):

```js
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu";
import { injectJsonLd } from "@/utils/structured-data";

export default {
  components: {
    Menu,
    Header
  },
  mounted() {
    injectJsonLd('ld-local-business', {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "קרן ליזרוביץ - אדריכלות ועיצוב פנים",
      "image": "https://www.kl-architects.co.il/img/og-cover.jpg",
      "url": "https://www.kl-architects.co.il",
      "telephone": "+972548166025",
      "email": "kerenleizarovitch@gmail.com",
      "areaServed": "IL",
      "sameAs": [
        "https://www.facebook.com/keren.leizarovitch",
        "https://www.instagram.com/keren.lei__architect/"
      ]
    });
  }
};
```

(telephone, email, and sameAs URLs are copied from the existing `icons` array in `src/components/Header.vue`.)

- [ ] **Step 3: Add `Person` JSON-LD on `About.vue`, cleaned up on leave**

In `src/views/About.vue`'s `<script>` block, add lifecycle hooks alongside the existing `data()`:

```js
import { injectJsonLd, removeJsonLd } from "@/utils/structured-data";

export default {
  components: {
    // HalfTextHalfImage
  },
  mounted() {
    injectJsonLd('ld-person', {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "קרן ליזרוביץ",
      "jobTitle": "אדריכלית",
      "url": "https://www.kl-architects.co.il/about",
      "worksFor": {
        "@type": "Organization",
        "name": "קרן ליזרוביץ - אדריכלות ועיצוב פנים"
      },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Technion - Israel Institute of Technology" },
        { "@type": "CollegeOrUniversity", "name": "Politecnico di Milano" }
      ]
    });
  },
  beforeDestroy() {
    removeJsonLd('ld-person');
  },
  data: function(){
    // ...unchanged...
  }
};
```

(`removeJsonLd` on leave prevents the Person schema from lingering in `<head>` if the user navigates to another route, since About.vue is destroyed on route change.)

- [ ] **Step 4: Verify**

```bash
npm run serve
```

On `/`, check DevTools → Elements → `<head>` for `<script type="application/ld+json" id="ld-local-business">` and confirm its JSON parses (`JSON.parse(document.getElementById('ld-local-business').textContent)` in the console). Navigate to `/about`, confirm a second `<script id="ld-person">` appears; navigate to `/contact`, confirm `#ld-person` is gone but `#ld-local-business` remains (since `App.vue` is never destroyed).

Paste both JSON blocks into Google's Rich Results Test (https://search.google.com/test/rich-results) once deployed, or validate the JSON structurally now — no required-field errors for `HomeAndConstructionBusiness` or `Person`.

- [ ] **Step 5: Commit**

```bash
git add src/utils/structured-data.js src/App.vue src/views/About.vue
git commit -m "feat: add LocalBusiness and Person JSON-LD structured data"
```

---

## Task 6: Add a real `<h1>` on every route

Current state, confirmed by reading each view: Homepage has no heading at all. About.vue's page title is an `<h2>`. Contact.vue's page title is an `<h3>`. Projects.vue has no page title/heading of any kind.

**Files:**
- Modify: `src/views/Homepage.vue`
- Modify: `src/views/About.vue`
- Modify: `src/views/Contact.vue`
- Modify: `src/views/Projects.vue`

**Interfaces:** none (template/style only, no new props or data).

- [ ] **Step 1: Homepage — add a visually-hidden `<h1>`**

The homepage is a full-bleed slideshow by design with no text hero, so per the spec's own allowance the `<h1>` can be visually hidden but must exist in the DOM. Replace `src/views/Homepage.vue`:

```vue
<template>
  <div class="page flex grow1 column">
    <h1 class="visually-hidden">קרן ליזרוביץ – אדריכלות ועיצוב פנים</h1>
    <Slider class="page__slideshow flex grow1" />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";

export default {
  components: { Slider },
  created() {
    console.log("Homepage created");
  },
};
</script>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

- [ ] **Step 2: About.vue — promote the page title from `<h2>` to `<h1>`**

In `src/views/About.vue`'s template, change:

```html
      <h2>אודות</h2>
```

to:

```html
      <h1>אודות</h1>
```

(leave the second heading, `<h2>אופי הסטודיו ותהליך העבודה</h2>`, as an `<h2>` — it's correctly subordinate to the page title.)

In the same file's `<style>` block, the selector currently styling both headings identically needs to also match `h1`. Change:

```scss
    h2{
      margin-bottom: 10px;
      letter-spacing: 0.9px;
      font-size: 40px;
      line-height: 44px;
    }
```

to:

```scss
    h1, h2{
      margin-bottom: 10px;
      letter-spacing: 0.9px;
      font-size: 40px;
      line-height: 44px;
    }
```

- [ ] **Step 3: Contact.vue — promote the page title from `<h3>` to `<h1>`**

In `src/views/Contact.vue`'s template, there are two mutually-exclusive `<h3 class="title">` elements (only one renders at a time, gated by `v-if="!emailSent"` / `v-if="emailSent"`), so promoting both to `<h1>` never produces two `<h1>`s at once. Change:

```html
          <h3 class="title" v-if="!emailSent">בואו נתחיל פרויקט יחד</h3>
```

to:

```html
          <h1 class="title" v-if="!emailSent">בואו נתחיל פרויקט יחד</h1>
```

and:

```html
            <h3 class="title">תודה</h3>
```

to:

```html
            <h1 class="title">תודה</h1>
```

The `.title` class styling is class-selector based, not tag-based, so no CSS changes are needed.

- [ ] **Step 4: Projects.vue — add a new `<h1>` (none exists today)**

Replace `src/views/Projects.vue`'s template and style block:

```vue
<template>
  <div class="page container projects-page">
    <h1 class="page-title">פרויקטים</h1>
    <div class="grid-container">
      <div
        class="project-grid-item"
        v-for="(project, index) in projects"
        :key="index"
        role="button"
        tabindex="0"
        :aria-label="'פתח גלריה: ' + project.title"
        :aria-expanded="currentSelected === index"
        @click="onClick(index)"
        @keydown.enter.prevent="onClick(index)"
        @keydown.space.prevent="onClick(index)"
      >
        <ProjectItem
          :class="'item-' + index"
          :img-src="project.imgSrc"
          :title="project.title"
          :location="project.location"
          :subtitle="project.subtitle"
          :description="project.description"
        />
        <LightGallery v-if="currentSelected === index" :galleryPaths="project.galleryPaths" :idx="index" :projectTitle="project.title" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem"
import projects from "../data/projects"

export default {
  components: {
    ProjectItem,
    LightGallery: () => import(/* webpackChunkName: "lightgallery" */ "../components/LightGallery")
  },
  data() {
    return {
      currentSelected: null,
      projects
    }
  },
  methods: {
    onClick(index) {
      this.currentSelected = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  margin: 40px 15px 0;
  font-size: 40px;
  line-height: 44px;
  letter-spacing: 0.9px;
}

.grid-container {
  margin-top: 40px;
  display: grid;
  grid-row-gap: 35px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  .project-grid-item {
    cursor: pointer;
    margin: 0 15px 44px;
    &:focus {
      outline: 2px solid #111;
      outline-offset: 4px;
      border-radius: 2px;
    }
  }
}
</style>
```

(Only the template's outer wrapping and the style block changed — `<h1>` added, `grid-container` moved to wrap only the items, `.page-title` styled to match About.vue's h1/h2 size for visual consistency. Script block is unchanged.)

- [ ] **Step 5: Verify**

```bash
npm run serve
```

For each of `/`, `/about`, `/projects`, `/contact`, open DevTools console and run:

```js
document.querySelectorAll('h1').length
```

Expected: `1` on every route (not `0`, not `2+`). On Contact, submit the form (or manually toggle `emailSent` via Vue devtools) and re-check — still exactly 1. Visually confirm the About/Projects/Contact `<h1>` text isn't a duplicate of the header/nav logo text (it isn't — logo is "קרן ליזרוביץ", these are page-specific titles).

- [ ] **Step 6: Commit**

```bash
git add src/views/Homepage.vue src/views/About.vue src/views/Contact.vue src/views/Projects.vue
git commit -m "fix: ensure every route has exactly one real h1"
```

---

## Task 7: Homepage slider — real `<img>`s with alt text, WebP, responsive sizes, and deferred loading

Current state: `Slider.vue` renders 13 `<li class="slide">` elements with **no image content at all** — each slide's picture comes from a SCSS loop (`@for $i from 1 through 13 { .slide:nth-of-type(#{$i}) { background-image: url(~@/assets/background/#{$i}.jpg) } }`) baked into the compiled CSS. Because it's one CSS file, the browser fetches all 13 originals (one is 776KB) as soon as the CSS loads, regardless of which slide is visible — this is the audit's "~3.5MB, all eager, no responsive sizing" finding. There's also no alt/description content of any kind for these images, only a generic aria-live slide-count announcement.

This task replaces the CSS background-loop with `<img>` elements rendered through `ResponsiveImage` (now working, per Task 2), each with real Hebrew alt text (written after actually viewing all 13 images), and defers loading slides beyond the current+next one instead of relying on native `loading="lazy"` (which does not reliably defer here, since the slides are stacked absolutely-positioned elements already within the viewport rect).

**Files:**
- Modify: `src/components/Slider.vue`

**Interfaces:**
- Consumes: `ResponsiveImage` (`src/components/ResponsiveImage.vue`), props `src`, `alt`, `size`, `sizes`, `loading`, `img-class` (all already exist).
- Consumes: `image-helper.js` via `ResponsiveImage`, expecting `background/<n>.jpg` map keys (produced by Task 2).

- [ ] **Step 1: Replace `src/components/Slider.vue`**

```vue
<template>
  <section aria-label="גלריית תמונות רקע" aria-roledescription="carousel">
    <p class="visually-hidden" aria-live="polite" aria-atomic="true">
      תמונה {{ activeSlideIdx + 1 }} מתוך {{ numOfSlides }}
    </p>
    <ul id="all_slides" aria-label="שקופיות">
      <li
        class="slide"
        v-for="(slide, idx) in numOfSlides"
        :key="idx"
        :class="{ active: activeSlideIdx === idx }"
        :aria-hidden="activeSlideIdx !== idx ? 'true' : undefined"
      >
        <ResponsiveImage
          v-if="renderedSlides[idx]"
          :src="`background/${idx + 1}.jpg`"
          :alt="slideCaptions[idx]"
          size="large"
          sizes="100vw"
          :loading="idx === 0 ? 'eager' : 'lazy'"
          img-class="slide-img"
        />
      </li>
    </ul>
    <button
      class="slider-pause-btn"
      @click="togglePause"
      :aria-label="isPaused ? 'הפעל מצגת' : 'השהה מצגת'"
      :aria-pressed="isPaused"
    >
      <i :class="isPaused ? 'fa fa-play' : 'fa fa-pause'" aria-hidden="true"></i>
    </button>
  </section>
</template>

<script>
import ResponsiveImage from "./ResponsiveImage.vue";

export default {
  name: "Slider",
  components: { ResponsiveImage },
  data: function() {
    return {
      numOfSlides: 13,
      activeSlideIdx: 0,
      interval: null,
      isPaused: false,
      renderedSlides: [true, true, false, false, false, false, false, false, false, false, false, false, false],
      slideCaptions: [
        "וילה מודרנית עם בריכת אינפיניטי, גינה ירוקה ותאורה חיצונית בשעת בין ערביים",
        "סלון ופינת אוכל פתוחים עם דופן עץ, כיסאות ירוקים ואמנות קיר, וחלונות גדולים אל הגינה",
        "וילה טרופית עם עמודי דקל, בריכה פרטית ומרפסת זכוכית בקומה השנייה",
        "חלל מדרגות עם מעקה זכוכית וגימור זהב, פינת אוכל בשילוב שיש ובר יינות",
        "סלון פתוח עם קיר טלוויזיה, אי שיש עם כיסאות בר, ושטיח מנוקד בגוונים חמים",
        "חלל מגורים פתוח עם מנורות תלייה מעוצבות, מחיצת עץ אנכית ופתח לפטיו חיצוני",
        "פרגולת חוץ מעץ עם מאוורר תקרה, בריכה קטנה וריהוט גן מוקף צמחייה טרופית",
        "חדר שינה מאסטר יוקרתי עם קיר שיש ירוק, מראה עגולה, ספסל מרופד ופרקט אריח דגים",
        "בריכת שחייה צרה לאורך חצר צדדית עם דשא גבוה ועצי דקל",
        "סלון עם ספה כהה, קיר גלריית תמונות ומדרגות עץ מול דלתות זכוכית לפטיו",
        "מטבח מודרני עם ארונות אפורים, גב שיש ושלושה גופי תאורה תלויים מעל אי הבר",
        "חזית בית מודרני בשעת דמדומים עם דופן עץ, בריכה מוארת ופינת אוכל בחצר",
        "שביל גינה צדדי לאורך חזית הבית עם קיר לבנים אדום, עצי דקל וישיבת חוץ",
      ]
    }
  },
  methods: {
    goToNextSlide() {
      this.activeSlideIdx = (this.activeSlideIdx + 1) % this.numOfSlides;
      const preloadIdx = (this.activeSlideIdx + 1) % this.numOfSlides;
      if (!this.renderedSlides[preloadIdx]) {
        this.$set(this.renderedSlides, preloadIdx, true);
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.goToNextSlide, 2100);
      }
    }
  },
  created() {
    this.interval = setInterval(this.goToNextSlide, 2100);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

section {
  position: relative;
  width: 100%;
  flex: 1;
}

.slider-pause-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.8);
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
}

#all_slides {
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.slide {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  -webkit-transition: opacity 1.5s;
  -moz-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
  ::v-deep(.slide-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.active {
  opacity: 1;
  z-index: 2;
}
</style>
```

Notes on what changed from the original: `background: url(...)` SCSS loop and its associated `background-size/position/repeat` styles are gone (no longer needed — content is now real `<img>` elements); `ResponsiveImage` is imported and registered; `renderedSlides` and `slideCaptions` are new reactive state; `goToNextSlide` now also flips on rendering for the slide-after-next so it's ready before it becomes active; `::v-deep(.slide-img)` reaches into `ResponsiveImage`'s internal `<img>` (Vue 2 scoped-CSS piercing, needed because the `<img>` is nested inside `ResponsiveImage`'s own `<picture>` template, not at its root).

- [ ] **Step 2: Verify**

```bash
npm run serve
```

Open `/`, open DevTools → Network, filter by Img, hard-reload. Expected: only 1–2 background images (slide 1, and slide 2 once preloaded) fetch immediately; the remaining ~11 fetch progressively as the slideshow advances (watch the Network panel over ~30 seconds — one new image request roughly every 2.1s as `renderedSlides` flips more entries to `true`). Confirm each request's URL is under `/img/background/...` (i.e. the WebP-optimized asset, not the multi-hundred-KB original), and that the crossfade transition between slides still looks the same as before.

Confirm `document.querySelector('#all_slides img').alt` returns real Hebrew text (not empty), and that it changes per slide as the slideshow advances (`document.querySelectorAll('#all_slides img')` will show more `<img>` elements accumulating over time as slides render in).

- [ ] **Step 3: Commit**

```bash
git add src/components/Slider.vue
git commit -m "perf: replace homepage CSS background-image slideshow with lazy-loaded responsive images"
```

---

## Task 8: Lazy-load project gallery thumbnails

**Files:**
- Modify: `src/components/LightGallery.vue`

**Interfaces:** none.

- [ ] **Step 1: Add `loading="lazy"` to the gallery `<img>` tags**

In `src/components/LightGallery.vue`'s template, change:

```html
      <img :src="item.image" :alt="projectTitle + ' - תמונה ' + (index + 1)" style="display: none">
```

to:

```html
      <img :src="item.image" :alt="projectTitle + ' - תמונה ' + (index + 1)" loading="lazy" style="display: none">
```

(Alt text is already descriptive and present per-image — that part of item 6 was already implemented; this step only adds the missing `loading="lazy"`.)

- [ ] **Step 2: Verify**

```bash
npm run serve
```

Open `/projects`, open DevTools → Network → Img, click a project with a large gallery (e.g. "GAMING Midtown", 26 images per `src/data/projects.js`). Confirm not all 26 images fetch immediately on click — browsers vary in exactly how many `loading="lazy"` defers when elements start `display:none`, but this at minimum signals correct lazy-loading intent to the browser and costs nothing.

- [ ] **Step 3: Commit**

```bash
git add src/components/LightGallery.vue
git commit -m "perf: mark project gallery thumbnails as lazy-loaded"
```

---

## Task 9: Generate optimized images, build, deploy to `kl-architects`, and run the full acceptance checklist

**Files:** none modified (build/deploy + verification only).

**Run this task from the real `/Users/ron.shtaiman/git/keren-frontend` checkout on `main`, after this plan's branch has been merged — not from inside the implementation worktree.** `../kl-architects/public` (both in `package.json`'s `build` script and in `scripts/generate-responsive-images.js`'s `OUTPUT_BASE`) is a path relative to the repo root, and only resolves to the real deploy repo when run from a true sibling checkout. Inside the worktree used for Tasks 1–8, `../kl-architects` does not reach the real repo — that's expected; Tasks 1–8's own verify steps only need the build/scripts to run correctly, not to land in the real deploy location, and the final whole-branch review evaluates the diff, not a live deploy. This task is the one point where real output needs to reach the real `kl-architects` repo, so it needs the real directory layout.

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: builds successfully, no errors, and (per Task 2's fixed `--dest`) writes output into `../kl-architects/public`.

**Order matters here — build first, then generate images, never the other way around.** `vue-cli-service build` defaults to `clean: true` and deletes the entire `--dest` directory before writing (confirmed in `node_modules/@vue/cli-service/lib/commands/build/index.js`) — and `--dest` is the exact same directory (`../kl-architects/public`) that `scripts/generate-responsive-images.js` writes the optimized `.webp` files into. Running `images:optimize` before `build` means the build immediately wipes everything the image script just generated, and the deployed site 404s on all 178 responsive images with no visible error (the map lookup itself still "succeeds," it just points at files that no longer exist). This was caught by the final whole-branch review, not any per-task review, since no single task's diff showed both halves of the interaction.

- [ ] **Step 2: Generate the image pipeline output**

```bash
npm run images:optimize
```

Expected: writes `.webp` files into `../kl-architects/public/img/{projects,background}/**` — this now happens *after* the build, into a directory the build already finished writing to and will not touch again.

- [ ] **Step 3: Check what changed in the deploy repo**

```bash
cd ../kl-architects
git status
```

Expected: `public/index.html`, `public/js/*.js`, `public/css/*.css` show as modified (new content hashes), plus new files under `public/img/projects/**` and `public/img/background/*`.

- [ ] **Step 4: Run the deploy repo locally and verify against the spec's acceptance checklist**

```bash
npm install   # first time only
npm start
```

Then, against `http://localhost:3025` (or whatever `PORT` resolves to):

- [ ] Gallery counter reads `1 / N` correctly on ≥3 projects with different image counts (Task 3).
- [ ] View-source / DOM on all 4 routes (`/`, `/about`, `/projects`, `/contact`) shows a unique `<title>`, `<meta name="description">`, and OG/Twitter tags per route (Task 4). Since this is a client-rendered SPA, "view-source" here means DevTools → Elements after the SPA has mounted, not the raw HTTP response — note this distinction if handing off to someone doing a literal `curl`/`view-source` check, since a plain `curl` will only see the static shell's default tags, not the per-route ones injected by `router.afterEach`.
- [ ] Exactly one `<h1>` per route, visible in the rendered DOM (Task 6) — re-run `document.querySelectorAll('h1').length === 1` on each route.
- [ ] JSON-LD present on `/` (`#ld-local-business`) and `/about` (`#ld-person`), both valid JSON (Task 5). Run through Google's Rich Results Test once this is live at the real domain.
- [ ] Homepage slideshow images have real alt text; initial page load only fetches 1–2 images instead of all 13 (Tasks 6). Use Lighthouse (Chrome DevTools → Lighthouse → Accessibility) and confirm 0 `image-alt` violations, and note the "before" vs "after" total image bytes transferred on first load (spec's target: well under 1MB, down from ~3.5MB).
- [ ] Project gallery images have `loading="lazy"` (Task 8).
- [ ] Capture a Lighthouse Performance score for `/` on mobile before and after, per the spec's own verification checklist.
- [ ] Re-screenshot all 4 pages at a mobile and desktop breakpoint and confirm no visual regressions versus the current live site (particularly: homepage slideshow crossfade still looks right, About/Contact/Projects page titles look intentional and not awkwardly sized).

- [ ] **Step 5: Commit the deploy repo**

This is a separate git repository (`kl-architects`, remote `git@github.com:ron2man/kl-architects.git`) from the one all prior tasks committed to (`keren-frontend`). Confirm with the user before committing/pushing here, since it's the actual production deploy repo:

Still inside `kl-architects` from Step 3:

```bash
git add public/
git commit -m "build: ship gallery counter fix, per-route SEO metadata, and homepage image performance improvements"
```

Do not push, and do not restart/redeploy the production server, without explicit confirmation — deploying is a user decision, not something to do automatically as part of finishing this plan.

---

## Explicitly out of scope

- **Spec item 8** (homepage tagline/positioning copy) and **item 9** (contact form phone field) are not implemented here. Per the original spec's own guidance, these need content/product sign-off before any code is written. Flag them back to the user rather than drafting copy unprompted.
- `src/views/Project.vue` (singular) and its `/project` route are legacy/unreferenced code (hardcoded English placeholder text, no incoming links from `Projects.vue`) — left untouched as out of scope for this spec, which only covers the 4 real routes (Home/About/Projects/Contact).
- `scripts/convert-to-webp.js`'s output (WebP copies sitting alongside originals in `src/assets/`) is not consumed by any component — it's a standalone utility, not part of the `ResponsiveImage` pipeline. Task 2 extends it to cover `background/` for consistency, but nothing in this plan depends on its output.
