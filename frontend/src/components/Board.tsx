import React, { useEffect, useState } from 'react';
import { Column as ColumnType, Card as CardType } from '../types';
import { api } from '../api';
import { Column } from './Column';
import './Board.css';

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [columnsData, cardsData] = await Promise.all([
        api.getColumns(),
        api.getCards(),
      ]);
      setColumns(columnsData.sort((a, b) => a.order - b.order));
      setCards(cardsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async (card: {
    title: string;
    description: string;
    columnId: string;
  }) => {
    try {
      const newCard = await api.createCard(card);
      setCards([...cards, newCard]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create card');
    }
  };

  const handleUpdateCard = async (id: string, updates: Partial<CardType>) => {
    try {
      const updatedCard = await api.updateCard(id, updates);
      setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update card');
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await api.deleteCard(id);
      setCards(cards.filter((card) => card.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete card');
    }
  };

  const handleMoveCard = async (id: string, columnId: string) => {
    try {
      const movedCard = await api.moveCard(id, columnId);
      setCards(cards.map((card) => (card.id === id ? movedCard : card)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move card');
    }
  };

  // STONE SOUP TODO: Add optimistic updates for better UX
  // STONE SOUP TODO: Add error recovery/retry logic
  // STONE SOUP TODO: Add loading states for individual operations
  // STONE SOUP TODO: Add WebSocket support for real-time updates

  if (loading) {
    return <div className="board-loading">Loading board...</div>;
  }

  if (error) {
    return (
      <div className="board-error">
        <p>Error: {error}</p>
        <button onClick={loadData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="board">
      <header className="board-header">
        <h1>Stone Soup Board</h1>
        <p className="board-subtitle">A minimal kanban board for iterative, collaborative improvement</p>
      </header>
      <div className="board-columns">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            cards={cards.filter((card) => card.columnId === column.id)}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
            onMoveCard={handleMoveCard}
            onCreateCard={handleCreateCard}
            availableColumns={columns}
          />
        ))}
      </div>
    </div>
  );
};

