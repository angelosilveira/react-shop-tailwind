export type RatingType = {
  rate: number;
  count: number;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  rating?: RatingType;
  quantity?: number;
};
