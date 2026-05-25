import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { artists, landingSections, landingThemes, releases } from '@/lib/mock';
import { landingPageMetadata, schemaForReleasePage } from '@/lib/landing-page';
import { buildMetaTags } from '@/lib/seo';

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const releasesBySlug = Object.fromEntries(
  releases.map((release, index) => {
    const artist = artists.find((item) => item.id === release.artistId);

    return [release.slug, {
      ...release,
      artist: artist?.name ?? 'Unknown Artist',
      theme: landingThemes[index % landingThemes.length].name
    }];
  })
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const release = releasesBySlug[slug as keyof typeof releasesBySlug] ?? releasesBySlug[normalizeSlug(slug) as keyof typeof releasesBySlug];
  if (!release) return {};
  return buildMetaTags(landingPageMetadata(release.title, release.artist).title, landingPageMetadata(release.title, release.artist).description, `/landing/${release.slug}`);
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = releasesBySlug[slug as keyof typeof releasesBySlug] ?? releasesBySlug[normalizeSlug(slug) as keyof typeof releasesBySlug];
  if (!release) notFound();

  const schema = schemaForReleasePage(release.title, release.artist, `/landing/${release.slug}`);
  const sections = landingSections.map((section) => ({
    ...section,
    heading: section.id === 'hero' ? release.title : section.heading,
    copy:
      section.id === 'hero'
        ? `${release.artist} release landing page with motion-driven sections, fan capture, and SEO-aware metadata.`
        : section.copy,
    meta:
      section.id === 'hero'
        ? { countdown: '3 days', artist: release.artist }
        : section.meta
  }));

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge className="border-neon-400/30 bg-neon-400/10 text-neon-400">{release.theme}</Badge>
          <h1 className="mt-4 text-6xl font-medium tracking-[-0.06em] text-white md:text-7xl">{release.title}</h1>
          <p className="mt-4 text-lg text-white/68">{release.artist} release landing page with motion-driven sections, fan capture, and SEO-aware metadata.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="accent">Pre-save now</Button>
            <Button variant="outline">Watch teaser</Button>
          </div>
        </div>
        <Card className="glass">
          <CardBody className="space-y-4 p-6">
            {sections.map((section) => (
              <div key={section.id} className="rounded-3xl border border-white/8 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-white/36">{section.type}</div>
                <div className="mt-2 text-lg text-white">{section.heading}</div>
                <div className="mt-1 text-sm text-white/52">{section.copy}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
