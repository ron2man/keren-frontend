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
