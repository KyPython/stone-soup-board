export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  name: string;
  order: number;
}

