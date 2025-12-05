import { Card, Column, BoardState } from './types';

// STONE SOUP TODO: Replace in-memory store with JSON file persistence
// STONE SOUP TODO: Add database integration (SQLite, PostgreSQL, etc.)
// STONE SOUP TODO: Implement optimistic locking for concurrent updates
class Store {
  private columns: Column[] = [
    { id: 'ideas', name: 'Ideas', order: 0 },
    { id: 'in-progress', name: 'In Progress', order: 1 },
    { id: 'done', name: 'Done', order: 2 },
  ];

  private cards: Card[] = [];

  getColumns(): Column[] {
    return [...this.columns];
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  getCardsByColumn(columnId: string): Card[] {
    return this.cards.filter(card => card.columnId === columnId);
  }

  getCard(id: string): Card | undefined {
    return this.cards.find(card => card.id === id);
  }

  addCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Card {
    const newCard: Card = {
      ...card,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.cards.push(newCard);
    return newCard;
  }

  updateCard(id: string, updates: Partial<Omit<Card, 'id' | 'createdAt'>>): Card | null {
    const index = this.cards.findIndex(card => card.id === id);
    if (index === -1) return null;

    this.cards[index] = {
      ...this.cards[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.cards[index];
  }

  deleteCard(id: string): boolean {
    const index = this.cards.findIndex(card => card.id === id);
    if (index === -1) return false;
    this.cards.splice(index, 1);
    return true;
  }

  moveCard(cardId: string, newColumnId: string): Card | null {
    return this.updateCard(cardId, { columnId: newColumnId });
  }

  // STONE SOUP TODO: Improve ID generation (use UUID library)
  private generateId(): string {
    return `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // STONE SOUP TODO: Add persistence methods (save/load from JSON file)
  // STONE SOUP TODO: Add data validation
  // STONE SOUP TODO: Add error handling for invalid operations
}

export const store = new Store();

