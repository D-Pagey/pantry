import { addDays } from 'date-fns';
import { Fridge } from '../../fixtures';
import { FoodType } from '../../types';
import { countExpiringFoodItems } from './utils';

describe('formatExpiryDates function', () => {
    it.todo('should convert timestamps to dates');
});

describe('countExpiringFoodItems function', () => {
    it('should return the count of 2 with expiring batches', () => {
        const HalfExpiringFridge: FoodType[] = [
            Fridge[0],
            Fridge[1],
            {
                batches: [{
                    expires: addDays(new Date(), 5),
                    owner: '123',
                    servings: 1
                }],
                category: 'dairy',
                name: 'milk'
            }
        ];
        
        
        const count = countExpiringFoodItems(HalfExpiringFridge);
        expect(count).toBe(2);
    });

    it('should return the correct count of 0 with no expiring batches', () => {
        const HalfExpiringFridge: FoodType[] = [
            {
                batches: [{
                    expires: addDays(new Date(), 5),
                    owner: '123',
                    servings: 1
                }],
                category: 'dairy',
                name: 'milk'
            }
        ];
        
        
        const count = countExpiringFoodItems(HalfExpiringFridge);
        expect(count).toBe(0);
    });
});