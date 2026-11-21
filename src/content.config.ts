import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/*
  papers: one entry per publication, in src/content/papers.yaml.
  authors are kept in order with given/family names so the bibtex and the
  short "rani, singh, …" byline both come from the same data.
*/
const papers = defineCollection({
  loader: file('src/content/papers.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.object({ given: z.string(), family: z.string(), me: z.boolean().default(false) })),
    kind: z.enum(['conference', 'journal', 'preprint']),
    venue: z.string(), // full proceedings name, used in bibtex
    venueShort: z.string(), // "icicacs 2026"
    place: z.string().optional(),
    dates: z.string().optional(),
    publisher: z.string().optional(),
    pages: z.string().optional(), // "1468-1475"
    year: z.number(),
    doi: z.string().optional(),
    abstract: z.string().optional(),
    presented: z.boolean().default(false), // i gave the talk
    project: z.string().optional(), // slug of the related project, e.g. heritagerec
  }),
});

export const collections = { papers };
