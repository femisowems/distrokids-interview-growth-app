'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ChevronRight, Flame, LineChart, Play, Sparkles, Target, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { campaigns, experiments, landingSections, landingThemes, releases, artists, aiGenerations, analyticsEvents } from '@/lib/mock';
import PlaybookManager from '@/components/playbook/playbook-manager';
import { conversionRate, winnerForExperiment } from '@/lib/experiments';
import { renderLandingSections } from '@/lib/landing-page';
import { buildMetaTags } from '@/lib/seo';

const motionCard = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const }
};

const analyticsHighlights = [
  { label: 'Top channel', value: 'TikTok', detail: '+41% conversion lift' },
  { label: 'Retention', value: '68%', detail: '7-day fan return rate' },
  { label: 'Attribution', value: '94%', detail: 'Tracked sessions with source' },
  { label: 'A/B tests', value: '2.4x', detail: 'Faster winner detection' }
];

const funnels = [
  { step: 'TikTok Ad', visits: 48210, color: 'from-sunset-500 to-sunset-400' },
  { step: 'Landing Page', visits: 31220, color: 'from-neon-500 to-accent-400' },
  { step: 'Email Capture', visits: 18450, color: 'from-accent-500 to-neon-400' },
  { step: 'Spotify Pre-Save', visits: 12780, color: 'from-emerald-400 to-cyan-400' },
  { step: 'Retargeting', visits: 9710, color: 'from-white to-white/60' }
];

const landingPreview = renderLandingSections(landingSections);
const winner = winnerForExperiment(experiments[0]);

export function GrowthHome() {
  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(circle_at_center,rgba(125,249,255,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,122,89,0.12),transparent_28%)]" />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div {...motionCard}>
            <Badge className="mb-5 border-neon-400/30 bg-neon-400/10 text-neon-400">Growth-Focused Marketing System</Badge>
            <h1 className="max-w-4xl text-balance text-6xl font-medium tracking-[-0.06em] text-white md:text-7xl lg:text-[7.5rem] lg:leading-[0.9]">
              AI Music Launch OS for campaigns that feel like a release film.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/68 md:text-xl">
              Build landing pages, experiment with conversion systems, orchestrate AI marketing, and read the full story of a release from first click to retained fan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/studio">Create release campaign</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#launch-preview">View the launch OS</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {analyticsHighlights.map((item) => (
                <Card key={item.label} className="glass">
                  <CardBody className="p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</div>
                    <div className="mt-2 text-2xl font-medium text-white">{item.value}</div>
                    <div className="mt-1 text-sm text-white/54">{item.detail}</div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div id="launch-preview" {...motionCard} transition={{ ...motionCard.transition, delay: 0.1 }}>
            <Card className="relative overflow-hidden border-white/10 bg-[#0a1324]/90 shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,249,255,0.18),transparent_36%),linear-gradient(160deg,rgba(255,255,255,0.05),transparent_42%)]" />
              <CardBody className="relative space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/40">Live release</div>
                    <div className="mt-1 text-2xl font-medium text-white">Afterimage</div>
                  </div>
                  <div className="rounded-full border border-neon-400/20 bg-neon-400/10 px-3 py-1 text-xs text-neon-400">3 days to drop</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Animated launch preview</span>
                    <span>SEO + OG ready</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {landingPreview.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="rounded-2xl border border-white/8 bg-white/5 p-3"
                      >
                        <div className="text-[10px] uppercase tracking-[0.24em] text-white/36">{section.type}</div>
                        <div className="mt-8 h-20 rounded-xl bg-gradient-to-br from-white/12 to-white/4" />
                        <div className="mt-3 text-xs text-white/54">{section.heading}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {landingThemes.map((theme) => (
                    <div key={theme.name} className="rounded-2xl border border-white/8 bg-white/5 p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ background: theme.accent }} />
                        <div className="text-sm text-white">{theme.name}</div>
                      </div>
                      <div className="mt-3 h-16 rounded-xl" style={{ background: `linear-gradient(135deg, ${theme.surface}, rgba(255,255,255,0.04))`, boxShadow: `0 0 0 1px ${theme.glow}` }} />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="glass lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Flame className="h-4 w-4 text-sunset-400" /> Acquisition funnel</CardTitle>
              <CardDescription>Track traffic from ad impression through to fan retention.</CardDescription>
            </CardHeader>
            <CardBody className="space-y-5">
              {funnels.map((step, index) => {
                const pct = Math.round((step.visits / funnels[0].visits) * 100);
                return (
                  <div key={step.step} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/88">{index + 1}. {step.step}</span>
                      <span className="text-white/44">{step.visits.toLocaleString()} visits</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/6">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: index * 0.08 }} className={`h-full rounded-full bg-gradient-to-r ${step.color}`} />
                    </div>
                  </div>
                );
              })}
              <div className="grid gap-3 sm:grid-cols-3">
                <Card className="border-white/8 bg-white/5"><CardBody className="p-4"><div className="text-xs text-white/40">Visits</div><div className="mt-2 text-2xl">48.2k</div></CardBody></Card>
                <Card className="border-white/8 bg-white/5"><CardBody className="p-4"><div className="text-xs text-white/40">Dropoff</div><div className="mt-2 text-2xl">18.9%</div></CardBody></Card>
                <Card className="border-white/8 bg-white/5"><CardBody className="p-4"><div className="text-xs text-white/40">Conversions</div><div className="mt-2 text-2xl">12.7%</div></CardBody></Card>
              </div>
            </CardBody>
          </Card>

          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-neon-400" /> Experiment engine</CardTitle>
              <CardDescription>{experiments[0].objective}</CardDescription>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/36">Winner</div>
                <div className="mt-2 text-2xl text-white">{winner.label}</div>
                <div className="mt-1 text-sm text-white/56">{winner.conversions} conversions</div>
              </div>
              {experiments[0].variants.map((variant) => (
                <div key={variant.id} className="rounded-2xl border border-white/8 bg-black/15 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{variant.label}</div>
                    <div className="text-sm text-white/48">{variant.weight}%</div>
                  </div>
                  <div className="mt-2 text-sm text-white/56">{variant.changes.join(' • ')}</div>
                  <div className="mt-3 h-2 rounded-full bg-white/6">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon-400 to-accent-400" style={{ width: `${conversionRate(variant.conversions, 1000)}%` }} />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-3 lg:px-8">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-sunset-400" /> AI marketing workflows</CardTitle>
            <CardDescription>Prompt playground outputs for captions, hooks, emails, and SEO blocks.</CardDescription>
          </CardHeader>
          <CardBody className="grid gap-4 md:grid-cols-2">
            {aiGenerations.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/36">
                  <span>{item.type}</span>
                  <span>{item.tone}</span>
                </div>
                <div className="mt-3 text-sm text-white/44">{item.prompt}</div>
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-6 text-white/84">{item.output}</div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LineChart className="h-4 w-4 text-neon-400" /> Analytics snapshot</CardTitle>
            <CardDescription>Attribution and retention at a glance.</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            {analyticsEvents.map((event) => (
              <div key={`${event.event}-${event.timestamp}`} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize text-white">{event.event.replace(/_/g, ' ')}</span>
                  <span className="text-white/44">{event.channel}</span>
                </div>
                <div className="mt-1 text-xs text-white/38">{event.timestamp}</div>
              </div>
            ))}
            <Button variant="ghost" className="w-full justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Open full analytics view <ChevronRight className="h-4 w-4" />
            </Button>
          </CardBody>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Card className="glass overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-neon-400" /> Launch surfaces</CardTitle>
            <CardDescription>Landing pages, SEO, attribution, and internal marketing CMS connected in one OS.</CardDescription>
          </CardHeader>
          <CardBody className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              {releases.map((release) => (
                <div key={release.id} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/40">{artists.find((artist) => artist.id === release.artistId)?.name}</div>
                      <div className="mt-1 text-2xl text-white">{release.title}</div>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/54">{release.status}</div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-3"><div className="text-xs text-white/38">Release date</div><div className="mt-2 flex items-center gap-2 text-sm text-white"><Calendar className="h-4 w-4" />{release.releaseDate}</div></div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-3"><div className="text-xs text-white/38">Pre-saves</div><div className="mt-2 text-sm text-white">{release.preSaves.toLocaleString()}</div></div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-3"><div className="text-xs text-white/38">Campaigns</div><div className="mt-2 text-sm text-white">{campaigns.filter((campaign) => campaign.releaseId === release.id).length}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              <Card className="border-white/8 bg-white/5">
                <CardBody className="p-5">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/36">CMS workflow</div>
                  <div className="mt-2 text-2xl text-white">Campaign scheduling and asset uploads</div>
                  <div className="mt-2 text-sm text-white/54">Editorial interface with drag-and-drop sections, AI asset generation, and release-ready previews.</div>
                </CardBody>
              </Card>
              <Card className="border-white/8 bg-white/5">
                <CardBody className="p-5">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/36">SEO system</div>
                  <div className="mt-2 text-2xl text-white">Programmatic release pages</div>
                  <div className="mt-2 text-sm text-white/54">SSR metadata, schema markup, OG generation, and a dynamic sitemap for artists and releases.</div>
                </CardBody>
              </Card>
              <Button asChild variant="accent" size="lg">
                <Link href="/studio"><Play className="h-4 w-4" /> Open growth studio</Link>
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>

      <AnimatePresence />
      <PlaybookManager />
    </div>
  );
}
