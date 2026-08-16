export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  /** true once an .mdx file exists for this lesson under /content */
  available: boolean;
};

export type Module = {
  slug: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

/**
 * Curriculum shape follows the roadmap.sh/scala learning path:
 * environment setup -> syntax basics -> control flow -> functions ->
 * OOP -> functional programming -> collections -> error handling ->
 * concurrency -> tooling/testing -> ecosystem.
 */
export const syllabus: Module[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    summary: "What Scala is, how it relates to the JVM, and setting up a workflow.",
    lessons: [
      { slug: "what-is-scala", title: "What is Scala?", summary: "Scala, the JVM, and why the language exists.", available: true },
      { slug: "installing-scala", title: "Installing Scala", summary: "JDK, scala-cli, sbt, and coursier.", available: true },
      { slug: "hello-world", title: "Hello, World", summary: "Your first program and the REPL.", available: true },
      { slug: "tooling-overview", title: "Tooling Overview", summary: "scala-cli vs sbt, IDEs, and Metals.", available: false },
    ],
  },
  {
    slug: "basics",
    title: "Basic Syntax",
    summary: "Values, variables, types, and how Scala infers them.",
    lessons: [
      { slug: "values-and-variables", title: "Values and Variables", summary: "val vs var and why immutability is the default.", available: true },
      { slug: "data-types", title: "Data Types", summary: "Int, Double, Boolean, Char, String, Unit, Any.", available: true },
      { slug: "type-inference", title: "Type Inference", summary: "When Scala figures out types for you.", available: false },
      { slug: "operators", title: "Operators", summary: "Arithmetic, comparison, logical, and operators-as-methods.", available: false },
      { slug: "string-interpolation", title: "String Interpolation", summary: "s-strings, f-strings, and raw strings.", available: true },
    ],
  },
  {
    slug: "control-structures",
    title: "Control Structures",
    summary: "Branching and looping, the expression-oriented way.",
    lessons: [
      { slug: "if-else", title: "If/Else as Expressions", summary: "Why if/else returns a value in Scala.", available: true },
      { slug: "loops", title: "Loops", summary: "for, while, and why loops matter less here.", available: false },
      { slug: "for-comprehensions", title: "For-Comprehensions", summary: "for as sugar over map/flatMap/filter.", available: false },
      { slug: "pattern-matching", title: "Pattern Matching", summary: "match expressions, guards, and destructuring.", available: true },
    ],
  },
  {
    slug: "functions",
    title: "Functions",
    summary: "Functions as values, the core of Scala's design.",
    lessons: [
      { slug: "defining-functions", title: "Defining Functions", summary: "def, parameters, return types.", available: true },
      { slug: "default-named-args", title: "Default & Named Arguments", summary: "Flexible call sites.", available: false },
      { slug: "anonymous-functions", title: "Anonymous Functions & Lambdas", summary: "The => syntax and underscore shorthand.", available: false },
      { slug: "higher-order-functions", title: "Higher-Order Functions", summary: "Functions that take or return functions.", available: true },
      { slug: "recursion", title: "Recursion & Tail Calls", summary: "@tailrec and thinking recursively.", available: false },
      { slug: "currying", title: "Currying", summary: "Multiple parameter lists.", available: false },
    ],
  },
  {
    slug: "oop",
    title: "Object-Oriented Scala",
    summary: "Classes, traits, and objects — Scala's take on OOP.",
    lessons: [
      { slug: "classes-objects", title: "Classes and Objects", summary: "Defining classes, constructors, methods.", available: true },
      { slug: "companion-objects", title: "Companion Objects", summary: "Static-like members and factory methods.", available: false },
      { slug: "case-classes", title: "Case Classes", summary: "Value semantics, equality, and copy.", available: true },
      { slug: "traits", title: "Traits", summary: "Interfaces with implementation, mixins.", available: true },
      { slug: "inheritance", title: "Inheritance & Abstract Classes", summary: "extends, override, abstract members.", available: false },
      { slug: "access-modifiers", title: "Access Modifiers", summary: "private, protected, and package-private.", available: false },
    ],
  },
  {
    slug: "functional-programming",
    title: "Functional Programming",
    summary: "Immutability, purity, and the idioms Scala is known for.",
    lessons: [
      { slug: "immutability", title: "Immutability", summary: "Why Scala prefers immutable data.", available: false },
      { slug: "pure-functions", title: "Pure Functions", summary: "Referential transparency and testability.", available: false },
      { slug: "option", title: "Option: Modeling Absence", summary: "Replacing null with Option.", available: true },
      { slug: "either", title: "Either: Modeling Failure", summary: "Left/Right for recoverable errors.", available: false },
      { slug: "try", title: "Try: Wrapping Exceptions", summary: "Success/Failure for exception-prone code.", available: false },
    ],
  },
  {
    slug: "collections",
    title: "Collections",
    summary: "List, Vector, Map, Set, and the operations that unify them.",
    lessons: [
      { slug: "lists", title: "Lists", summary: "Immutable singly-linked lists.", available: true },
      { slug: "vectors-arrays", title: "Vectors and Arrays", summary: "Indexed access and mutability tradeoffs.", available: false },
      { slug: "maps-sets", title: "Maps and Sets", summary: "Key-value pairs and uniqueness.", available: true },
      { slug: "map-filter-reduce", title: "map, filter, reduce, fold", summary: "The core transformation toolkit.", available: true },
      { slug: "mutable-vs-immutable", title: "Mutable vs Immutable Collections", summary: "scala.collection.mutable and when to reach for it.", available: false },
    ],
  },
  {
    slug: "concurrency",
    title: "Concurrency",
    summary: "Future, ExecutionContext, and a first look at Akka actors.",
    lessons: [
      { slug: "future", title: "Future & ExecutionContext", summary: "Async computation without blocking.", available: false },
      { slug: "actors-intro", title: "Actors: A First Look", summary: "Message-passing concurrency with Akka/Pekko.", available: false },
    ],
  },
  {
    slug: "tooling-testing",
    title: "Tooling & Testing",
    summary: "sbt, build files, and writing tests.",
    lessons: [
      { slug: "sbt-basics", title: "sbt Basics", summary: "build.sbt, tasks, and dependencies.", available: false },
      { slug: "scalatest-munit", title: "Testing with MUnit/ScalaTest", summary: "Writing your first unit tests.", available: false },
    ],
  },
  {
    slug: "ecosystem",
    title: "Ecosystem",
    summary: "Where Scala is used in production.",
    lessons: [
      { slug: "play-framework", title: "Play Framework", summary: "Web apps and APIs.", available: false },
      { slug: "akka-pekko", title: "Akka / Pekko", summary: "Actors, streams, and distributed systems.", available: false },
      { slug: "apache-spark", title: "Apache Spark", summary: "Big data processing in Scala.", available: false },
    ],
  },
];

export function findLesson(moduleSlug: string, lessonSlug: string) {
  const mod = syllabus.find((m) => m.slug === moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === lessonSlug);
  return mod && lesson ? { mod, lesson } : null;
}

export function allLessonParams() {
  return syllabus.flatMap((m) =>
    m.lessons.filter((l) => l.available).map((l) => ({ module: m.slug, lesson: l.slug }))
  );
}

export function flatLessons() {
  return syllabus.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleSlug: m.slug, moduleTitle: m.title })));
}

export function adjacentLessons(moduleSlug: string, lessonSlug: string) {
  const flat = flatLessons().filter((l) => l.available);
  const idx = flat.findIndex((l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug);
  return { prev: idx > 0 ? flat[idx - 1] : null, next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null };
}
