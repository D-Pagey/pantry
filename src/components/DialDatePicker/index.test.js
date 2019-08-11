import React from 'react';
import userEvent from '@testing-library/user-event';
import dateFns from 'date-fns';
import DialDatePicker from '.';

const props = {
    date: new Date(),
    setDate: () => {}
};

describe('DialDatePicker component', () => {
    it('should render', () => {
        const { container } = render(<DialDatePicker {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render label', () => {
        const label = 'Expiry date?';
        const { getByText } = render(<DialDatePicker {...props} label={label} />);
        getByText(label);
    });

    it.each`
        direction     | unit        | buttonIndex
        ${'increase'} | ${'Days'}   | ${'0'}
        ${'increase'} | ${'Months'} | ${'1'}
        ${'increase'} | ${'Years'}  | ${'2'}
        ${'decrease'} | ${'Days'}   | ${'0'}
        ${'decrease'} | ${'Months'} | ${'1'}
        ${'decrease'} | ${'Years'}  | ${'2'}
    `('should handle $direction in $unit ', ({ direction, unit, buttonIndex }) => {
        const setDate = jest.fn();
        const { queryAllByText } = render(<DialDatePicker {...props} setDate={setDate} />);
        const isIncreaseButton = direction === 'increase';
        const buttons = queryAllByText(isIncreaseButton ? 'Up' : 'Down');
        const addOrSub = isIncreaseButton ? 'add' : 'sub';
        const futureDate = dateFns[`${addOrSub}${unit}`](props.date, 1);

        userEvent.click(buttons[buttonIndex]);

        expect(setDate).toHaveBeenCalledWith(futureDate);
    });

    it('should handle week increment', () => {
        const setDate = jest.fn();
        const { getByText } = render(<DialDatePicker {...props} setDate={setDate} />);
        const oneWeeksTime = dateFns.addWeeks(props.date, 1);

        userEvent.click(getByText('Add 1 week'));

        expect(setDate).toHaveBeenCalledWith(oneWeeksTime);
    });
});
