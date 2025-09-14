"use client";

import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";

interface ScoreEntry {
  domain: string;
  points: number;
  reason?: string;
}

interface MedicalInterviewContextValue {
  timerMs: number;
  timerRunning: boolean;
  scores: ScoreEntry[];
  totalScore: number;
  stateTag: string;
  startTimer: () => void;
  stopTimer: () => void;
  addScore: (entry: ScoreEntry) => void;
  setStateTag: (state: string) => void;
}

const MedicalInterviewContext = createContext<MedicalInterviewContextValue | undefined>(undefined);

export const MedicalInterviewProvider = ({ children }: PropsWithChildren) => {
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [timerMs, setTimerMs] = useState(0);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [stateTag, setStateTag] = useState("IDLE");

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (timerStart !== null) {
      id = setInterval(() => {
        setTimerMs(Date.now() - timerStart);
      }, 1000);
    }
    return () => {
      if (id) clearInterval(id);
    };
  }, [timerStart]);

  const startTimer = () => {
    setTimerStart(Date.now());
    setStateTag("RUNNING");
  };

  const stopTimer = () => {
    if (timerStart !== null) {
      setTimerMs(Date.now() - timerStart);
    }
    setTimerStart(null);
    setStateTag("STOPPED");
  };

  const addScore = (entry: ScoreEntry) => {
    setScores((prev) => [...prev, entry]);
  };

  const value: MedicalInterviewContextValue = {
    timerMs,
    timerRunning: timerStart !== null,
    scores,
    totalScore: scores.reduce((sum, s) => sum + s.points, 0),
    stateTag,
    startTimer,
    stopTimer,
    addScore,
    setStateTag,
  };

  return (
    <MedicalInterviewContext.Provider value={value}>
      {children}
    </MedicalInterviewContext.Provider>
  );
};

export function useMedicalInterview() {
  const ctx = useContext(MedicalInterviewContext);
  if (!ctx) {
    throw new Error("useMedicalInterview must be used within a MedicalInterviewProvider");
  }
  return ctx;
}

export type { ScoreEntry };
