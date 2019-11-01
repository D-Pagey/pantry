import { getIndexOfId } from '.';

const arrayOfFoods = [
  {
    category: 'meat',
    date: new Date(),
    expires: 1,
    id: '1234',
    name: 'steak'
  },
  {
    category: 'fish',
    date: new Date(),
    expires: 1,
    id: '5678',
    name: 'salmon'
  }
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
