const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../src/assets/projects');
const OUTPUT_BASE = path.join(__dirname, '../../backend/public/img');

const SIZES = {
  thumbnail: { width: 350, height: 250, suffix: '_thumb' },
  medium: { width: 800, height: 600, suffix: '_medium' },
  large: { width: 1200, height: 900, suffix: '_large' }
};

async function generateResponsiveImage(inputPath, outputDir, baseName, ext) {
  const results = {};
  
  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputPath = path.join(outputDir, `${baseName}${config.suffix}${ext}`);
    
    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath.replace(ext, '.webp'));
      
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath.replace(ext, '.webp')).size;
      
      results[sizeName] = {
        success: true,
        path: outputPath.replace(ext, '.webp'),
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

async function processImage(filePath, relativePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return null;
  }

  const baseName = path.basename(filePath, ext);
  const projectDir = path.dirname(relativePath);
  const outputDir = path.join(OUTPUT_BASE, projectDir);
  
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log(`Processing: ${relativePath}`);
  const results = await generateResponsiveImage(filePath, outputDir, baseName, ext);
  
  return {
    original: relativePath,
    baseName,
    sizes: results
  };
}

async function processDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath, baseDir);
      results.push(...subResults);
    } else if (entry.isFile()) {
      const result = await processImage(fullPath, relativePath);
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
    const key = result.original.replace(/\\/g, '/');
    imageMap[key] = {
      thumbnail: result.sizes.thumbnail.success ? result.sizes.thumbnail.path.replace(/\\/g, '/') : null,
      medium: result.sizes.medium.success ? result.sizes.medium.path.replace(/\\/g, '/') : null,
      large: result.sizes.large.success ? result.sizes.large.path.replace(/\\/g, '/') : null,
    };
  });
  
  return imageMap;
}

async function main() {
  console.log('🖼️  Generating responsive image sizes...\n');
  
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`Error: Projects directory not found at ${PROJECTS_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_BASE, { recursive: true });
  
  const results = await processDirectory(PROJECTS_DIR);
  const imageMap = generateImageMap(results);
  
  const mapPath = path.join(__dirname, '../src/utils/image-map.json');
  fs.mkdirSync(path.dirname(mapPath), { recursive: true });
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  
  console.log('\n📊 Generation Summary:');
  console.log(`  ✓ Processed: ${results.length} images`);
  console.log(`  📁 Output directory: ${OUTPUT_BASE}`);
  console.log(`  📄 Image map: ${mapPath}`);
  console.log('\n✅ Responsive images generated successfully!');
}

main().catch(console.error);
