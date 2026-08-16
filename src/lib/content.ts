import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type LessonFile = {
  frontmatter: { title?: string; summary?: string };
  body: string;
};

export function readLessonFile(moduleSlug: string, lessonSlug: string): LessonFile | null {
  const filePath = path.join(CONTENT_DIR, moduleSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}
