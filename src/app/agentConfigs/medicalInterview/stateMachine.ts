export type InterviewState =
  | 'GREETING'
  | 'CONSENT'
  | 'CHIEF_COMPLAINT'
  | 'HPI'
  | 'PMH'
  | 'MEDS_ALLERGIES'
  | 'SOCIAL_FAMILY'
  | 'ROS'
  | 'FOCUSED_EXAM_PROMPTS'
  | 'SUMMARY'
  | 'FEEDBACK';

export interface StateHandler {
  enter: () => void;
  prompt: () => string;
  onUser: (input: string) => void;
  done: () => boolean;
  next: () => InterviewState | null;
}

function createLinearState(
  promptText: string,
  nextState: InterviewState | null,
): StateHandler {
  let complete = false;
  return {
    enter: () => {
      complete = false;
    },
    prompt: () => promptText,
    onUser: () => {
      complete = true;
    },
    done: () => complete,
    next: () => nextState,
  };
}

export const medicalInterviewStateMachine = {
  initial: 'GREETING' as InterviewState,
  states: {
    GREETING: createLinearState(
      'Hello, I am your interviewer. Shall we begin?',
      'CONSENT',
    ),
    CONSENT: createLinearState(
      'Do you consent to participate in this medical interview?',
      'CHIEF_COMPLAINT',
    ),
    CHIEF_COMPLAINT: createLinearState(
      'What brings you in today?',
      'HPI',
    ),
    HPI: createLinearState(
      'Please describe the history of your present illness.',
      'PMH',
    ),
    PMH: createLinearState(
      'Could you tell me about your past medical history?',
      'MEDS_ALLERGIES',
    ),
    MEDS_ALLERGIES: createLinearState(
      'What medications are you taking and do you have any allergies?',
      'SOCIAL_FAMILY',
    ),
    SOCIAL_FAMILY: createLinearState(
      'Can you share relevant social and family history?',
      'ROS',
    ),
    ROS: createLinearState(
      'Let’s review your systems. Do you have any other symptoms?',
      'FOCUSED_EXAM_PROMPTS',
    ),
    FOCUSED_EXAM_PROMPTS: createLinearState(
      'I will now ask some focused exam questions.',
      'SUMMARY',
    ),
    SUMMARY: createLinearState(
      'Here is a summary of what we discussed.',
      'FEEDBACK',
    ),
    FEEDBACK: createLinearState(
      'Do you have any feedback about this interview?',
      null,
    ),
  } as Record<InterviewState, StateHandler>,
};

export default medicalInterviewStateMachine;

