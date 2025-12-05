import React, { useState } from 'react';
import { Column as ColumnType, Card as CardType } from '../types';
import { Card } from './Card';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  onUpdateCard: (id: string, updates: Partial<CardType>) => void;
  onDeleteCard: (id: string) => void;
  onMoveCard: (id: string, columnId: string) => void;
  onCreateCard: (card: { title: string; description: string; columnId: string }) => void;
  availableColumns: ColumnType[];
}

export const Column: React.FC<ColumnProps> = ({
  column,
  cards,
  onUpdateCard,
  onDeleteCard,
  onMoveCard,
  onCreateCard,
  availableColumns,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');

  const handleCreateCard = () => {
    if (newCardTitle.trim()) {
      onCreateCard({
        title: newCardTitle.trim(),
        description: newCardDescription.trim(),
        columnId: column.id,
      });
      setNewCardTitle('');
      setNewCardDescription('');
      setIsAddingCard(false);
    }
  };

  // STONE SOUP TODO: Add column reordering
  // STONE SOUP TODO: Add column editing/renaming
  // STONE SOUP TODO: Add column deletion
  // STONE SOUP TODO: Improve column styling

  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">{column.name}</h2>
        <span className="column-count">{cards.length}</span>
      </div>

      <div className="column-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onUpdate={onUpdateCard}
            onDelete={onDeleteCard}
            onMove={onMoveCard}
            availableColumns={availableColumns.filter((col) => col.id !== card.columnId)}
          />
        ))}
      </div>

      {isAddingCard ? (
        <div className="add-card-form">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Card title"
            className="add-card-input"
            autoFocus
          />
          <textarea
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            placeholder="Card description (optional)"
            className="add-card-textarea"
          />
          <div className="add-card-actions">
            <button onClick={handleCreateCard} className="btn-add">Add Card</button>
            <button onClick={() => setIsAddingCard(false)} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAddingCard(true)} className="btn-add-card">
          + Add Card
        </button>
      )}
    </div>
  );
};

