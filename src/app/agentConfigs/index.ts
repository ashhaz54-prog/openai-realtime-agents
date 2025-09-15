import { simpleHandoffScenario } from './simpleHandoff';
import { chatSupervisorScenario } from './chatSupervisor';
import { patientEncounter } from './patientEncounter';
import { medicalInterviewScenario } from './medicalInterview';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  simpleHandoff: simpleHandoffScenario,
  chatSupervisor: chatSupervisorScenario,
  patientEncounter: patientEncounter,
  medicalInterview: medicalInterviewScenario,
};

export const defaultAgentSetKey = 'chatSupervisor';
