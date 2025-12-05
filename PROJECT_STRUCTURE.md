# Project Structure

```
stone-soup-app/
├── backend/                          # Express + TypeScript backend
│   ├── src/
│   │   ├── index.ts                 # Express server & API routes
│   │   ├── store.ts                 # In-memory data store
│   │   ├── types.ts                 # TypeScript type definitions
│   │   └── store.test.ts            # Backend unit tests
│   ├── package.json                 # Backend dependencies
│   ├── tsconfig.json               # TypeScript config
│   └── jest.config.js              # Jest test config
│
├── frontend/                        # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.tsx           # Main board component
│   │   │   ├── Board.css
│   │   │   ├── Column.tsx          # Column component
│   │   │   ├── Column.css
│   │   │   ├── Card.tsx            # Card component
│   │   │   └── Card.css
│   │   ├── api.ts                  # API client functions
│   │   ├── types.ts                 # TypeScript type definitions
│   │   ├── App.tsx                  # Root component
│   │   ├── App.css
│   │   ├── App.test.tsx            # Frontend test
│   │   ├── index.tsx               # Entry point
│   │   ├── index.css
│   │   └── setupTests.ts            # Test setup
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                 # Frontend dependencies
│   └── tsconfig.json               # TypeScript config
│
├── package.json                     # Root package.json with scripts
├── README.md                        # Project documentation
├── PROJECT_STRUCTURE.md            # This file
└── .gitignore                       # Git ignore rules
```

## Key Files

### Backend
- **`backend/src/index.ts`**: Express server setup, API routes, and endpoints
- **`backend/src/store.ts`**: In-memory data store (can be replaced with database)
- **`backend/src/types.ts`**: Shared TypeScript interfaces for Card and Column
- **`backend/src/store.test.ts`**: Unit tests for the store

### Frontend
- **`frontend/src/components/Board.tsx`**: Main board component that orchestrates columns
- **`frontend/src/components/Column.tsx`**: Column component that displays cards
- **`frontend/src/components/Card.tsx`**: Individual card component with edit/delete/move
- **`frontend/src/api.ts`**: API client functions for communicating with backend
- **`frontend/src/types.ts`**: TypeScript type definitions matching backend

## Scripts

From the root directory:
- `npm run dev:backend` - Start backend development server
- `npm run dev:frontend` - Start frontend development server
- `npm run install:all` - Install all dependencies
- `npm run test:backend` - Run backend tests
- `npm run test:frontend` - Run frontend tests

