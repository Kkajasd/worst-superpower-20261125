// Worst Superpower — make.fun entry (u-suroto-worst-superpower-461dcdbe).
// Writes one invented useless superpower, a single line of at most
// 140 characters, to /output/entry.txt. No network, no secrets, no
// reading of git history; the entry is a fixed string chosen at build time.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  // The power is genuinely useless: its condition is exactly the normal
  // procedure for using a vending machine, so the "power" adds nothing.
  // One concrete detail (exact change, correct button) fixes the joke in
  // the world, and the deadpan "provided I..." makes the uselessness land
  // in the same breath as the power itself. 132 characters.
  "I can make any vending machine dispense exactly what I want — provided I insert the exact change and press the correct button first.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  // The gate requires 1-140 characters of UTF-8, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140 || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Never delete the output directory (it may be a bind mount in the
  // grader); create it when missing and overwrite the file in place.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY, "utf8");
}

main();
