import Link from "next/link";

export function Header() {
  return (
    <header className="h-14 shrink-0 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4">
      <Link href="/" className="font-semibold text-lg">
        <span className="text-emerald-600">Scala</span>School
      </Link>
      <nav className="flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-400">
        <Link href="/learn/getting-started/what-is-scala" className="hover:text-emerald-600">
          Tutorial
        </Link>
        <Link href="/reference" className="hover:text-emerald-600">
          Reference
        </Link>
        <Link href="/exercises" className="hover:text-emerald-600">
          Exercises
        </Link>
      </nav>
    </header>
  );
}
