import React from 'react';
import { addDays, addWeeks, format } from 'date-fns';
import GridRows from '.';

const props = {
    data: [
        {
            category: { label: 'Meat', value: 'meat' },
            expires: addWeeks(new Date(), 1),
            name: 'carrots',
            servings: { label: '2', value: '2' }
        }
    ],
    handleDelete: () => {}
};

describe('GridRows component', () => {
    it('should render', () => {
        const { container } = render(<GridRows {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        colour    | date
        ${'red'}  | ${new Date()}
        ${'blue'} | ${addDays(new Date(), 2)}
    `('should have $colour for expiry date', ({ colour, date }) => {
        const data = [{ ...props.data[0], expires: date }];
        const { getByText } = render(<GridRows {...props} data={data} />);
        const expiryDate = getByText(format(date, 'do MMM'));

        expect(expiryDate).toHaveStyleRule('color', colour);
    });
});
