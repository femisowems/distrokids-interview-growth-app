import type { AIGeneration, AnalyticsEvent, Artist, Campaign, Experiment, LandingPageTheme, LandingSection, Release } from '@/lib/types';

export const artists: Artist[] = [
  { id: 'artist-1', name: 'Nova Rue', genre: 'Alt-pop', color: '#7df9ff', followers: 182400 },
  { id: 'artist-2', name: 'Mira Slate', genre: 'Indie R&B', color: '#ff7a59', followers: 98400 },
  { id: 'artist-3', name: 'Sable Theory', genre: 'Electronic', color: '#9b8cff', followers: 221300 }
];

export const releases: Release[] = [
  { id: 'release-1', artistId: 'artist-1', slug: 'afterimage', title: 'Afterimage', releaseDate: '2026-06-07', preSaves: 8921, status: 'live' },
  { id: 'release-2', artistId: 'artist-2', slug: 'soft-static', title: 'Soft Static', releaseDate: '2026-06-12', preSaves: 5410, status: 'scheduled' },
  { id: 'release-3', artistId: 'artist-3', slug: 'night-driver', title: 'Night Driver', releaseDate: '2026-06-21', preSaves: 12418, status: 'draft' }
];

export const campaigns: Campaign[] = [
  { id: 'campaign-1', releaseId: 'release-1', name: 'TikTok pre-save burst', channel: 'tiktok', spend: 8400, visits: 40210, conversions: 4812 },
  { id: 'campaign-2', releaseId: 'release-1', name: 'Retargeting sequencer', channel: 'instagram', spend: 2600, visits: 18420, conversions: 2110 },
  { id: 'campaign-3', releaseId: 'release-2', name: 'Spotify canvas launch', channel: 'spotify', spend: 4100, visits: 16150, conversions: 1864 }
];

export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    name: 'Hero headline test',
    status: 'running',
    objective: 'Increase pre-save conversion rate',
    variants: [
      { id: 'variant-a', label: 'Signal', changes: ['Sharper headline', 'Primary CTA'], weight: 50, conversions: 322 },
      { id: 'variant-b', label: 'Atmosphere', changes: ['Editorial lead', 'Embedded social proof'], weight: 50, conversions: 418 }
    ],
    winningVariantId: 'variant-b'
  },
  {
    id: 'exp-2',
    name: 'CTA color test',
    status: 'complete',
    objective: 'Lift click-through on mobile',
    variants: [
      { id: 'variant-c', label: 'Neon', changes: ['Electric cyan CTA'], weight: 50, conversions: 521 },
      { id: 'variant-d', label: 'Sunset', changes: ['Coral CTA'], weight: 50, conversions: 463 }
    ],
    winningVariantId: 'variant-c'
  }
];

export const analyticsEvents: AnalyticsEvent[] = [
  { event: 'page_view', timestamp: '2026-05-24T10:02:00Z', channel: 'tiktok', campaignId: 'campaign-1', releaseId: 'release-1' },
  { event: 'cta_click', timestamp: '2026-05-24T10:02:12Z', channel: 'tiktok', campaignId: 'campaign-1', releaseId: 'release-1' },
  { event: 'email_submit', timestamp: '2026-05-24T10:03:11Z', channel: 'organic', releaseId: 'release-1' },
  { event: 'pre_save', timestamp: '2026-05-24T10:04:02Z', channel: 'tiktok', campaignId: 'campaign-1', releaseId: 'release-1' }
];

export const aiGenerations: AIGeneration[] = [
  {
    id: 'gen-1',
    type: 'caption',
    tone: 'confident',
    prompt: 'Create a TikTok caption for a cinematic alt-pop release.',
    output: 'This is your midnight signal. New release afterimage out now. Save it before it disappears.',
    createdAt: '2026-05-24T10:10:00Z'
  },
  {
    id: 'gen-2',
    type: 'seo',
    tone: 'editorial',
    prompt: 'Generate landing page SEO metadata for a release page.',
    output: 'Afterimage by Nova Rue | Pre-save the new alt-pop release with cinematic visuals and fan-first launch strategy.',
    createdAt: '2026-05-24T10:15:00Z'
  }
];

export const landingSections: LandingSection[] = [
  { id: 'hero', type: 'hero', heading: 'Afterimage', copy: 'Cinematic launch page with AI-built growth assets and live conversion intelligence.', meta: { countdown: '3 days', artist: 'Nova Rue' } },
  { id: 'proof', type: 'social-proof', heading: 'Momentum', copy: 'Built to turn traffic into presaves, fans, and retargetable audiences.', meta: { saves: 8921, lift: 41 } },
  { id: 'embed', type: 'embed', heading: 'Soundcheck', copy: 'Spotify and TikTok embeds with motion-first presentation.' },
  { id: 'cta', type: 'cta', heading: 'Pre-save the release', copy: 'Collect fan intent before the drop and route that signal into your growth stack.' }
];

export const landingThemes: LandingPageTheme[] = [
  { name: 'Midnight Neon', accent: '#7df9ff', surface: '#0d1b31', glow: 'rgba(125,249,255,0.22)' },
  { name: 'Sunset Runway', accent: '#ff7a59', surface: '#23151c', glow: 'rgba(255,122,89,0.24)' },
  { name: 'Electric Mono', accent: '#a78bfa', surface: '#151525', glow: 'rgba(167,139,250,0.22)' }
];
