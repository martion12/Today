import { LogEntry } from "@/types";

const STORAGE_KEY = "you_are_amazing_logs";

export const getStoredLogs = (): LogEntry[] => {
  if (typeof window === "undefined") {
    return [];
  }
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error retrieving logs from localStorage:", error);
    return [];
  }
};

export const storeLog = (log: LogEntry): void => {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    const currentLogs = getStoredLogs();
    const updatedLogs = [log, ...currentLogs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error("Error storing log in localStorage:", error);
  }
};

export const clearLogs = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing logs from localStorage:", error);
  }
};