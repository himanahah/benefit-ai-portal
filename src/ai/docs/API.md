# AI/ML API Reference — Benefit AI Portal

## REST API
- Endpoint: `/v1/recommend`
- Example: `GET /v1/recommend?userId=...&apiKey=...`
- See: [aiApi.ts](../api/aiApi.ts)

## WebSocket API
- Endpoint: `wss://...`
- See: [aiWebSocket.ts](../api/aiWebSocket.ts)

## gRPC API
- Endpoint: `grpc://...`
- See: [aiGrpc.ts](../api/aiGrpc.ts)

## Data Formats
- Recommendation: `{ itemId: string, score: number }`
- Feedback: `{ userId: string, recommendationId: string, feedbackType: string }`
- Metrics: `{ precision: number, recall: number, f1: number, ... }` 