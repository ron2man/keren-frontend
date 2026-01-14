let imageMap = {};
try {
  imageMap = require('./image-map.json');
} catch (e) {
  console.warn('image-map.json not found or invalid, using original images');
}

export function getResponsiveImageSrc(originalPath, size = 'medium') {
  const normalizedPath = originalPath.replace(/\\/g, '/');
  const imageData = imageMap[normalizedPath];
  
  if (!imageData || !imageData[size]) {
    return originalPath;
  }
  
  return imageData[size] || imageData.medium || originalPath;
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
