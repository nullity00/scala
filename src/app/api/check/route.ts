import { NextRequest, NextResponse } from "next/server";
import { runScala, checkRateLimit } from "@/lib/execute";

type TestCase = { stdin?: string; expected: string };

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.code !== "string" || !Array.isArray(body.tests)) {
    return NextResponse.json({ error: "Expected { code: string, tests: TestCase[] }." }, { status: 400 });
  }

  const tests = body.tests as TestCase[];
  const results = [];
  for (const test of tests) {
    const result = await runScala(body.code, test.stdin ?? "");
    const actual = result.stdout.trim();
    const expected = test.expected.trim();
    results.push({
      pass: !result.error && result.exitCode === 0 && actual === expected,
      actual,
      expected,
      stderr: result.stderr,
      error: result.error,
    });
  }

  return NextResponse.json({ allPassed: results.every((r) => r.pass), results });
}
