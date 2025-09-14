export interface MedicalCase {
  id: string;
  patientPersona: string;
  symptomScript: string;
  escalationCues: string[];
}

export const medicalInterviewCases: MedicalCase[] = [
  {
    id: 'chest_pain',
    patientPersona: 'John, a 54-year-old man with hypertension',
    symptomScript: 'He reports a pressure-like chest pain radiating to the left arm that began two hours ago while mowing the lawn.',
    escalationCues: [
      'Pain persists longer than five minutes',
      'Associated shortness of breath or diaphoresis',
      'History suggestive of cardiac origin',
    ],
  },
  {
    id: 'red_eye',
    patientPersona: 'Maria, a 26-year-old contact lens wearer',
    symptomScript: 'She presents with a painful red right eye and decreased vision after sleeping in her contacts overnight.',
    escalationCues: [
      'Vision changes or severe eye pain',
      'Photophobia or inability to keep the eye open',
      'Contact lens use with suspected infection',
    ],
  },
];

export default medicalInterviewCases;
