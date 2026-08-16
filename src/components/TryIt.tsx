"use client";

import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { Play, Loader2 } from "lucide-react";

export function TryIt({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode.trim());
  const [output, setOutput] = useState<{ stdout: string; stderr: string; error?: string } | null>(null);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    setOutput(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      setOutput(await res.json());
    } catch {
      setOutput({ stdout: "", stderr: "", error: "Network error contacting the sandbox." });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="my-6 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden not-prose">
      <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-500">Try it Yourself</span>
        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-medium px-3 py-1.5 transition-colors"
        >
          {running ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
          {running ? "Running…" : "Run"}
        </button>
      </div>
      <CodeEditor value={code} onChange={setCode} />
      {output && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-100 px-3 py-2 text-xs font-mono whitespace-pre-wrap">
          {output.error && <div className="text-amber-400">{output.error}</div>}
          {output.stdout && <div>{output.stdout}</div>}
          {output.stderr && <div className="text-red-400">{output.stderr}</div>}
          {!output.error && !output.stdout && !output.stderr && <div className="text-neutral-500">(no output)</div>}
        </div>
      )}
    </div>
  );
}
