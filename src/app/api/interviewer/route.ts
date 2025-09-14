import { NextRequest, NextResponse } from 'next/server';

interface ScoreEntry {
  domain: string;
  points: number;
  reason?: string;
}

let timerStart: number | null = null;
let timerTimeout: NodeJS.Timeout | null = null;
const notes: string[] = [];
const scores: ScoreEntry[] = [];

export async function POST(req: NextRequest) {
  try {
    const { action, args = {} } = await req.json();

    switch (action) {
      case 'timer.start': {
        const ms = typeof args.ms === 'number' ? args.ms : undefined;
        if (typeof ms === 'number') {
          timerStart = Date.now();
          if (timerTimeout) clearTimeout(timerTimeout);
          timerTimeout = setTimeout(() => {
            timerStart = null;
            timerTimeout = null;
          }, ms);
          return NextResponse.json({ status: 'started', ms });
        }
        return NextResponse.json({ status: 'ignored' });
      }
      case 'timer.stop': {
        if (timerStart !== null) {
          const elapsed = Date.now() - timerStart;
          timerStart = null;
          if (timerTimeout) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
          return NextResponse.json({ status: 'stopped', elapsed_ms: elapsed });
        }
        return NextResponse.json({ status: 'no_timer' });
      }
      case 'score.add': {
        const { domain, points, reason } = args as ScoreEntry;
        if (typeof domain === 'string' && typeof points === 'number') {
          scores.push({ domain, points, reason });
          return NextResponse.json({ status: 'recorded' });
        }
        return NextResponse.json({ status: 'ignored' });
      }
      case 'note.append': {
        const { text } = args as { text?: string };
        if (typeof text === 'string') {
          notes.push(text);
          return NextResponse.json({ status: 'noted' });
        }
        return NextResponse.json({ status: 'ignored' });
      }
      case 'export.session': {
        return NextResponse.json({
          notes,
          scores,
          timer: timerStart,
        });
      }
      default:
        return NextResponse.json({ status: 'unknown_action' }, { status: 400 });
    }
  } catch {
    // Fail-safe no-op
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

