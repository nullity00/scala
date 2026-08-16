import { Header } from "@/components/Header";

const entries = [
  { sig: "list.map(f)", desc: "Apply f to every element, returning a new list." },
  { sig: "list.filter(p)", desc: "Keep elements where predicate p is true." },
  { sig: "list.reduce(f)", desc: "Combine all elements with f; requires a non-empty list." },
  { sig: "list.foldLeft(z)(f)", desc: "Combine elements left-to-right starting from z." },
  { sig: "option.getOrElse(d)", desc: "Unwrap Some(x) to x, or fall back to default d for None." },
  { sig: "option.map(f)", desc: "Apply f inside Some, leave None untouched." },
  { sig: "case class(...).copy(...)", desc: "Create a modified duplicate of a case class instance." },
  { sig: "s\"...${expr}...\"", desc: "String interpolation — embed expressions in a string literal." },
];

export default function ReferencePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-bold mb-2">Scala Reference</h1>
        <p className="text-neutral-500 text-sm mb-8">
          A quick-lookup cheat sheet for the standard library methods covered in this course. Grows
          alongside the tutorial content.
        </p>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {entries.map((e) => (
            <div key={e.sig} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <code className="text-sm font-mono text-emerald-700 dark:text-emerald-400 sm:w-56 shrink-0">{e.sig}</code>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{e.desc}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
