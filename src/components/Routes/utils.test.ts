import { swapUserIdsForPhotos } from './utils';
import { Fridge, User, User2, User3 } from '../../fixtures';

describe('swapUserIdsForPhotos function', () => {
    it('should swap user ids for photos', () => {
        const databaseFridge = Fridge;
        const users = [User, User2, User3];
        const swapped = swapUserIdsForPhotos(databaseFridge, users);

        expect(swapped).toStrictEqual([
            {
                batches: [
                    { expires: expect.any(Date), ownerPhoto: 'http://place-puppy.com/200x200', servings: 1 },
                    {
                        expires: expect.any(Date),
                        ownerPhoto: 'http://lorempixel.com/400/400/sports/',
                        servings: 2
                    },
                    {
                        expires: expect.any(Date),
                        ownerPhoto:
                            'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
                        servings: 4
                    }
                ],
                category: 'vegetables',
                name: 'carrot'
            },
            {
                batches: [
                    { expires: expect.any(Date), ownerPhoto: 'http://place-puppy.com/200x200', servings: 1 },
                    {
                        expires: expect.any(Date),
                        ownerPhoto: 'http://lorempixel.com/400/400/sports/',
                        servings: 2
                    },
                    {
                        expires: expect.any(Date),
                        ownerPhoto:
                            'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
                        servings: 4
                    }
                ],
                category: 'vegetables',
                name: 'broccoli'
            },
            {
                batches: [
                    { expires: expect.any(Date), ownerPhoto: 'http://place-puppy.com/200x200', servings: 1 },
                    {
                        expires: expect.any(Date),
                        ownerPhoto: 'http://lorempixel.com/400/400/sports/',
                        servings: 2
                    },
                    {
                        expires: expect.any(Date),
                        ownerPhoto:
                            'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
                        servings: 4
                    }
                ],
                category: 'meat',
                name: 'steak'
            },
            {
                batches: [
                    { expires: expect.any(Date), ownerPhoto: 'http://place-puppy.com/200x200', servings: 1 },
                    {
                        expires: expect.any(Date),
                        ownerPhoto: 'http://lorempixel.com/400/400/sports/',
                        servings: 2
                    },
                    {
                        expires: expect.any(Date),
                        ownerPhoto:
                            'https://lh3.googleusercontent.com/a-/AOh14Gi6ZcKd1ClkJqBEEP114ZJ07XWJfQLKJKL6apgFgQ',
                        servings: 4
                    }
                ],
                category: 'dairy',
                name: 'milk'
            }
        ]);
    });
});
