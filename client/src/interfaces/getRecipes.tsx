export interface Recipe {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    ingredients: string[];
    instructions: string | string[]; // Explicitly define the type
    category: string;
  }