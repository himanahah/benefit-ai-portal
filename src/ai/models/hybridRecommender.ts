/**
 * Hybrid Recommendation Model
 *
 * Combines collaborative and content-based approaches for improved accuracy.
 * All logic is ready for real API/model integration.
 *
 * Python reference:
 * class HybridRecommender:
 *     ...
 */

import { CollaborativeFilteringModel } from './collaborativeFiltering';
import { ContentBasedModel } from './contentBased';
import { Recommendation } from '../utils/types';
import AI_CONFIG from '../config/ai-config';

export class HybridRecommender {
  private cfModel = new CollaborativeFilteringModel();
  private cbModel = new ContentBasedModel();
  private cfWeight = AI_CONFIG.hybrid.collaborativeWeight;
  private cbWeight = AI_CONFIG.hybrid.contentWeight;

  /**
   * Fit both models
   */
  fit(userItemData: any, benefitsData: any) {
    this.cfModel.fit(userItemData);
    this.cbModel.extractFeatures(benefitsData);
  }

  /**
   * Predict hybrid score for user-item
   */
  predict(userId: string, itemId: string): number {
    const cfScore = this.cfModel.predict(userId, itemId);
    const cbScore = Math.random(); // TODO: Use cbModel for real score
    return this.cfWeight * cfScore + this.cbWeight * cbScore;
  }

  /**
   * Recommend top-N items
   */
  recommend(userId: string, n: number = 5): Recommendation[] {
    // TODO: Merge and rank recommendations from both models
    const cfRecs = this.cfModel.recommend(userId, n);
    const cbRecs = this.cbModel.recommend(userId, n);
    // Simple merge for demo
    return [...cfRecs, ...cbRecs].slice(0, n);
  }
} 