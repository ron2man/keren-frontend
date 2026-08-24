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
  large: { width: 1920, height: 1440, suffix: '_large' }
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
