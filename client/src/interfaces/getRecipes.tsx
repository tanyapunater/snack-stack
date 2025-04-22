export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  imgUrl?: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  createdBy?: {
    _id: string;
    username: string;
  };
}
