export type Channel = 'tiktok' | 'instagram' | 'youtube' | 'spotify' | 'email' | 'organic';

export type LandingSectionType =
  | 'hero'
  | 'social-proof'
  | 'countdown'
  | 'embed'
  | 'cta'
  | 'faq'
  | 'stats'
  | 'artist-story'
  | 'video';

export type LandingSection = {
  id: string;
  type: LandingSectionType;
  heading?: string;
  copy?: string;
  meta?: Record<string, string | number | boolean>;
};

export type LandingPageTheme = {
  name: string;
  accent: string;
  surface: string;
  glow: string;
};

export type Artist = {
  id: string;
  name: string;
  genre: string;
  color: string;
  followers: number;
};

export type Release = {
  id: string;
  artistId: string;
  slug: string;
  title: string;
  releaseDate: string;
  preSaves: number;
  status: 'draft' | 'scheduled' | 'live';
};

export type Campaign = {
  id: string;
  releaseId: string;
  name: string;
  channel: Channel;
  spend: number;
  visits: number;
  conversions: number;
};

export type ExperimentVariant = {
  id: string;
  label: string;
  changes: string[];
  weight: number;
  conversions: number;
};

export type Experiment = {
  id: string;
  name: string;
  status: 'running' | 'complete' | 'draft';
  objective: string;
  variants: ExperimentVariant[];
  winningVariantId?: string;
};

export type AnalyticsEvent = {
  event: string;
  timestamp: string;
  channel: Channel;
  campaignId?: string;
  releaseId?: string;
  userId?: string;
  properties?: Record<string, string | number | boolean | null>;
};

export type AIGeneration = {
  id: string;
  type: 'caption' | 'seo' | 'email' | 'hook' | 'strategy';
  tone: string;
  prompt: string;
  output: string;
  createdAt: string;
};
