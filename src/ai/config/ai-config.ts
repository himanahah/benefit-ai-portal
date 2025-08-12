// AI System Main Configuration
// All parameters can be tuned for production or development

export const AI_CONFIG = {
  // Model selection
  defaultModel: 'hybrid', // 'collaborative' | 'content' | 'hybrid'
  // API endpoints (to be filled with real URLs)
  api: {
    rest: 'https://api.benefit-ai.com/v1/recommend', // TODO: Insert real endpoint
    grpc: 'grpc://ai.benefit-ai.com:50051', // TODO: Insert real endpoint
    websocket: 'wss://ai.benefit-ai.com/ws', // TODO: Insert real endpoint
  },
  // Feature flags
  enableABTesting: true,
  enableOnlineLearning: true,
  enableCaching: true,
  // Model parameters
  collaborative: {
    similarityMetric: 'cosine',
    minInteractions: 5,
  },
  content: {
    tfidfMaxFeatures: 1000,
  },
  hybrid: {
    collaborativeWeight: 0.6,
    contentWeight: 0.4,
  },
  // Monitoring
  metricsIntervalSec: 60,
  // Security
  anonymizationSalt: 'CHANGE_ME_TO_REAL_SALT',
  differentialPrivacyEpsilon: 1.0,
  // TODO: Add more config options as needed
};

export default AI_CONFIG; 