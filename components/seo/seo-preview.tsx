"use client";

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { releases, artists } from '@/lib/mock';
import { buildMetaTags, canonicalUrl } from '@/lib/seo';
import { schemaForReleasePage } from '@/lib/landing-page';

export function SeoPreview() {
  const [slug, setSlug] = useState<string>(releases[0]?.slug ?? '');

  const release = useMemo(() => releases.find((r) => r.slug === slug) ?? releases[0], [slug]);
  const artist = useMemo(() => artists.find((a) => a.id === release.artistId), [release]);

  const meta = useMemo(() => buildMetaTags(`${release.title} | ${artist?.name ?? ''}`, `Growth-optimized launch page for ${release.title} by ${artist?.name ?? ''}.`, `/landing/${release.slug}`), [release, artist]);
  const schema = useMemo(() => schemaForReleasePage(release.title, artist?.name ?? 'Unknown', `/landing/${release.slug}`), [release, artist]);
  const ogImage = useMemo(() => canonicalUrl(`/landing/${release.slug}/opengraph-image`), [release]);

  return (
    <div className="space-y-4">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Release selector</CardTitle>
          <CardDescription>Choose a release to preview metadata and OG image.</CardDescription>
        </CardHeader>
        <CardBody>
          <select className="w-full rounded-2xl bg-white/5 p-3 text-white" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {releases.map((r) => (
              <option key={r.slug} value={r.slug}>{r.title} — {r.releaseDate}</option>
            ))}
          </select>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>Rendered meta tags</CardDescription>
          </CardHeader>
          <CardBody>
            <pre className="overflow-auto rounded-2xl border border-white/8 bg-black/20 p-4 text-xs text-white/72">{JSON.stringify(meta, null, 2)}</pre>
          </CardBody>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>JSON‑LD</CardTitle>
            <CardDescription>Structured data for the release page</CardDescription>
          </CardHeader>
          <CardBody>
            <pre className="overflow-auto rounded-2xl border border-white/8 bg-black/20 p-4 text-xs text-white/72">{JSON.stringify(schema, null, 2)}</pre>
          </CardBody>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>OG image preview</CardTitle>
          <CardDescription>Generated image used for social previews</CardDescription>
        </CardHeader>
        <CardBody>
          <div className="mb-3 text-sm text-white/60">Image URL</div>
          <div className="mb-4 break-words text-sm text-white/72">{ogImage}</div>
          <div className="rounded-2xl overflow-hidden border border-white/8 bg-black/20">
            <img src={ogImage} alt={`${release.title} OG image`} width={1200} height={630} />
          </div>
          <div className="mt-3 flex gap-2">
            <Button asChild size="sm" variant="outline"><a href={ogImage} target="_blank" rel="noreferrer">Open image</a></Button>
            <Button asChild size="sm" variant="ghost"><a href={`/landing/${release.slug}`}>Open landing page</a></Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SeoPreview;
