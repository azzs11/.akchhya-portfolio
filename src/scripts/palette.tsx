// Loaded on first Ctrl+K or palette click, so React stays off the initial page load.
import { createRoot } from 'react-dom/client';
import CommandPalette, { type PaletteMode } from '../components/CommandPalette';

let mounted = false;

export function openPalette(mode: PaletteMode = 'open') {
  if (!mounted) {
    mounted = true;
    const el = document.createElement('div');
    document.body.append(el);
    createRoot(el).render(<CommandPalette defaultOpen />);
    return;
  }
  window.dispatchEvent(new CustomEvent<PaletteMode>('palette', { detail: mode }));
}
