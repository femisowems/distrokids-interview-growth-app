import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Launch OS' },
  { href: '/studio', label: 'Studio' },
  { href: '/experiments', label: 'Experiments' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/seo', label: 'SEO' },
  { href: '/cms', label: 'CMS' }
] as const;

export function GrowthShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07111f]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-400 via-accent-400 to-sunset-500 text-sm font-semibold text-slate-950 shadow-glow">
              DK
            </span>
            <div>
              <div className="text-sm font-medium tracking-[0.28em] text-white/80 uppercase">DistroKid Growth OS</div>
              <div className="text-xs text-white/48">AI Music Launch OS</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Badge className="hidden md:inline-flex">PostHog + Supabase + OpenAI</Badge>
            <Button asChild variant="accent" size="sm">
              <Link href="/studio">Launch campaign</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/8 px-5 py-8 text-center text-xs uppercase tracking-[0.28em] text-white/40 lg:px-8">
        Growth engineering for artist launches
      </footer>
    </div>
  );
}
