import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = parseArgs(process.argv.slice(2));
const title = args.title;
const lang = args.lang ?? 'ko';
const kind = args.kind ?? 'post';
const slug = args.slug ?? slugify(title ?? '') ?? `${kind}-${todayCompact()}`;

const kindToDir = {
  post: 'posts',
  note: 'notes',
  project: 'projects',
};

if (!title) {
  exitWithUsage('Missing --title.');
}

if (!['ko', 'en'].includes(lang)) {
  exitWithUsage('--lang must be "ko" or "en".');
}

if (!kindToDir[kind]) {
  exitWithUsage('--kind must be "post", "note", or "project".');
}

const dir = path.join('src', 'content', kindToDir[kind]);
const file = path.join(dir, `${slug}.mdx`);

if (existsSync(file)) {
  throw new Error(`Refusing to overwrite existing file: ${file}`);
}

await mkdir(dir, { recursive: true });
await writeFile(file, template({ title, lang, kind }), 'utf8');

console.log(file);

function parseArgs(values) {
  const parsed = {};

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];

    if (!value.startsWith('--')) {
      continue;
    }

    const key = value.slice(2);
    const next = values[i + 1];

    if (!next || next.startsWith('--')) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    i += 1;
  }

  return parsed;
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || undefined;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function todayCompact() {
  return today().replaceAll('-', '');
}

function template({ title, lang, kind }) {
  return `---
title: "${escapeYaml(title)}"
description: "TODO: one or two concrete sentences."
pubDate: ${today()}
lang: ${lang}
tags: []
draft: true
featured: false
---

## TODO

Write the ${kind} here.
`;
}

function escapeYaml(value) {
  return value.replaceAll('"', '\\"');
}

function exitWithUsage(message) {
  console.error(message);
  console.error('Usage: npm run new:post -- --title "Title" --lang ko --kind post [--slug title-slug]');
  process.exit(1);
}
