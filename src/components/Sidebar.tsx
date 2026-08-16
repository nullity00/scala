"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { syllabus } from "@/lib/syllabus";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 h-full overflow-y-auto text-sm">
      <div className="flex flex-col py-3">
        {syllabus.map((mod) => (
          <div key={mod.slug} className="px-3 py-1.5">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 px-2 py-1 text-xs uppercase tracking-wide">
              {mod.title}
            </div>
            <div className="flex flex-col">
              {mod.lessons.map((lesson) => {
                const href = `/learn/${mod.slug}/${lesson.slug}`;
                const active = pathname === href;
                if (!lesson.available) {
                  return (
                    <span
                      key={lesson.slug}
                      className="px-2 py-1 rounded text-neutral-400 dark:text-neutral-600 cursor-default"
                      title="Coming soon"
                    >
                      {lesson.title}
                    </span>
                  );
                }
                return (
                  <Link
                    key={lesson.slug}
                    href={href}
                    className={`px-2 py-1 rounded transition-colors ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`}
                  >
                    {lesson.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
