export type OrderFormData = {
  ingredients: string[];
};
export type OrderResponseFormData = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
