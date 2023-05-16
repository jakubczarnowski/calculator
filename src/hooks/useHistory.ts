import { useContext } from 'react';
import { HistoryContext } from '../providers/HistoryProvider';

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === null) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
