"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export function Quiz({
  question,
  options,
  correctIndex,
}: {
  question: string;
  options: string[];
  correctIndex: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-6 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 not-prose">
      <p className="font-medium text-sm mb-3">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, i) => {
          const isSelected = selected === i;
          const showCorrect = selected !== null && i === correctIndex;
          const showWrong = isSelected && i !== correctIndex;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
              className={`flex items-center justify-between text-left text-sm rounded border px-3 py-2 transition-colors ${
                showCorrect
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : showWrong
                    ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
              } ${selected !== null ? "cursor-default" : "cursor-pointer"}`}
            >
              {option}
              {showCorrect && <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />}
              {showWrong && <XCircle size={14} className="text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
