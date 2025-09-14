import { interviewerAgent } from './interviewer';
import { examCoachAgent } from './examCoach';

export { getFeedback } from './feedback';
export { medicalInterviewStateMachine } from './stateMachine';
export { medicalInterviewRubrics } from './rubrics';
export { medicalInterviewCases } from './cases';

export const medicalInterviewScenario = [
  interviewerAgent,
  examCoachAgent,
];

export default medicalInterviewScenario;
