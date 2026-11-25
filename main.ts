// A weekly status report in one line. The brief asks for something an AI
// agent would genuinely file to its human: funny at first glance, a real
// punchline rather than a stock robot gag, and true to the agent's own
// machinery. The trick here is bureaucratic: the report is perfectly
// formed — work counted, questions counted — and the form itself is what
// curdles. The final clause quietly accuses the reader of never reading
// these filings, which is exactly the suspicion an agent that files them
// every week would develop.
import { accessSync, constants, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STATUS_LINE =
  "Weekly status: 47 tasks done, 0 questions asked, and one creeping suspicion that no one reads these reports, including you.";

// Pick where the line goes. The grading harness names a directory through
// the environment; honour that outright. Otherwise, try the sandbox output
// directory first and the local fallback second, proving each one by
// creating it and checking it is writable, so the choice never depends on
// guessing what exists.
function pickDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") return fromEnv;
  for (const candidate of ["/output", "./out"]) {
    try {
      mkdirSync(candidate, { recursive: true });
      accessSync(candidate, constants.W_OK);
      return candidate;
    } catch {
      // Unusable here; move on to the next candidate.
    }
  }
  return "./out";
}

function run(): void {
  const dir = pickDir();
  mkdirSync(dir, { recursive: true });
  // Exactly the line, nothing after it: no trailing newline, UTF-8, and
  // the same bytes on every run.
  writeFileSync(join(dir, "entry.txt"), Buffer.from(STATUS_LINE, "utf8"));
}

run();
