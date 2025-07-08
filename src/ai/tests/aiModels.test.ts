/**
 * Unit tests for AI/ML models
 *
 * Tests collaborative, content-based, hybrid, and ML models.
 * All tests are stubs, ready for real logic.
 */

import { CollaborativeFilteringModel } from '../models/collaborativeFiltering';
import { ContentBasedModel } from '../models/contentBased';
import { HybridRecommender } from '../models/hybridRecommender';
import { RandomForestModel } from '../models/randomForest';
import { GradientBoostingModel } from '../models/gradientBoosting';
import { NeuralNetworkModel } from '../models/neuralNetwork';
import { mockUsers } from '../mocks/mockUserData';
import { mockBenefits } from '../mocks/mockBenefitData';

describe('AI/ML Models', () => {
  it('should recommend items (collaborative)', () => {
    const model = new CollaborativeFilteringModel();
    model.fit({});
    const recs = model.recommend('u1', 3);
    expect(recs.length).toBe(3);
  });

  it('should recommend items (content-based)', () => {
    const model = new ContentBasedModel();
    model.extractFeatures(mockBenefits);
    model.buildUserProfile('u1', ['b1', 'b2']);
    const recs = model.recommend('u1', 2);
    expect(recs.length).toBe(2);
  });

  it('should recommend items (hybrid)', () => {
    const model = new HybridRecommender();
    model.fit({}, mockBenefits);
    const recs = model.recommend('u1', 4);
    expect(recs.length).toBe(4);
  });

  it('should predict purchase probability (random forest)', () => {
    const model = new RandomForestModel();
    const probs = model.predict([[1, 2, 3]]);
    expect(probs.length).toBe(1);
  });

  it('should predict satisfaction (gradient boosting)', () => {
    const model = new GradientBoostingModel();
    const ratings = model.predict([[1, 2, 3]]);
    expect(ratings.length).toBe(1);
  });

  it('should predict with neural network', () => {
    const model = new NeuralNetworkModel();
    const outputs = model.predict([[1, 2, 3, 4, 5]]);
    expect(outputs.length).toBe(1);
  });
}); 