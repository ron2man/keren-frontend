const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../src/assets/projects');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/projects');

async function convertImageToWebP(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    await image
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      webpSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = {
    converted: 0,
    failed: 0,
    totalSavings: 0,
    totalOriginalSize: 0,
    totalWebpSize: 0
  };

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      const subResults = await processDirectory(fullPath);
      results.converted += subResults.converted;
      results.failed += subResults.failed;
      results.totalSavings += subResults.totalSavings;
      results.totalOriginalSize += subResults.totalOriginalSize;
      results.totalWebpSize += subResults.totalWebpSize;
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const webpPath = path.join(dir, `${baseName}.webp`);
        
        if (!fs.existsSync(webpPath)) {
          console.log(`Converting: ${fullPath}`);
          const result = await convertImageToWebP(fullPath, webpPath);
          
          if (result.success) {
            results.converted++;
            results.totalOriginalSize += result.originalSize;
            results.totalWebpSize += result.webpSize;
            results.totalSavings += result.originalSize - result.webpSize;
            console.log(`  ✓ Saved ${result.savings}% (${(result.originalSize / 1024).toFixed(1)}KB → ${(result.webpSize / 1024).toFixed(1)}KB)`);
          } else {
            results.failed++;
          }
        } else {
          console.log(`Skipping (already exists): ${webpPath}`);
        }
      }
    }
  }

  return results;
}

async function main() {
  console.log('🖼️  Converting images to WebP format...\n');
  
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`Error: Projects directory not found at ${PROJECTS_DIR}`);
    process.exit(1);
  }

  const results = await processDirectory(PROJECTS_DIR);
  
  console.log('\n📊 Conversion Summary:');
  console.log(`  ✓ Converted: ${results.converted} images`);
  console.log(`  ✗ Failed: ${results.failed} images`);
  console.log(`  💾 Total size reduction: ${((results.totalSavings / results.totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`  📦 Original total: ${(results.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  📦 WebP total: ${(results.totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  💰 Space saved: ${(results.totalSavings / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
