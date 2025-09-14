"use client";

import React from "react";
import { useMedicalInterview } from "@/app/contexts/MedicalInterviewContext";
import { useTranscript } from "@/app/contexts/TranscriptContext";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MedicalInterviewControls() {
  const {
    timerMs,
    timerRunning,
    totalScore,
    stateTag,
    startTimer,
    stopTimer,
  } = useMedicalInterview();
  const { addTranscriptToolCall } = useTranscript();

  const handleStart = async () => {
    try {
      await fetch("/api/interviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "timer.start", args: { ms: 600000 } }),
      });
    } catch {}
    startTimer();
    addTranscriptToolCall("timer.start", { ms: 600000 });
  };

  const handleStop = async () => {
    try {
      await fetch("/api/interviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "timer.stop" }),
      });
    } catch {}
    stopTimer();
    addTranscriptToolCall("timer.stop");
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/interviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "export.session" }),
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "session.json";
      a.click();
      URL.revokeObjectURL(url);
      addTranscriptToolCall("export.session", data);
    } catch {}
  };

  return (
    <div className="p-4 bg-white border-b flex items-center gap-4 text-sm">
      <button
        onClick={timerRunning ? handleStop : handleStart}
        className="px-3 py-1 rounded-md bg-black text-white"
      >
        {timerRunning ? "Stop" : "Start"}
      </button>
      <div>Timer: {formatTime(timerMs)}</div>
      <div>Score: {totalScore}</div>
      <div className="px-2 py-1 bg-gray-200 rounded">{stateTag}</div>
      <button
        onClick={handleExport}
        className="px-3 py-1 rounded-md bg-gray-200"
      >
        Export
      </button>
    </div>
  );
}

