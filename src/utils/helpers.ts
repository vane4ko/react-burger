export const countById = (array: { _id: string }[], id: string): number => {
  return array.reduce(
    (count, item) => (item._id === id ? count + 1 : count),
    0
  );
};
