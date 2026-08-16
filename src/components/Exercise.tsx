"use client";

import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { Play, Loader2, CheckCircle2, XCircle } from "lucide-react";

type TestCase = { stdin?: string; expected: string; label: string };
type TestResult = { pass: boolean; actual: string; expected: string; stderr: string; error?: string };

export function Exercise({
  prompt,
  starterCode,
  tests,
}: {
  prompt: string;
  starterCode: string;
  tests: TestCase[];
}) {
  const [code, setCode] = useState(starterCode.trim());
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [running, setRunning] = useState(false);

  async function check() {
    setRunning(true);
    setResults(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code, tests }),
      });
      const data = await res.json();
      setResults(data.results ?? null);
    } finally {
      setRunning(false);
    }
  }

  const allPassed = results?.every((r) => r.pass);

  return (
    <div className="my-6 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden not-prose">
      <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 text-sm">
        <span className="font-semibold text-amber-700 dark:text-amber-400">Exercise. </span>
        {prompt}
      </div>
      <CodeEditor value={code} onChange={setCode} minHeight="160px" />
      <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 px-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
        <button
          onClick={check}
          disabled={running}
          className="flex items-center gap-1.5 rounded bg-neutral-900 dark:bg-neutral-100 hover:opacity-90 disabled:opacity-60 text-white dark:text-neutral-900 text-xs font-medium px-3 py-1.5 transition-opacity"
        >
          {running ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
          {running ? "Checking…" : "Check My Code"}
        </button>
        {results && (
          <span className={`text-xs font-medium ${allPassed ? "text-emerald-600" : "text-red-500"}`}>
            {results.filter((r) => r.pass).length} / {results.length} tests passed
          </span>
        )}
      </div>
      {results && (
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs font-mono">
          {results.map((r, i) => (
            <div key={i} className="px-3 py-2 flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                {r.pass ? (
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                ) : (
                  <XCircle size={13} className="text-red-500 shrink-0" />
                )}
                <span>{tests[i]?.label ?? `Test ${i + 1}`}</span>
              </div>
              {!r.pass && (
                <div className="ml-5 text-neutral-500">
                  {r.error || r.stderr ? (
                    <div className="text-red-400 whitespace-pre-wrap">{r.error || r.stderr}</div>
                  ) : (
                    <>
                      <div>expected: <span className="text-neutral-800 dark:text-neutral-200">{r.expected}</span></div>
                      <div>got: <span className="text-neutral-800 dark:text-neutral-200">{r.actual}</span></div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
