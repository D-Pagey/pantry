import { doesCategoryExist, getIndexOfId } from '.';

const arrayOfFoods = [
  {
    categories: ['111', '333'],
    date: new Date(),
    expires: 1,
    id: '1234',
    name: 'steak',
  },
  {
    categories: ['111', '222'],
    date: new Date(),
    expires: 1,
    id: '5678',
    name: 'salmon',
  },
];

describe('getIndexOfId function', () => {
  it('should return -1 if doesnt exist', () => {
    expect(getIndexOfId('123', arrayOfFoods)).toBe(-1);
  });

  it('should return the index is the id does exist', () => {
    expect(getIndexOfId('1234', arrayOfFoods)).toBe(0);
    expect(getIndexOfId('5678', arrayOfFoods)).toBe(1);
  });
});

const categories = [
  { label: 'meat', value: 'meat', colour: 'red', id: '111', count: 0 },
  { label: 'fish', colour: 'blue', value: 'fish', id: '222', count: 0 },
  { label: 'vegetables', colour: 'blue', value: 'vegetables', count: 0, id: '333' },
];

describe('doesCategoryExist function', () => {
  it('should return a boolean value', () => {
    expect(typeof doesCategoryExist(categories, 'meat')).toBe('boolean');
  });

  it.each`
        category   | doesExist
        ${'meat'}  | ${true}
        ${'dairy'} | ${false}
    `('should return $doesExist for $category', ({ category, doesExist }) => {
  expect(doesCategoryExist(categories, category)).toBe(doesExist);
});
});
