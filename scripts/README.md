# Image Optimization Scripts

## Prerequisites

Install dependencies:
```bash
npm install
```

## Scripts

### 1. Convert to WebP
Converts all JPG/PNG images to WebP format (keeps originals):
```bash
npm run images:webp
```

**What it does:**
- Scans all images in `src/assets/projects/`
- Converts JPG/PNG to WebP with 85% quality
- Saves WebP files alongside originals
- Shows size savings for each image

**Output:** WebP files in same directories as originals

### 2. Generate Responsive Images
Creates multiple sizes for each image:
```bash
npm run images:responsive
```

**What it does:**
- Generates 3 sizes: thumbnail (350x250), medium (800x600), large (1200x900)
- Saves optimized WebP images to `backend/public/img/`
- Creates `src/utils/image-map.json` for easy lookup
- Maintains directory structure

**Output:**
- Optimized images in `backend/public/img/projects/`
- Image map JSON file for component usage

### 3. Optimize All
Runs both scripts:
```bash
npm run images:optimize
```

## Usage in Components

### Using ResponsiveImage Component

```vue
<template>
  <ResponsiveImage 
    :src="imagePath" 
    :alt="description"
    size="thumbnail"
    loading="lazy"
    :width="350"
    :height="250"
  />
</template>
```

### Using Image Helper Functions

```javascript
import { getResponsiveImageSrc, getImageSrcSet } from '@/utils/image-helper'

// Get specific size
const thumbnail = getResponsiveImageSrc('projects/01-t-house/1.jpg', 'thumbnail')

// Get srcset for responsive images
const srcset = getImageSrcSet('projects/01-t-house/1.jpg')
```

## Image Sizes

- **thumbnail**: 350x250px - For grid thumbnails (~20-30KB)
- **medium**: 800x600px - For mobile lightbox (~100-150KB)
- **large**: 1200x900px - For desktop lightbox (~200-300KB)

## Notes

- Original images are preserved
- WebP format provides ~30-50% size reduction
- Responsive images are served from `/img/` (public directory)
- Browser automatically selects best size based on viewport
