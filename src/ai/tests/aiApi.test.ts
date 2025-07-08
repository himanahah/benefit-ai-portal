/**
 * Unit tests for AI API (REST, WebSocket, gRPC)
 *
 * All tests are stubs, ready for real API integration.
 */

import { fetchRecommendations, sendFeedback, fetchAIMetrics } from '../api/aiApi';
import { AIWebSocket } from '../api/aiWebSocket';
import { AIGrpcClient } from '../api/aiGrpc';

describe('AI API', () => {
  it('should fetch recommendations (REST)', async () => {
    const recs = await fetchRecommendations('u1');
    expect(recs.length).toBeGreaterThan(0);
  });

  it('should send feedback (REST)', async () => {
    const ok = await sendFeedback('u1', 'b1', 'like');
    expect(ok).toBe(true);
  });

  it('should fetch AI metrics (REST)', async () => {
    const metrics = await fetchAIMetrics();
    expect(metrics).toHaveProperty('precision');
  });

  it('should connect to WebSocket', () => {
    const ws = new AIWebSocket();
    expect(typeof ws.connect).toBe('function');
  });

  it('should connect to gRPC', async () => {
    const grpc = new AIGrpcClient();
    grpc.connect();
    const recs = await grpc.getRecommendations('u1');
    expect(recs.length).toBeGreaterThan(0);
  });
}); 