import { differenceInDays } from 'date-fns';

interface FoodType {
  category: {
    label: string;
    color: string;
  };
  expires: Date;
  id: string;
  name: string;
  servings: number;
}

interface FoodWithExpiringType extends FoodType {
  isExpiringSoon: boolean;
}

export const indexOfLabel = (arrayOfLabels: string[], label: string): number => arrayOfLabels.reduce((acc, cur, index) => {
  if (cur === label) return index;
  return acc;
}, -1);

export const calculateExpiringSoon = (food: FoodType[]): FoodWithExpiringType[] => food.map((item) => {
  const difference = differenceInDays(item.expires, new Date());

  return {
    ...item,
    isExpiringSoon: difference <= 2,
  };
});

export const updateCategoriesObject = () => {
  return {};
};