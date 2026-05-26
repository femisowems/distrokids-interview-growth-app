'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
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

export function CampaignComposer() {
  const [result, setResult] = useState('Select a campaign goal and generate a launch brief.');
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

  async function generateBrief(values: FormValues) {
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
    trackEvent('campaign_brief_generated', { artist: values.artist, releaseTitle: values.releaseTitle });
    return data.result.body as string;
  }

  async function onSubmit(values: FormValues) {
    await generateBrief(values);
  }

  async function publishBrief(summary: string, values: FormValues) {
    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artist: values.artist,
          releaseTitle: values.releaseTitle,
          audience: values.audience,
          goal: values.goal,
          summary,
          publishedAt: new Date().toISOString()
        })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  const searchParams = useSearchParams();
  const ranPlaybook = useRef(false);

  useEffect(() => {
    try {
      const playbook = searchParams?.get('playbook');
      const autopublish = searchParams?.get('autopublish');
      if (playbook === '1' && !ranPlaybook.current) {
        ranPlaybook.current = true;
        const values: FormValues = {
          artist: form.getValues('artist') || 'Nova Rue',
          releaseTitle: form.getValues('releaseTitle') || 'Afterimage',
          audience: form.getValues('audience') || 'alt-pop listeners on TikTok',
          goal: form.getValues('goal') || 'drive pre-saves and email signups'
        };
        form.reset(values);
        (async () => {
          const summary = await generateBrief(values);
          if (autopublish === '1') {
            await publishBrief(summary, values);
          }
        })();
      }
    } catch (e) {
      // ignore
    }
  }, [searchParams]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-neon-400" /> Campaign composer</CardTitle>
          <CardDescription>Generate a launch brief with AI and wire it into the release workflow.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('artist')} placeholder="Artist" />
            <Input {...form.register('releaseTitle')} placeholder="Release title" />
            <Input {...form.register('audience')} placeholder="Audience" />
            <Textarea {...form.register('goal')} placeholder="Primary goal" />
            <Button type="submit" variant="accent" className="w-full"><CalendarDays className="h-4 w-4" /> Generate launch brief</Button>
          </form>
          <div className="text-xs uppercase tracking-[0.3em] text-white/36">Prompt preview</div>
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/72">{prompt}</div>
        </CardBody>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Editable output</CardTitle>
          <CardDescription>Use this draft as a launch brief, email source doc, or SEO plan.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(125,249,255,0.08),rgba(255,255,255,0.03))] p-6 text-sm leading-7 text-white/84">
            {result}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
