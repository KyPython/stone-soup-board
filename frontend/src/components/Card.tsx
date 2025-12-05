import React, { useState } from 'react';
import { Card as CardType } from '../types';
import './Card.css';

interface CardProps {
  card: CardType;
  onUpdate: (id: string, updates: Partial<CardType>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, columnId: string) => void;
  availableColumns: { id: string; name: string }[];
}

export const Card: React.FC<CardProps> = ({
  card,
  onUpdate,
  onDelete,
  onMove,
  availableColumns,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const handleSave = () => {
    onUpdate(card.id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(card.title);
    setDescription(card.description);
    setIsEditing(false);
  };

  // STONE SOUP TODO: Add drag-and-drop support
  // STONE SOUP TODO: Add card animations
  // STONE SOUP TODO: Improve card styling and layout
  // STONE SOUP TODO: Add card priority/color coding

  if (isEditing) {
    return (
      <div className="card editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="card-title-input"
          placeholder="Card title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="card-description-input"
          placeholder="Card description"
        />
        <div className="card-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleCancel} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title">{card.title}</h3>
      {card.description && <p className="card-description">{card.description}</p>}
      <div className="card-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
        <select
          value={card.columnId}
          onChange={(e) => onMove(card.id, e.target.value)}
          className="card-move-select"
        >
          {availableColumns.map((col) => (
            <option key={col.id} value={col.id}>
              Move to {col.name}
            </option>
          ))}
        </select>
        <button onClick={() => onDelete(card.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

