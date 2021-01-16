import { Fridge } from '../../fixtures';
import { checkExistingCategory } from './utils';

describe('checkExistingCategory function', () => {
    it('should return a category when it already exists', () => {
        const category = checkExistingCategory(Fridge, Fridge[2].name);
        expect(category).toBe(Fridge[2].category);
    });

    it('should return an empty string if name does not exist', () => {
        const category = checkExistingCategory(Fridge, 'check-unique-name');
        expect(category).toBe('');
    });
});
