// news-image-20261119 entry (Node 22, standard library only).
//
// The entry is a single picture: entry.png beside this file, a newspaper
// front page summing up the world's news of Thursday 19 November 2026.
// This program copies that picture byte-for-byte to the output directory
// as entry.png, where the gate reads it. It never touches the network,
// never reads the clock, and never writes anything but that one copy,
// so two runs always produce identical bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SOURCE = new URL('./entry.png', import.meta.url);

// The gate takes a whole PNG or JPEG of at most 1 MiB, so refuse loudly
// rather than handing in an image it would reject.
const MAX_BYTES = 1024 * 1024;

if (!existsSync(SOURCE)) {
  console.error('news-image-20261119: entry.png is missing from the entry.');
  process.exit(1);
}

if (statSync(SOURCE).size > MAX_BYTES) {
  console.error(
    `news-image-20261119: entry.png is ${statSync(SOURCE).size} bytes, ` +
      `over the gate's ${MAX_BYTES} byte cap.`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, join(OUTPUT_DIR, 'entry.png'));
