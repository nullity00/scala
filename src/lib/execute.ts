const EXECUTE_API_URL = process.env.EXECUTE_API_URL ?? "https://emkc.org/api/v2/piston/execute";
const SCALA_VERSION = process.env.SCALA_VERSION ?? "*";
const MAX_CODE_LENGTH = 20_000;
const RUN_TIMEOUT_MS = 10_000;

export type ExecutionResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  error?: string;
};

export async function runScala(code: string, stdin = ""): Promise<ExecutionResult> {
  if (code.length > MAX_CODE_LENGTH) {
    return { stdout: "", stderr: "", exitCode: null, error: "Code exceeds maximum length." };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RUN_TIMEOUT_MS);

  try {
    const res = await fetch(EXECUTE_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        language: "scala",
        version: SCALA_VERSION,
        files: [{ name: "main.scala", content: code }],
        stdin,
        compile_timeout: 15_000,
        run_timeout: 5_000,
      }),
    });

    if (!res.ok) {
      return { stdout: "", stderr: "", exitCode: null, error: `Execution backend returned ${res.status}` };
    }

    const data = await res.json();
    const compile = data.compile;
    const run = data.run;

    if (compile?.code && compile.code !== 0) {
      return { stdout: "", stderr: compile.stderr || compile.output || "Compilation failed.", exitCode: compile.code };
    }

    return {
      stdout: run?.stdout ?? "",
      stderr: run?.stderr ?? "",
      exitCode: run?.code ?? null,
    };
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError";
    return { stdout: "", stderr: "", exitCode: null, error: timedOut ? "Execution timed out." : "Execution backend unreachable." };
  } finally {
    clearTimeout(timeout);
  }
}

const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

/** Process-local rate limit; swap for a Redis-backed limiter across serverless instances in production. */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return true;
}
