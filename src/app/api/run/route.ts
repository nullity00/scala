import { NextRequest, NextResponse } from "next/server";
import { runScala, checkRateLimit } from "@/lib/execute";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.code !== "string") {
    return NextResponse.json({ error: "Missing 'code' string in request body." }, { status: 400 });
  }

  const result = await runScala(body.code, typeof body.stdin === "string" ? body.stdin : "");
  return NextResponse.json(result);
}
