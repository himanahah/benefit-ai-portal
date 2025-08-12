/**
 * AI REST API Stub
 *
 * Simulates REST API calls for recommendations, feedback, and metrics.
 * All logic is ready for real endpoint and API key integration.
 */

import AI_CONFIG from '../config/ai-config';
import { Recommendation } from '../utils/types';

export async function fetchRecommendations(userId: string): Promise<Recommendation[]> {
  // TODO: Replace with real API call
  // Example: fetch(`${AI_CONFIG.api.rest}?userId=${userId}&apiKey=...`)
  return Array(5).fill(null).map((_, i) => ({ itemId: `item${i}`, score: Math.random() }));
}

export async function sendFeedback(userId: string, recommendationId: string, feedbackType: string): Promise<boolean> {
  // TODO: Replace with real API call
  return true;
}

export async function fetchAIMetrics(): Promise<Record<string, number>> {
  // TODO: Replace with real API call
  return { precision: 0.8, recall: 0.7, f1: 0.75 };
} 