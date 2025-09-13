import { RealtimeAgent } from '@openai/agents/realtime';

export const intakeAgent = new RealtimeAgent({
  name: 'intake',
  voice: 'alloy',
  instructions:
    'Greet the patient, collect basic information about their concern, then hand off to the clinician agent.',
  handoffs: [],
  tools: [],
  handoffDescription: 'Initial triage agent',
});

export const clinicianAgent = new RealtimeAgent({
  name: 'clinician',
  voice: 'sage',
  instructions:
    'Provide concise medical guidance based on the information gathered by the intake agent.',
  handoffs: [],
  tools: [],
  handoffDescription: 'Primary clinician',
});

// Allow the intake agent to hand off to clinician
intakeAgent.handoffs = [clinicianAgent];

export const patientEncounterScenario = [intakeAgent, clinicianAgent];

// Name of the organization represented by this agent set. Used by guardrails
export const patientEncounterCompanyName = 'Acme Health';
