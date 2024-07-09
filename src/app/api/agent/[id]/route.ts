import { agentChat } from "@/lib/Ollama";
import { agentChat2 } from "@/lib/OllamaTest";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  const id = res.url.slice(32, undefined);

  try {
    const result = await agentChat(id);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in agent chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
