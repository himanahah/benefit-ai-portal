/**
 * AIContext for React
 *
 * Provides AI/ML recommendations and metrics to the component tree.
 * All logic is ready for real API integration.
 */

import React, { createContext, useContext } from 'react';
import { Recommendation } from '../utils/types';

interface AIContextValue {
  recommendations: Recommendation[];
  metrics: Record<string, number>;
  isLoading: boolean;
}

const AIContext = createContext<AIContextValue>({
  recommendations: [],
  metrics: {},
  isLoading: false,
});

export const useAIContext = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Integrate with real hooks and API
  const value: AIContextValue = {
    recommendations: [],
    metrics: {},
    isLoading: false,
  };
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}; 