import type { CollectionEntry } from 'astro:content';

type Paper = CollectionEntry<'papers'>;

const entryType = { conference: 'inproceedings', journal: 'article', preprint: 'misc' } as const;

/** a bibtex record built from the papers collection; the entry id is the key */
export function bibtex({ id, data: p }: Paper): string {
  const fields: [string, string | undefined][] = [
    ['title', `{${p.title}}`], // double braces keep the capitalisation
    ['author', p.authors.map((a) => `${a.family}, ${a.given}`).join(' and ')],
    [p.kind === 'journal' ? 'journal' : 'booktitle', p.venue],
    ['address', p.place],
    ['publisher', p.publisher],
    ['pages', p.pages?.replace('-', '--')],
    ['year', String(p.year)],
    ['doi', p.doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n');
  return `@${entryType[p.kind]}{${id},\n${body}\n}`;
}

/** "rani, singh, anand, narayanan, joby", lowercase for the ui */
export function byline(p: Paper['data']): string {
  return p.authors.map((a) => a.family.toLowerCase()).join(', ');
}
