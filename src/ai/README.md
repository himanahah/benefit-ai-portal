# 🤖 Benefit AI Portal — AI/ML Subsystem

## Overview
This directory contains the core logic, models, configuration, and documentation for the AI/ML recommendation engine powering Benefit AI Portal. All code is modular, extensible, and ready for integration with real AI APIs (just add your API key!).

- **Architecture:** See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Algorithms:** See [docs/ALGORITHMS.md](./docs/ALGORITHMS.md)
- **Metrics & Monitoring:** See [docs/METRICS.md](./docs/METRICS.md)
- **Security & Privacy:** See [docs/SECURITY.md](./docs/SECURITY.md)
- **API Reference:** See [docs/API.md](./docs/API.md)
- **CSV Processing:** See [docs/CSV.md](./docs/CSV.md)

## Main Folders
- `models/` — ML/AI models (collaborative, content-based, hybrid, random forest, gradient boosting, neural network)
- `algorithms/` — Feature engineering, normalization, A/B testing, batch processing, caching
- `monitoring/` — Metrics, logging, monitoring
- `security/` — Anonymization, differential privacy, data protection
- `api/` — API stubs (REST, gRPC, WebSocket)
- `hooks/` — React hooks for AI integration and CSV upload
- `context/` — React context for AI
- `mocks/` — Mock data for users, benefits, history, recommendations, metrics, and CSV files
- `tests/` — Unit tests for models, API, CSV utilities
- `docs/` — Documentation for architecture, algorithms, metrics, security, API, CSV
- `config/` — AI system configuration
- `utils/` — Shared utilities and types

## CSV Processing
- Bulk import/export of users, benefits, and history via CSV
- See [docs/CSV.md](./docs/CSV.md) for formats, usage, and integration
- Example files: [mockUserData.csv](./mocks/mockUserData.csv), [mockBenefitData.csv](./mocks/mockBenefitData.csv), [mockHistory.csv](./mocks/mockHistory.csv)
- React hook: [useCSVUpload.ts](./hooks/useCSVUpload.ts)

## Integration Example
```tsx
import { useAIRecommendations } from './hooks/useAIRecommendations';
const { recommendations, isLoading } = useAIRecommendations(userId);

import { useCSVUpload } from './hooks/useCSVUpload';
const { data, error, handleFile } = useCSVUpload();
```

## ⚠️ Note
All AI/ML logic and CSV processing are ready for real API integration. Just add your API key or endpoint in `aiApi.ts` and everything will work out of the box! 