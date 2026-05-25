export function canonicalUrl(pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://distrokids-growth-app.vercel.app';
  return new URL(pathname, base).toString();
}

export function buildMetaTags(title: string, description: string, pathname: string) {
  const url = canonicalUrl(pathname);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'DistroKid Growth OS',
      type: 'website'
    }
  };
}

import { releases } from './mock';

export function buildSitemapEntries() {
  const staticRoutes = ['/', '/studio', '/experiments', '/analytics', '/seo', '/cms'];

  const releaseRoutes = releases.map((r) => `/landing/${r.slug}`);

  return [...staticRoutes, ...releaseRoutes];
}
