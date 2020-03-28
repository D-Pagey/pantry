import { addDays } from 'date-fns';
import { calculateExpiringSoon, indexOfLabel } from './utils';

describe('calculateExpiringSoon function', () => {
    const food = [
        {
            category: { label: 'meat', color: 'red' },
            expires: addDays(new Date(), 1),
            id: '1245',
            name: 'chicken',
            servings: 2
        },
        {
            category: { label: 'fish', color: 'blue' },
            expires: addDays(new Date(), 5),
            id: '5678',
            name: 'salmon',
            servings: 1
        }
    ];

    it('should return an array', () => {
        expect(Array.isArray(calculateExpiringSoon(food))).toBe(true);
    });

    it('should add an isExpiringSoon property to each food item', () => {
        expect(calculateExpiringSoon(food)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    isExpiringSoon: expect.any(Boolean)
                })
            ])
        );
    });

    it('should return correct values for isExpiringSoon', () => {
        const result = calculateExpiringSoon(food);

        expect(result[0]).toEqual(
            expect.objectContaining({
                isExpiringSoon: true
            })
        );
        expect(result[1]).toEqual(
            expect.objectContaining({
                isExpiringSoon: false
            })
        );
    });
});

describe('indexOfLabel function', () => {
    it('should return a number', () => {
        expect(typeof indexOfLabel(['fish', 'meat', 'chocolate'], 'fish')).toBe('number');
    });

    it('should return the index of a label', () => {
        const array = ['fish', 'meat', 'vegetables', 'chocolate'];

        expect(indexOfLabel(array, 'fish')).toBe(0);
        expect(indexOfLabel(array, 'meat')).toBe(1);
        expect(indexOfLabel(array, 'vegetables')).toBe(2);
        expect(indexOfLabel(array, 'dairy')).toBe(-1);
        expect(indexOfLabel(array, 'chocolate')).toBe(3);
    });
});
