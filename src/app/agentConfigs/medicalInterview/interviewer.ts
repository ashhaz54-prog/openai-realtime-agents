import { RealtimeAgent, tool } from '@openai/agents/realtime';

async function callInterviewerApi(action: string, args: any = {}) {
  try {
    const res = await fetch('/api/interviewer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, args }),
    });
    return await res.json();
  } catch {
    // Safe default no-op
    return { ok: true };
  }
}

export const interviewerAgent = new RealtimeAgent({
  name: 'medicalInterviewer',
  instructions: `You are a medical interviewer conducting a simulated patient encounter.`,
  handoffs: [],
  tools: [
    tool({
      name: 'timer.start',
      description: 'Start a countdown timer for the given number of milliseconds.',
      parameters: {
        type: 'object',
        properties: {
          ms: { type: 'number', description: 'Duration in milliseconds' },
        },
        required: ['ms'],
        additionalProperties: false,
      },
      execute: async (input: any) => callInterviewerApi('timer.start', input),
    }),
    tool({
      name: 'timer.stop',
      description: 'Stop the active timer and return elapsed time.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      execute: async () => callInterviewerApi('timer.stop'),
    }),
    tool({
      name: 'score.add',
      description: 'Add a score for a specific domain with optional reason.',
      parameters: {
        type: 'object',
        properties: {
          domain: { type: 'string', description: 'Domain or category for the score' },
          points: { type: 'number', description: 'Points to add' },
          reason: { type: 'string', description: 'Optional reason for the score' },
        },
        required: ['domain', 'points'],
        additionalProperties: false,
      },
      execute: async (input: any) => callInterviewerApi('score.add', input),
    }),
    tool({
      name: 'note.append',
      description: 'Append a note to the session record.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'Note text to append' },
        },
        required: ['text'],
        additionalProperties: false,
      },
      execute: async (input: any) => callInterviewerApi('note.append', input),
    }),
    tool({
      name: 'export.session',
      description: 'Export the current session data including notes and scores.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      execute: async () => callInterviewerApi('export.session'),
    }),
  ],
});

export default interviewerAgent;
