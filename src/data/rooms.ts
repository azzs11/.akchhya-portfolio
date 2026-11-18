export type RoomKey = 'technobrat' | 'researcher' | 'product' | 'caterpillar' | 'organiser';

export interface Room {
  key: RoomKey;
  /** playful name, shown on cards and as a hint */
  name: string;
  /** plain label, used in nav, page titles and search */
  label: string;
  href: string;
  intro: string;
}

export const rooms: Room[] = [
  {
    key: 'technobrat',
    name: 'the technobrat',
    label: 'engineering & projects',
    href: '/build',
    intro: 'things i built that didn’t fall over. mostly.',
  },
  {
    key: 'researcher',
    name: 'the researcher',
    label: 'research',
    href: '/research',
    intro: 'i like data that’s messy, incomplete and hiding something.',
  },
  {
    key: 'product',
    name: 'the product nerd',
    label: 'product & growth',
    href: '/product',
    intro: 'i make people care about products. sometimes in 280 characters.',
  },
  {
    key: 'caterpillar',
    name: 'the creative caterpillar',
    label: 'writing & art',
    href: '/reading-room',
    intro: 'essays, poems, sketches. the part of me that isn’t optimising anything.',
  },
  {
    key: 'organiser',
    name: 'the organiser',
    label: 'community & organising',
    href: '/organiser',
    intro: 'newsletters, communities, and getting 40 people into one room on time.',
  },
];

export const roomKeys = rooms.map((r) => r.key);

export function roomForPath(pathname: string): Room | undefined {
  return rooms.find((r) => pathname === r.href || pathname.startsWith(`${r.href}/`));
}

export const contact = {
  email: 'hi@akchhya.xyz',
  github: 'https://github.com/azzs11',
  medium: 'https://medium.com/@akchhya1108',
};
