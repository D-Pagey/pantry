type foodTypes = {
  category: string;
  date: Date;
  expires: number;
  id: string;
  name: string;
}[];

export const getIndexOfId = (id: string, food: foodTypes): number => {
  return food.reduce((acc, curr, index) => {
    if (curr.id === id) return index;

    return acc;
  }, -1);
};
