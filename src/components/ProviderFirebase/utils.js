/** checkIndex function
 * @param {array} array an array of objects with category and count keys
 * @param {string} label a string of what to check in the category key
 */
export const checkIndex = (array, category) => {
    return array.reduce((acc, cur, index) => {
        if (cur.category === category) return index;
        return acc;
    }, -1);
};

/** countCategories function
 * @param {array} categories an array of category objects with label and value keys
 */
export const countCategories = (categories) => {
    const reducedCategories = categories.reduce((acc, curr) => {
        const index = checkIndex(acc, curr);

        if (index === -1) {
            acc.push({ category: curr, count: 1 });
        } else {
            const newAcc = [...acc];
            newAcc[index].count += 1;
            return newAcc;
        }

        return acc;
    }, []);

    reducedCategories.push({ category: 'all', count: categories.length });

    return reducedCategories;
};
