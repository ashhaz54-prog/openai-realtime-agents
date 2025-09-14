import { RealtimeAgent } from '@openai/agents/realtime';

export const interviewerAgent = new RealtimeAgent({
  name: 'medicalInterviewer',
  instructions: `You are a medical interviewer conducting a simulated patient encounter.`,
  handoffs: [],
  tools: [],
});

export default interviewerAgent;
