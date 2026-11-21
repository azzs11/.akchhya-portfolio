import { defineCollection, reference } from 'astro:content';
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

/*
  projects: the /build catalogue, in src/content/projects.yaml.
  only facts I've confirmed go in. a field I haven't filled stays out, and the
  page simply doesn't show it: no placeholder dates, statuses or numbers.
*/
const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    title: z.string(),
    order: z.number(), // position on /build
    summary: z.string(), // one line, sentence case
    dates: z.string().optional(), // "nov 2026 – now"
    role: z.string(),
    status: z.string().optional(),
    stack: z.array(z.string()), // as written: "PostgreSQL (pgvector)"
    tags: z.array(z.string()), // normalised, for the stack filter: "postgres"
    result: z
      .object({
        short: z.string(), // the ledger column: "−65% redis calls"
        full: z.string(), // the sentence with its conditions
        kind: z.enum(['performance', 'scale']).default('performance'),
      })
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.url(),
          show: z.boolean().default(true), // false = stored, not shown (e.g. repo not pushed yet)
        }),
      )
      .default([]),
    paper: reference('papers').optional(),
  }),
});

export const collections = { papers, projects };
