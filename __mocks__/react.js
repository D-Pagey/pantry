/* eslint-disable global-require */
const reactActual = jest.requireActual('react');

module.exports = {
    ...reactActual,
    // @TODO: remove when warnings are fixed: https://github.com/kentcdodds/react-testing-library/issues/281#issuecomment-465626540
    useState: (initialState) => {
        const [state, setState] = reactActual.useState(initialState);
        return [
            state,
            (value) => {
                require('react-dom/test-utils').act(() => {
                    setState(value);
                });
            }
        ];
    }
};
