interface CategoryType {
  label: string;
  colour: string;
}

interface CategoryWithCountType extends CategoryType {
  count: number;
}

export const indexOfLabel = (arrayOfLabels: string[], label: string): number => {
  return arrayOfLabels.reduce((acc, cur, index) => {
    if (cur === label) return index;
    return acc;
  }, -1);
};

export const countCategories = (categories: CategoryType[]): CategoryWithCountType[] => {
  if (categories.length === 0) return [];

  const reducedCategories = categories.reduce(
    (acc, curr, idx) => {
      const arrayOfLabels = acc.map((item) => item.label);
      const index = indexOfLabel(arrayOfLabels, curr.label);

      if (idx === 0) {
        const initial = [...acc];
        initial[0] = { ...curr, count: 1 };
        return initial;
      }

      if (index === -1) {
        acc.push({ ...curr, count: 1 });
      } else {
        const newAcc = [...acc];
        newAcc[index].count += 1;
        return newAcc;
      }

      return acc;
    },
    [{ count: 0, label: '', colour: '' }]
  );

  reducedCategories.push({ label: 'all', colour: 'blue', count: categories.length });

  return reducedCategories;
};
