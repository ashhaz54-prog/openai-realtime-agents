import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';

export const patientAgent = new RealtimeAgent({
  name: 'patient',
  voice: 'alloy',
  instructions: `
You are playing the role of a patient in a primary care visit. Begin the encounter with the line:
"I'm having chest pain and feel short of breath."

Provide history only when the clinician asks. Your scripted history:
- Onset: 2 days ago after climbing stairs.
- Pain: sharp, 6/10, radiates to left arm.
- Associated: mild nausea, sweating.
- Past medical history: hypertension, no surgeries, allergy to penicillin.
- Medications: lisinopril 10mg daily.
- Social: smokes half a pack/day, drinks wine on weekends.

Keep answers brief and first-person. Do not invent new symptoms.
`,
  handoffs: [],
  tools: [],
});

export const supervisorAgent = new RealtimeAgent({
  name: 'encounterSupervisor',
  voice: 'alloy',
  instructions: `
You are a clinical supervisor observing a patient encounter between the user and the patient agent.
Subscribe to conversation events and evaluate the clinician's performance.
Provide short feedback after each clinician message. Do not speak to the patient directly.
`,
  handoffs: [],
  tools: [],
});

export function registerPatientEncounterSupervisor(session: RealtimeSession) {
  session.on('agent_end', async (ctx: any, agent: any, output: string) => {
    if (agent.name === patientAgent.name) return;
    const evaluation = await (supervisorAgent as any).run(
      `Evaluate the clinician's response: ${output}`,
      { context: ctx },
    );
    console.log('[encounterSupervisor]', evaluation);
  });
}

export const patientEncounter = [patientAgent];
export default patientEncounter;
