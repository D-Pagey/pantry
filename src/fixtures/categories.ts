export const CategoriesWithCounts = [
    {
        colour: 'red',
        count: 2,
        id: '888',
        name: 'meat'
    },
    {
        colour: 'blue',
        count: 0,
        id: '999',
        name: 'fish'
    },
    {
        colour: 'green',
        count: 1,
        id: '321',
        name: 'vegetables'
    },
    {
        colour: 'pink',
        count: 5,
        id: '579',
        name: 'snacks'
    }
];

export const CategoriesArray = [
    {
        colour: 'red',
        id: '111',
        name: 'meat'
    },
    {
        colour: 'blue',
        id: '222',
        name: 'fish'
    },
    {
        colour: 'green',
        id: '333',
        name: 'vegetables'
    },
    {
        colour: 'pink',
        id: '444',
        name: 'snacks'
    }
];

export const CategoriesObject = CategoriesArray.reduce((acc, curr) => {
    return {
        ...acc,
        [curr.id]: {
            colour: curr.colour,
            id: curr.id,
            name: curr.name
        }
    };
}, {});
