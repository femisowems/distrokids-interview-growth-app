'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { landingThemes } from '@/lib/mock';
import { buildPrompt } from '@/lib/ai';
import { trackEvent } from '@/lib/analytics';

const schema = z.object({
  artist: z.string().min(2),
  releaseTitle: z.string().min(2),
  audience: z.string().min(2),
  goal: z.string().min(2)
});

type FormValues = z.infer<typeof schema>;

const workflowSteps = ['Brief', 'Generate', 'Review'] as const;

export function CampaignComposer() {
  const [result, setResult] = useState('Select a campaign goal and generate a launch brief.');
  const [status, setStatus] = useState<'ready' | 'generating' | 'done'>('ready');
  const [savedId, setSavedId] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      artist: 'Nova Rue',
      releaseTitle: 'Afterimage',
      audience: 'alt-pop listeners on TikTok',
      goal: 'drive pre-saves and email signups'
    }
  });

  const prompt = useMemo(
    () => buildPrompt('strategy', form.watch('releaseTitle'), form.watch('goal')),
    [form]
  );

  async function onSubmit(values: FormValues) {
    setStatus('generating');
    const tone = landingThemes[0].name;
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Create a release launch brief for ${values.artist} releasing ${values.releaseTitle}. Goal: ${values.goal}. Audience: ${values.audience}.`,
        tone,
        outputType: 'strategy',
        audience: values.audience
      })
    });

    const data = await response.json();
    setResult(data.result.body);
    setStatus('done');
    trackEvent('campaign_brief_generated', { artist: values.artist, releaseTitle: values.releaseTitle });
  }

  async function saveDraft() {
    const values = form.getValues();
    setStatus('generating');
    const res = await fetch('/api/briefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        artist: values.artist,
        releaseTitle: values.releaseTitle,
        audience: values.audience,
        goal: values.goal,
        result,
        status: 'draft'
      })
    });

    if (res.ok) {
      const data = await res.json();
      setSavedId(data.id);
      setStatus('done');
    } else {
      setStatus('ready');
    }
  }

  async function publishBrief() {
    const values = form.getValues();
    setStatus('generating');
    const res = await fetch('/api/briefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        artist: values.artist,
        releaseTitle: values.releaseTitle,
        audience: values.audience,
        goal: values.goal,
        result,
        status: 'published'
      })
    });

    if (res.ok) {
      const data = await res.json();
      setSavedId(data.id);
      setStatus('done');
    } else {
      setStatus('ready');
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-neon-400" /> Campaign composer</CardTitle>
              <CardDescription>Generate a launch brief with AI and wire it into the release workflow.</CardDescription>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/54">
              {status === 'ready' ? 'Ready to generate' : status === 'generating' ? 'Generating brief' : 'Brief ready'}
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-3">
            {workflowSteps.map((step, index) => {
              const active = (status === 'ready' && index === 0) || (status === 'generating' && index <= 1) || (status === 'done' && index <= 2);

              return (
                <div
                  key={step}
                  className={`rounded-2xl border px-3 py-2 text-sm transition ${active ? 'border-neon-400/30 bg-neon-400/10 text-white' : 'border-white/8 bg-white/5 text-white/48'}`}
                >
                  <div className="text-[10px] uppercase tracking-[0.28em]">Step {index + 1}</div>
                  <div className="mt-1">{step}</div>
                </div>
              );
            })}
          </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('artist')} placeholder="Artist" />
            <Input {...form.register('releaseTitle')} placeholder="Release title" />
            <Input {...form.register('audience')} placeholder="Audience" />
            <Textarea {...form.register('goal')} placeholder="Primary goal" />
            <div className="grid gap-2 sm:grid-cols-3">
              <Button type="submit" variant="accent" className="w-full" disabled={status === 'generating'}>
                <CalendarDays className="h-4 w-4" />
                {status === 'generating' ? 'Generating brief...' : 'Generate launch brief'}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={saveDraft} disabled={status === 'generating'}>Save draft</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={publishBrief} disabled={status === 'generating'}>Publish</Button>
            </div>
          </form>
          <div className="text-xs uppercase tracking-[0.3em] text-white/36">Prompt preview</div>
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/72">{prompt}</div>
        </CardBody>
      </Card>

      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Editable output</CardTitle>
              <CardDescription>Use this draft as a launch brief, email source doc, or SEO plan.</CardDescription>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/54">
              {status === 'done' ? 'Synced to launch plan' : 'Live preview'}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(125,249,255,0.08),rgba(255,255,255,0.03))] p-6 text-sm leading-7 text-white/84">
            {result}
            {savedId && (
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-3 text-sm">
                Saved: <a className="text-accent-400 underline" href={`/cms`}>Brief {savedId}</a>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
