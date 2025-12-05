# Stone Soup Board

A minimal kanban board application explicitly designed for iterative contribution and refactoring. This project follows the "Stone Soup" philosophy—starting with a simple foundation that invites collaborative improvement.

## Purpose

This project serves as a practice ground for:
- **Iterative Development**: Start with an MVP and improve it incrementally
- **Collaborative Contribution**: Clear markers (`// STONE SOUP TODO`) indicate where improvements are welcome
- **Full-Stack Learning**: React + TypeScript frontend with Node.js + Express + TypeScript backend
- **Code Quality**: Includes tests and encourages refactoring

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Testing**: Jest (backend), React Testing Library (frontend)
- **Storage**: In-memory (easily replaceable with JSON file or database)

## Features (MVP)

- ✅ Three columns: "Ideas", "In Progress", "Done"
- ✅ Cards with title and description
- ✅ Add new cards to any column
- ✅ Edit existing cards
- ✅ Move cards between columns
- ✅ Delete cards

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Two terminal windows/tabs

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stone-soup-app
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install manually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Running the Application

**Terminal 1 - Backend:**
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
# or
cd frontend && npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Running Tests

**Backend tests:**
```bash
npm run test:backend
# or
cd backend && npm test
```

**Frontend tests:**
```bash
npm run test:frontend
# or
cd frontend && npm test
```

## API Endpoints

### Columns
- `GET /api/columns` - Get all columns
- `GET /api/columns/:columnId/cards` - Get cards in a specific column

### Cards
- `GET /api/cards` - Get all cards
- `POST /api/cards` - Create a new card
  ```json
  {
    "title": "Card Title",
    "description": "Card Description",
    "columnId": "ideas"
  }
  ```
- `PUT /api/cards/:id` - Update a card
- `PATCH /api/cards/:id/move` - Move a card to a different column
  ```json
  {
    "columnId": "done"
  }
  ```
- `DELETE /api/cards/:id` - Delete a card

### Example API Calls

```bash
# Get all columns
curl http://localhost:3001/api/columns

# Create a new card
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{"title":"New Idea","description":"This is a new idea","columnId":"ideas"}'

# Move a card
curl -X PATCH http://localhost:3001/api/cards/card-123/move \
  -H "Content-Type: application/json" \
  -d '{"columnId":"in-progress"}'

# Get all cards
curl http://localhost:3001/api/cards
```

## Project Structure

```
stone-soup-app/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server
│   │   ├── store.ts           # In-memory data store
│   │   ├── types.ts           # TypeScript types
│   │   └── store.test.ts      # Backend tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Board.tsx
│   │   │   ├── Column.tsx
│   │   │   └── Card.tsx
│   │   ├── api.ts             # API client
│   │   ├── types.ts           # TypeScript types
│   │   ├── App.tsx
│   │   └── App.test.tsx       # Frontend test
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── package.json               # Root scripts
└── README.md
```

## Contributing - Next Iteration Ideas

Look for `// STONE SOUP TODO` comments throughout the codebase. Here are some suggested improvements:

### Features to Add

1. **Drag and Drop**
   - Implement drag-and-drop for cards between columns
   - Add drag-and-drop for column reordering
   - Use a library like `react-beautiful-dnd` or `@dnd-kit/core`

2. **Persistence**
   - Replace in-memory store with JSON file persistence
   - Add database integration (SQLite, PostgreSQL, MongoDB)
   - Implement data export/import functionality

3. **User Experience**
   - Add card priority/color coding
   - Add due dates and reminders
   - Add card labels/tags
   - Add search and filtering
   - Add card comments/notes

4. **Real-time Collaboration**
   - Add WebSocket support for real-time updates
   - Add multi-user support
   - Show who's editing what

5. **UI/UX Improvements**
   - Improve responsive design for mobile
   - Add dark mode
   - Add animations and transitions
   - Improve accessibility (ARIA labels, keyboard navigation)

### Refactoring Opportunities

1. **Backend**
   - Add input validation middleware
   - Add error handling middleware
   - Add request logging
   - Add rate limiting
   - Add authentication/authorization
   - Improve ID generation (use UUID library)
   - Add optimistic locking for concurrent updates

2. **Frontend**
   - Add state management (Redux, Zustand, or Context API)
   - Add optimistic updates for better UX
   - Add error recovery/retry logic
   - Mock API calls in tests
   - Add more comprehensive test coverage
   - Add loading states for individual operations

3. **Architecture**
   - Split API into separate route files
   - Add API versioning
   - Add request/response validation schemas
   - Add API documentation (Swagger/OpenAPI)

### Testing Improvements

1. Add integration tests
2. Add E2E tests (Cypress or Playwright)
3. Increase test coverage
4. Add tests for error scenarios
5. Add performance tests

## How to Contribute

1. Find a `// STONE SOUP TODO` comment
2. Implement the improvement
3. Add tests for your changes
4. Update this README if needed
5. Submit a pull request

## License

MIT

