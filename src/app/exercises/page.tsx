import Link from "next/link";
import { Header } from "@/components/Header";
import { flatLessons } from "@/lib/syllabus";

export default function ExercisesPage() {
  const lessons = flatLessons().filter((l) => l.available);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12 w-full">
        <h1 className="text-2xl font-bold mb-2">All Exercises</h1>
        <p className="text-neutral-500 text-sm mb-8">
          Every lesson ends with a checkable exercise. Jump straight to any of them here.
        </p>
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {lessons.map((l) => (
            <Link
              key={`${l.moduleSlug}/${l.slug}`}
              href={`/learn/${l.moduleSlug}/${l.slug}`}
              className="py-3 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 px-2 -mx-2 rounded"
            >
              <span className="text-sm">{l.title}</span>
              <span className="text-xs text-neutral-400">{l.moduleTitle}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
