# CSV Processing — Benefit AI Portal

## Overview
AI/ML subsystem supports import/export of user, benefit, and history data via CSV files for bulk operations and analytics.

## Supported Formats
### Users
| id  | name    | department | history  |
|-----|---------|------------|----------|
| u1  | Alice   | HR         | b1;b2    |
| u2  | Bob     | IT         | b2;b3    |

### Benefits
| id  | title           | description              | category  | price | popularity |
|-----|-----------------|-------------------------|-----------|-------|------------|
| b1  | Gym Membership  | Access to gym           | Health    | 100   | 80         |
| b2  | Meal Voucher    | Lunch at partner ...    | Food      | 50    | 120        |

### History
| userId | benefitId | date       |
|--------|-----------|------------|
| u1     | b1        | 2024-01-10 |
| u2     | b2        | 2024-01-20 |

## Usage Example
```tsx
import { useCSVUpload } from '../hooks/useCSVUpload';
const { data, error, handleFile } = useCSVUpload();
// ...
<input type="file" accept=".csv" onChange={e => e.target.files && handleFile(e.target.files[0])} />
```

## Integration
- See [csvUtils.ts](../utils/csvUtils.ts) for parsing/export logic
- See [useCSVUpload.ts](../hooks/useCSVUpload.ts) for React integration
- See [mockUserData.csv](../mocks/mockUserData.csv) for sample files

## TODO
- Integrate with backend for bulk import/export
- Add advanced validation and error handling 