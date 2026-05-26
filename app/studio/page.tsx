import { CampaignComposer } from '@/components/campaign-composer';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { artists, campaigns, releases } from '@/lib/mock';

export default function StudioPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-neon-400">Growth studio</div>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.05em] text-white md:text-6xl">Launch campaigns with AI, structure, and taste.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
          Compose a release brief, preview the rollout, and coordinate launch assets across artists, campaigns, experiments, and landing pages.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Card className="glass lg:col-span-2"><CardBody className="p-0"><CampaignComposer /></CardBody></Card>
        <div className="space-y-5">
          <Card className="glass"><CardHeader><CardTitle>Artists</CardTitle><CardDescription>Three active launch tracks</CardDescription></CardHeader><CardBody className="space-y-3">{artists.map((artist) => <div key={artist.id} className="rounded-2xl border border-white/8 bg-white/5 p-4"><div className="flex items-center justify-between"><div className="text-white">{artist.name}</div><div className="text-xs text-white/40">{artist.genre}</div></div><div className="mt-2 text-sm text-white/54">{artist.followers.toLocaleString()} followers</div></div>)}</CardBody></Card>
          <Card className="glass"><CardHeader><CardTitle>Releases</CardTitle><CardDescription>Campaign-ready inventory</CardDescription></CardHeader><CardBody className="space-y-3">{releases.map((release) => <div key={release.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 p-4"><div><div className="text-white">{release.title}</div><div className="text-sm text-white/48">{release.releaseDate}</div></div><div className="text-xs uppercase tracking-[0.24em] text-white/44">{release.status}</div></div>)}</CardBody></Card>
          <Card className="glass"><CardHeader><CardTitle>Campaigns</CardTitle><CardDescription>Live acquisition routes</CardDescription></CardHeader><CardBody className="space-y-3">{campaigns.map((campaign) => <div key={campaign.id} className="rounded-2xl border border-white/8 bg-white/5 p-4"><div className="flex items-center justify-between"><div className="text-white">{campaign.name}</div><div className="text-xs uppercase tracking-[0.24em] text-white/44">{campaign.channel}</div></div><div className="mt-2 text-sm text-white/54">${campaign.spend.toLocaleString()} spend · {campaign.conversions.toLocaleString()} conversions</div></div>)}</CardBody></Card>
        </div>
      </div>
    </section>
  );
}
