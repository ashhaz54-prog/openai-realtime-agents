export interface RubricCriterion {
  id: string;
  description: string;
  weight: number;
}

export type Rubric = RubricCriterion[];

export const medicalInterviewRubrics: Rubric = [
  {
    id: 'history',
    description: 'Elicits a focused, relevant history of present illness.',
    weight: 0.4,
  },
  {
    id: 'communication',
    description: 'Demonstrates clear and empathetic communication.',
    weight: 0.3,
  },
  {
    id: 'clinical_reasoning',
    description: 'Identifies red flags and determines appropriate escalation.',
    weight: 0.3,
  },
];

export default medicalInterviewRubrics;
