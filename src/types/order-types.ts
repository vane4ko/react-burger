export type orderFormData = {
  ingredients: string[];
};
export type orderResponseFormData = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
