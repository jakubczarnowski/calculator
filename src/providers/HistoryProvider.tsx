import React from 'react';

export type EquationHistory = {
  equation: string;
  result: string;
  timestamp: number;
};
type HistoryContextType = {
  history: EquationHistory[];
  addHistory: (history: EquationHistory) => void;
};

export const HistoryContext = React.createContext<HistoryContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const readHistoryFromLocalStorage = () => {
  const value = localStorage.getItem('history');
  if (value) {
    return JSON.parse(value);
  }
  return [];
};

const writeHistoryToLocalStorage = (history: EquationHistory[]) => {
  localStorage.setItem('history', JSON.stringify(history));
};

export const HistoryProvider = ({ children }: Props) => {
  const [history, setHistory] = React.useState<EquationHistory[]>(readHistoryFromLocalStorage());

  const addHistory = (history: EquationHistory) => {
    setHistory((prev) => {
      const newHistory = [...prev, history];
      writeHistoryToLocalStorage(newHistory);
      return newHistory;
    });
  };

  return (
    <HistoryContext.Provider value={{ addHistory, history }}>{children}</HistoryContext.Provider>
  );
};
