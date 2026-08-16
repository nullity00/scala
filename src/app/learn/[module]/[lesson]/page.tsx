import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readLessonFile } from "@/lib/content";
import { findLesson, adjacentLessons, allLessonParams } from "@/lib/syllabus";
import { TryIt } from "@/components/TryIt";
import { Exercise } from "@/components/Exercise";
import { Quiz } from "@/components/Quiz";
import { ArrowLeft, ArrowRight } from "lucide-react";

const mdxComponents = { TryIt, Exercise, Quiz };

export function generateStaticParams() {
  return allLessonParams();
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const found = findLesson(moduleSlug, lessonSlug);
  const file = readLessonFile(moduleSlug, lessonSlug);
  if (!found || !file) notFound();

  const { prev, next } = adjacentLessons(moduleSlug, lessonSlug);

  return (
    <article className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none">
      <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">{found.mod.title}</p>
      <h1>{found.lesson.title}</h1>
      {/* blockJS is safe to disable: lesson content lives in /content and is authored by us, not user input */}
      <MDXRemote source={file.body} components={mdxComponents} options={{ blockJS: false }} />

      <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 not-prose text-sm">
        {prev ? (
          <Link href={`/learn/${prev.moduleSlug}/${prev.slug}`} className="flex items-center gap-1 text-neutral-500 hover:text-emerald-600">
            <ArrowLeft size={14} /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.moduleSlug}/${next.slug}`} className="flex items-center gap-1 text-emerald-600 font-medium hover:underline">
            {next.title} <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
