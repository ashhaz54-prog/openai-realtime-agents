import { NextResponse } from "next/server";
import OpenAI from "openai";

import {
  DEFAULT_SCENARIO_KEY,
  getAgentSet,
  isAgentSetKey,
} from "@/app/agentConfigs";
import { REALTIME_MODEL } from "@/app/config/realtime";

interface RealtimeRequestBody {
  scenarioKey?: unknown;
}

function normalizeScenarioKey(value: unknown): string {
  if (typeof value === "string" && isAgentSetKey(value)) {
    return value;
  }
  return DEFAULT_SCENARIO_KEY;
}

export async function POST(request: Request) {
  let body: RealtimeRequestBody = {};

  try {
    body = (await request.json()) as RealtimeRequestBody;
  } catch (error) {
    // Ignore JSON parse errors and fall back to defaults.
    console.warn("/api/realtime received invalid JSON body", error);
  }

  const resolvedScenarioKey = normalizeScenarioKey(body.scenarioKey);
  const agents = getAgentSet(resolvedScenarioKey);

  if (agents.length === 0) {
    return NextResponse.json(
      { error: "No agents configured for the requested scenario." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 },
    );
  }

  try {
    const openai = new OpenAI({ apiKey });
    const rootAgent = agents[0];

    const session = await openai.beta.realtime.sessions.create({
      model: REALTIME_MODEL,
      voice: rootAgent.voice,
      instructions:
        typeof rootAgent.instructions === "string"
          ? rootAgent.instructions
          : undefined,
    });

    return NextResponse.json({
      ...session,
      scenarioKey: resolvedScenarioKey,
    });
  } catch (error) {
    console.error("Error creating realtime session:", error);
    return NextResponse.json(
      { error: "Failed to create realtime session" },
      { status: 500 },
    );
  }
}
