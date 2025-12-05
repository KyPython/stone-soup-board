import express, { Request, Response } from 'express';
import cors from 'cors';
import { store } from './store';
import { Card, Column } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Security: Disable X-Powered-By header
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Get all columns
app.get('/api/columns', (req: Request, res: Response) => {
  try {
    const columns = store.getColumns();
    res.json(columns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
});

// Get all cards
app.get('/api/cards', (req: Request, res: Response) => {
  try {
    const cards = store.getCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Get cards by column
app.get('/api/columns/:columnId/cards', (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const cards = store.getCardsByColumn(columnId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Create a new card
app.post('/api/cards', (req: Request, res: Response) => {
  try {
    const { title, description, columnId } = req.body;

    // STONE SOUP TODO: Add input validation middleware
    if (!title || !columnId) {
      return res.status(400).json({ error: 'Title and columnId are required' });
    }

    const card = store.addCard({
      title,
      description: description || '',
      columnId,
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Update a card
app.put('/api/cards/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, columnId } = req.body;

    const updates: Partial<Card> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (columnId !== undefined) updates.columnId = columnId;

    const updatedCard = store.updateCard(id, updates);
    if (!updatedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// Move a card to a different column
app.patch('/api/cards/:id/move', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { columnId } = req.body;

    if (!columnId) {
      return res.status(400).json({ error: 'columnId is required' });
    }

    const movedCard = store.moveCard(id, columnId);
    if (!movedCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json(movedCard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to move card' });
  }
});

// Delete a card
app.delete('/api/cards/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = store.deleteCard(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// STONE SOUP TODO: Add error handling middleware
// STONE SOUP TODO: Add request logging middleware
// STONE SOUP TODO: Add rate limiting
// STONE SOUP TODO: Add authentication/authorization

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

