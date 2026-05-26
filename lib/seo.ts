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

export function buildSitemapEntries() {
  return [
    '/',
    '/studio',
    '/landing/afterimage',
    '/experiments',
    '/analytics',
    '/seo',
    '/cms'
  ];
}
