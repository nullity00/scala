import Link from "next/link";
import { Header } from "@/components/Header";
import { TryIt } from "@/components/TryIt";
import { syllabus } from "@/lib/syllabus";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Learn Scala by Doing</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
            Short lessons, runnable examples, and instant-feedback exercises against a real JVM
            sandbox — no install required.
          </p>
          <Link
            href="/learn/getting-started/what-is-scala"
            className="inline-flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5"
          >
            Start Learning <ArrowRight size={15} />
          </Link>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16">
          <TryIt initialCode={`@main def run(): Unit =\n  val languages = List("Scala", "Java", "Kotlin")\n  println(languages.filter(_.startsWith("S")))`} />
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-20">
          <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {syllabus.map((mod) => {
              const firstAvailable = mod.lessons.find((l) => l.available);
              const content = (
                <>
                  <h3 className="font-medium text-sm mb-0.5">{mod.title}</h3>
                  <p className="text-xs text-neutral-500">{mod.summary}</p>
                </>
              );
              return firstAvailable ? (
                <Link
                  key={mod.slug}
                  href={`/learn/${mod.slug}/${firstAvailable.slug}`}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:border-emerald-500 transition-colors"
                >
                  {content}
                </Link>
              ) : (
                <div key={mod.slug} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 opacity-50">
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500">
        Built with Next.js. Curriculum modeled on the{" "}
        <a href="https://roadmap.sh/scala" className="underline hover:text-emerald-600">
          roadmap.sh/scala
        </a>{" "}
        learning path.
      </footer>
    </div>
  );
}
