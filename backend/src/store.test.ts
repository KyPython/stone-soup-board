import { store } from './store';
import { Card } from './types';

// Reset store before each test
beforeEach(() => {
  // STONE SOUP TODO: Add proper store reset method
  // For now, we'll work with the existing state
});

describe('Store', () => {
  test('should get all columns', () => {
    const columns = store.getColumns();
    expect(columns).toHaveLength(3);
    expect(columns[0].name).toBe('Ideas');
    expect(columns[1].name).toBe('In Progress');
    expect(columns[2].name).toBe('Done');
  });

  test('should add a new card', () => {
    const card = store.addCard({
      title: 'Test Card',
      description: 'Test Description',
      columnId: 'ideas',
    });

    expect(card).toHaveProperty('id');
    expect(card.title).toBe('Test Card');
    expect(card.description).toBe('Test Description');
    expect(card.columnId).toBe('ideas');
    expect(card).toHaveProperty('createdAt');
    expect(card).toHaveProperty('updatedAt');
  });

  test('should get cards by column', () => {
    store.addCard({
      title: 'Card 1',
      description: 'Desc 1',
      columnId: 'ideas',
    });

    store.addCard({
      title: 'Card 2',
      description: 'Desc 2',
      columnId: 'in-progress',
    });

    const ideasCards = store.getCardsByColumn('ideas');
    expect(ideasCards.length).toBeGreaterThan(0);
    expect(ideasCards.every(card => card.columnId === 'ideas')).toBe(true);
  });

  test('should update a card', () => {
    const card = store.addCard({
      title: 'Original Title',
      description: 'Original Description',
      columnId: 'ideas',
    });

    const updated = store.updateCard(card.id, {
      title: 'Updated Title',
      description: 'Updated Description',
    });

    expect(updated).not.toBeNull();
    expect(updated?.title).toBe('Updated Title');
    expect(updated?.description).toBe('Updated Description');
    expect(updated?.updatedAt).not.toBe(card.updatedAt);
  });

  test('should move a card to different column', () => {
    const card = store.addCard({
      title: 'Moveable Card',
      description: 'This card will move',
      columnId: 'ideas',
    });

    const moved = store.moveCard(card.id, 'done');
    expect(moved).not.toBeNull();
    expect(moved?.columnId).toBe('done');
  });

  test('should delete a card', () => {
    const card = store.addCard({
      title: 'To Delete',
      description: 'Will be deleted',
      columnId: 'ideas',
    });

    const deleted = store.deleteCard(card.id);
    expect(deleted).toBe(true);

    const found = store.getCard(card.id);
    expect(found).toBeUndefined();
  });

  // STONE SOUP TODO: Add more test cases for edge cases
  // STONE SOUP TODO: Add tests for error scenarios
  // STONE SOUP TODO: Add integration tests
});

