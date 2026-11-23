"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { parseResume, type Resume } from "./schema";

// Everything stays in this browser. Nothing is sent to a server.
const STORAGE_KEY = "teencareer.resume.v1";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

export function useResume() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const resume = useMemo(() => parseResume(raw), [raw]);

  const setResume = useCallback((next: Resume) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or full storage: the resume just won't be saved.
    }
    listeners.forEach((listener) => listener());
  }, []);

  const clearResume = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return { resume, setResume, clearResume };
}
