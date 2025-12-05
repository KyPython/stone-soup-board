import { Card, Column } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Debug: Log API URL (remove in production)
if (process.env.NODE_ENV !== 'production') {
  console.log('API Base URL:', API_BASE_URL);
}

// STONE SOUP TODO: Add error handling wrapper
// STONE SOUP TODO: Add request retry logic
// STONE SOUP TODO: Add request caching
export const api = {
  async getColumns(): Promise<Column[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/columns`);
      if (!response.ok) {
        throw new Error(`Failed to fetch columns: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('API Error (getColumns):', error);
      throw new Error(`API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}. URL: ${API_BASE_URL}`);
    }
  },

  async getCards(): Promise<Card[]> {
    const response = await fetch(`${API_BASE_URL}/cards`);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    return response.json();
  },

  async createCard(card: { title: string; description: string; columnId: string }): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    if (!response.ok) {
      throw new Error('Failed to create card');
    }
    return response.json();
  },

  async updateCard(id: string, updates: Partial<Card>): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update card');
    }
    return response.json();
  },

  async moveCard(id: string, columnId: string): Promise<Card> {
    const response = await fetch(`${API_BASE_URL}/cards/${id}/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ columnId }),
    });
    if (!response.ok) {
      throw new Error('Failed to move card');
    }
    return response.json();
  },

  async deleteCard(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete card');
    }
  },
};

