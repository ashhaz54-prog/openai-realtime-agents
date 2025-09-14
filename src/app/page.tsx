import React, { Suspense } from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import { MedicalInterviewProvider } from "@/app/contexts/MedicalInterviewContext";
import App from "./App";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MedicalInterviewProvider>
        <TranscriptProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </TranscriptProvider>
      </MedicalInterviewProvider>
    </Suspense>
  );
}
