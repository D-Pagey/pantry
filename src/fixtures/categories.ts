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
            name: curr.name,
        }
    };
}, {});