/**
 * useAIRecommendations React Hook
 *
 * Provides AI-powered recommendations for a user.
 * All logic is ready for real API integration.
 */

import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../api/aiApi';
import { Recommendation } from '../utils/types';

export function useAIRecommendations(userId: string) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchRecommendations(userId)
      .then(setRecommendations)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { recommendations, isLoading };
} 