import type { RealtimeAgent } from '@openai/agents/realtime';

import { simpleHandoffScenario } from './simpleHandoff';
import { chatSupervisorScenario } from './chatSupervisor';
import { patientEncounter } from './patientEncounter';
import { medicalInterviewScenario } from './medicalInterview';

export const allAgentSets: Record<string, RealtimeAgent[]> = {
  simpleHandoff: simpleHandoffScenario,
  chatSupervisor: chatSupervisorScenario,
  patientEncounter,
  medicalInterview: medicalInterviewScenario,
};

export type AgentSetKey = keyof typeof allAgentSets;

export const DEFAULT_SCENARIO_KEY: AgentSetKey = 'chatSupervisor';

export const defaultAgentSetKey = DEFAULT_SCENARIO_KEY;

export function isAgentSetKey(value: unknown): value is AgentSetKey {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(allAgentSets, value)
  );
}

export function getAgentSet(key?: string): RealtimeAgent[] {
  if (key && isAgentSetKey(key)) {
    return allAgentSets[key];
  }
  return allAgentSets[DEFAULT_SCENARIO_KEY];
}
