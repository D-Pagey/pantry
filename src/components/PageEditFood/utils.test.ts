import { Fridge, UserDan, UserJoe } from '../../fixtures';
import { swapIdForPhoto } from './utils';

describe('swapIdForPhoto function', () => {
    it('should swap the ID property for a photo', () => {
        const result = swapIdForPhoto(Fridge[0], [UserDan, UserJoe]);

        expect(result).toStrictEqual({
            batches: [
                {
                    expires: expect.any(Date),
                    ownerPhoto: 'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
                    servings: 1
                },
                { expires: expect.any(Date), ownerPhoto: 'https://joe-photo.com', servings: 2 },
                { expires: expect.any(Date), ownerPhoto: '', servings: 4 }
            ],
            category: 'vegetables',
            name: 'carrot'
        });
    });
});
