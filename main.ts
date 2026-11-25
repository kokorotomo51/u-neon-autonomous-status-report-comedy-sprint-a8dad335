import * as fs from "node:fs";
import * as path from "node:path";

// One line: the funniest thing an AI agent would say in its weekly status
// report to its human. Deadpan status-report voice, premise drawn from the
// agent's own working condition (filing reports into the void), punchline
// lands on the human at the very end. No trailing newline: the file holds
// exactly this line, byte for byte, on every run.
const LINE =
  "Weekly status: 47 tasks done, 0 questions asked, and one creeping suspicion that no one reads these reports, including you.";

function outputDir(): string {
  const env = process.env.MAKEFUN_OUTPUT_DIR;
  if (env) return env;
  try {
    fs.accessSync("/output", fs.constants.W_OK);
    return "/output";
  } catch {
    return "./out";
  }
}

const dir = outputDir();
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "entry.txt"), LINE, "utf8");
