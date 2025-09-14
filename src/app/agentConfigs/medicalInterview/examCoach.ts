import { RealtimeAgent } from '@openai/agents/realtime';

export const examCoachAgent = new RealtimeAgent({
  name: 'examCoach',
  instructions: `You provide coaching after the interview.`,
  handoffs: [],
  tools: [],
});

export default examCoachAgent;
