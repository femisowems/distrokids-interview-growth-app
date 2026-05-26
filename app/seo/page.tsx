import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildSitemapEntries } from '@/lib/seo';
import { landingPageMetadata, schemaForReleasePage } from '@/lib/landing-page';

export default function SeoPage() {
  const sitemap = buildSitemapEntries();
  const metadata = landingPageMetadata('Afterimage', 'Nova Rue');
  const schema = schemaForReleasePage('Afterimage', 'Nova Rue', '/landing/afterimage');

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-accent-400">SEO engine</div>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.05em] text-white md:text-6xl">Programmatic pages with real metadata, not placeholder SEO.</h1>
        <p className="mt-5 text-lg leading-8 text-white/66">Generate landing page metadata, schema markup, canonical URLs, and a dynamic sitemap for every release and artist page.</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Metadata preview</CardTitle>
            <CardDescription>SSR-friendly tags for release pages.</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <pre className="overflow-auto rounded-3xl border border-white/8 bg-black/20 p-4 text-xs text-white/72">{JSON.stringify(metadata, null, 2)}</pre>
            <pre className="overflow-auto rounded-3xl border border-white/8 bg-black/20 p-4 text-xs text-white/72">{JSON.stringify(schema, null, 2)}</pre>
          </CardBody>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Sitemap routes</CardTitle>
            <CardDescription>Dynamic routes generated from the growth system.</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3">
            {sitemap.map((route) => <div key={route} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-white/82">{route}</div>)}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
