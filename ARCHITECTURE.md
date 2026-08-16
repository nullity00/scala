# ScalaSchool — Architecture

## Goal

Learn Scala the way you'd learn HTML on w3schools: short page, one idea, a runnable example you
can poke at immediately, then a small exercise that tells you pass/fail in under two seconds. No
account, no local install, no ceremony to get from "curious" to "I just ran Scala code."

The syllabus follows the shape of [roadmap.sh/scala](https://roadmap.sh/scala): environment setup →
syntax basics → control flow → functions → OOP → functional programming → collections → error
handling → concurrency → tooling/testing → ecosystem (Play/Akka/Spark). This prototype implements
the first seven modules end-to-end (17 lessons) so the pattern is provable; the rest is data, not
new architecture — see "Filling in the rest" below.

## Stack

- **Next.js (App Router) + TypeScript**, deployed as a normal Vercel/Node app — no separate backend
  service for content, just API routes for the one thing that needs a server: code execution.
- **Tailwind v4** for styling. Deliberately low on graphics: typographic hierarchy, a sidebar tree,
  one accent color. The "product" is the reading+coding loop, not visual chrome.
- **MDX content** (`next-mdx-remote/rsc`) — lessons are `.mdx` files with frontmatter, rendered
  through custom components (`TryIt`, `Exercise`, `Quiz`) so prose and interactive widgets live in
  the same file, in the order a learner encounters them.
- **CodeMirror 6** (not Monaco) for the editor — Monaco is ~2MB+ and built for IDEs; CodeMirror
  loads fast and is all this needs. Scala highlighting uses the C-like legacy mode (there's no
  dedicated CM6 Scala grammar; the C-like mode covers braces/keywords/strings well enough for
  teaching code).

## The sandbox — the part that matters most

This is a tight-feedback-loop product, so execution latency and safety are the real design
constraints, not the UI.

**Request flow:** `TryIt`/`Exercise` (client components) → `POST /api/run` or `/api/check` (Next.js
route handler) → execution backend → JSON `{ stdout, stderr, exitCode }` back to the browser. The
API route never runs code itself — it's a thin, rate-limited proxy. That boundary matters: it's
where auth, rate limiting, and backend swapping happen without touching any UI code.

**Execution backend — three options, in the order I'd actually deploy them:**

1. **Public [Piston](https://github.com/engineer-man/piston) API (`emkc.org`)** — what this
   prototype defaults to (`EXECUTE_API_URL` env var). Zero infrastructure, supports Scala out of
   the box, good enough to develop and demo against. Wrong for production: shared rate limits (5
   req/sec across everyone using it), no uptime guarantee, and you're sending every learner's code
   to a third party.
2. **Self-hosted Piston** — same API contract, so `/api/run` needs zero code changes, just an env
   var pointing at your own instance. Piston sandboxes via `nsjail`/isolate, runs each submission
   in a fresh, resource-capped environment, and already knows how to install a Scala runtime. This
   is the right choice for launch: known-good isolation model, one Docker Compose file, no bespoke
   security work.
3. **Custom warm-pool runner** (only once Piston's cold-start latency becomes the bottleneck) — a
   small fleet of containers with `scala-cli` pre-warmed and a JVM already up, fed through a queue,
   so "Run" feels instant instead of "~1-2s including JVM boot." This is an optimization, not a
   correctness requirement — don't build it until Piston's latency is actually the complaint.

**Non-negotiable regardless of backend:** every execution is untrusted-code execution. Container
isolation, wall-clock timeout (this repo: 10s), output size caps, no network access from the
sandbox, and no persistent filesystem across runs. The `/api/run` and `/api/check` routes here
already do the caller-facing half of this (per-IP rate limiting, request size limit, abort on
timeout) — the execution backend has to do the other half (process isolation).

**Why `/api/check` is separate from `/api/run`:** exercises run the learner's code against one or
more *hidden* stdin/stdout test cases and return pass/fail — the test's expected output never
reaches the client. `/api/run` is "show me what this prints"; `/api/check` is "grade this." Same
execution primitive underneath, different contract.

## Content model

```
content/<module-slug>/<lesson-slug>.mdx     — the lesson: prose + <TryIt>/<Exercise>/<Quiz>
src/lib/syllabus.ts                          — ordered curriculum tree (source of truth for nav)
src/lib/content.ts                           — frontmatter + body loader (gray-matter)
```

`syllabus.ts` is deliberately the *complete* roadmap.sh/scala tree, including lessons that don't
have content yet (`available: false`) — the sidebar renders them grayed-out rather than 404ing, so
the curriculum's shape is visible from day one even as content is filled in incrementally. Adding a
lesson is: write the `.mdx` file, flip `available: true`. No route code, no build config.

Each lesson follows the same rhythm, deliberately: **short explanation → one runnable example
(`TryIt`) → one exercise with instant grading (`Exercise`)**. Occasional `Quiz` blocks break up
pure-reading modules. This is the w3schools rhythm, not accidental — the unit of learning is small
enough to finish in under two minutes, so the feedback loop (write → run → see result) stays tight.

## How it turns out (what you get today)

- **Homepage** — one-line pitch, a live runnable example above the fold (so the sandbox proves
  itself before you commit to anything), and a curriculum grid.
- **`/learn/[module]/[lesson]`** — sidebar (full syllabus, current lesson highlighted, unwritten
  lessons visibly "coming soon"), lesson prose, inline runnable examples, an exercise with
  per-test pass/fail and expected-vs-actual diffs, prev/next navigation.
- **`/reference`** — a growing cheat-sheet of stdlib signatures, w3schools-reference-page style.
- **`/exercises`** — flat list of every exercise across the course, for review/practice mode.
- **17 real lessons, 7 modules** (Getting Started → Collections), each with working `TryIt` and
  `Exercise` blocks verified against the actual execution pipeline.

## Deliberately deferred (and why)

- **Accounts / progress sync** — w3schools-style learning works fine anonymously; the honest next
  step is `localStorage` for "lessons completed" / streak tracking, with an optional account
  (NextAuth + Postgres) layered on only if learners ask to sync across devices. Building auth before
  anyone's asked for cross-device sync would be solving a problem that doesn't exist yet.
- **Search** — with 17 lessons, a sidebar is enough. Once the full ~60-80 lesson curriculum is
  filled in, add a static-index client search (Pagefind or FlexSearch over the MDX at build time —
  no server, no third-party search service) rather than before it's needed.
- **Warm-pool execution** — see sandbox section above; only worth it once Piston's latency is
  measured to actually hurt, not assumed to.

## Filling in the rest

`src/lib/syllabus.ts` already lists every module through Concurrency, Tooling & Testing, and
Ecosystem (Play/Akka/Spark) with `available: false`. Finishing the course is: write the `.mdx` for
each remaining lesson in the same three-beat rhythm, flip the flag. No architectural work is gated
on this — it's the same loop that produced the 17 lessons already in the repo.
