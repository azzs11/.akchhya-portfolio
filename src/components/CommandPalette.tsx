import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { contact, roomForPath, rooms } from '../data/rooms';
import { getTheme, toggleTheme } from '../scripts/theme';

export type PaletteMode = 'open' | 'toggle';

const item =
  'flex cursor-pointer items-center justify-between gap-4 rounded-sticker px-3 py-2 text-small ' +
  'data-[selected=true]:bg-accent data-[selected=true]:text-on-accent';

export default function CommandPalette({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const [night, setNight] = useState(() => getTheme() === 'night');

  useEffect(() => {
    const onPalette = (e: Event) => {
      const mode = (e as CustomEvent<PaletteMode>).detail;
      setOpen((o) => (mode === 'toggle' ? !o : true));
    };
    const onTheme = () => setNight(getTheme() === 'night');
    window.addEventListener('palette', onPalette);
    document.addEventListener('themechange', onTheme);
    return () => {
      window.removeEventListener('palette', onPalette);
      document.removeEventListener('themechange', onTheme);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    window.location.href = href;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      go(`mailto:${contact.email}`);
    }
  };

  const surprise = () => {
    const here = roomForPath(window.location.pathname)?.key;
    const others = rooms.filter((r) => r.key !== here);
    go(others[Math.floor(Math.random() * others.length)].href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="command palette"
      overlayClassName="fixed inset-0 z-50 bg-ink/50"
      contentClassName="fixed top-[12vh] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-card border-2 border-line bg-surface text-text shadow-cut-lg"
    >
      <Command.Input
        placeholder="go anywhere…"
        className="w-full border-b-2 border-line bg-transparent px-4 py-3 text-body outline-none placeholder:text-text/60"
      />
      <Command.List className="max-h-[min(60vh,24rem)] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-small">nothing here. try “research”.</Command.Empty>

        <Command.Group heading="rooms">
          <Command.Item className={item} onSelect={() => go('/')} keywords={['home', 'start']}>
            home
          </Command.Item>
          {rooms.map((r) => (
            <Command.Item key={r.key} className={item} onSelect={() => go(r.href)} keywords={[r.name, r.key]}>
              <span>{r.label}</span>
              <span className="label opacity-70">{r.name}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="do something">
          <Command.Item className={item} onSelect={copyEmail} keywords={['email', 'contact', 'mail']}>
            <span>{copied ? 'copied!' : 'copy email'}</span>
            <span className="label opacity-70">{contact.email}</span>
          </Command.Item>
          <Command.Item className={item} onSelect={toggleTheme} keywords={['theme', 'dark', 'light', 'night', 'day']}>
            {night ? 'switch to day' : 'switch to night'}
          </Command.Item>
          <Command.Item className={item} onSelect={surprise} keywords={['random']}>
            surprise me
          </Command.Item>
        </Command.Group>

        <Command.Group heading="elsewhere">
          <Command.Item className={item} onSelect={() => go(contact.github)}>
            github
          </Command.Item>
          <Command.Item className={item} onSelect={() => go(contact.medium)}>
            medium
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
