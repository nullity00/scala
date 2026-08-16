# ScalaSchool

A free, interactive introduction to Scala — short lessons, runnable examples, and
instant-feedback exercises against a real JVM sandbox. Modeled on the learning experience of
w3schools; curriculum shaped by [roadmap.sh/scala](https://roadmap.sh/scala).

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full system design, content model, and roadmap.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Lessons live under `/learn/<module>/<lesson>`.

### Code execution backend

`TryIt` and `Exercise` components POST to `/api/run` and `/api/check`, which proxy to a
Piston-compatible execution API (`EXECUTE_API_URL`, default: the public
[Piston](https://github.com/engineer-man/piston) instance at `emkc.org`). For production, point
`EXECUTE_API_URL` at a self-hosted Piston (or equivalent) instance — see ARCHITECTURE.md for why.

```bash
# .env.local
EXECUTE_API_URL=https://your-piston-instance.example.com/api/v2/execute
```

## Adding a lesson

1. Add the lesson's metadata to `src/lib/syllabus.ts` (set `available: true`).
2. Create `content/<module-slug>/<lesson-slug>.mdx` with frontmatter + body.
3. Use `<TryIt initialCode={\`...\`} />`, `<Exercise prompt="..." starterCode={\`...\`} tests={[...]} />`,
   and `<Quiz question="..." options={[...]} correctIndex={0} />` inline in the MDX body.

## Project structure

```
content/                   MDX lesson content, one folder per module
src/lib/syllabus.ts        Curriculum data model (modules, lessons, ordering)
src/lib/content.ts         Loads + parses MDX/frontmatter from /content
src/lib/execute.ts         Sandbox execution client (Piston-compatible)
src/app/api/run            POST { code } -> stdout/stderr from the sandbox
src/app/api/check          POST { code, tests } -> pass/fail per hidden test case
src/app/learn/[module]/[lesson]  Lesson page: renders MDX via next-mdx-remote
src/components/            TryIt, Exercise, Quiz, Sidebar, CodeEditor, Header
```
