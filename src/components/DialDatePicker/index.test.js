import React from 'react';
import userEvent from '@testing-library/user-event';
import { addWeeks, addDays, addMonths, addYears, subDays, subMonths, subYears } from 'date-fns';
import { DialDatePicker } from '.';

const props = {
    date: new Date('March 10, 2019 03:24:00'),
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
        name           | handler      | direction | index
        ${'addDays'}   | ${addDays}   | ${'Up'}   | ${0}
        ${'addMonths'} | ${addMonths} | ${'Up'}   | ${1}
        ${'addYears'}  | ${addYears}  | ${'Up'}   | ${2}
        ${'subDays'}   | ${subDays}   | ${'Down'} | ${0}
        ${'subMonths'} | ${subMonths} | ${'Down'} | ${1}
        ${'subYears'}  | ${subYears}  | ${'Down'} | ${2}
    `('should call $handler with right value', ({ handler, direction, index }) => {
        const setDate = jest.fn();
        const { queryAllByText } = render(<DialDatePicker {...props} setDate={setDate} />);
        const button = queryAllByText(direction)[index];
        const futureDate = handler(props.date, 1);

        userEvent.click(button);

        expect(setDate).toHaveBeenCalledWith(futureDate);
    });

    it('should handle week increment', () => {
        const setDate = jest.fn();
        const { getByText } = render(<DialDatePicker {...props} setDate={setDate} />);
        const oneWeeksTime = addWeeks(props.date, 1);

        userEvent.click(getByText('Add 1 week'));

        expect(setDate).toHaveBeenCalledWith(oneWeeksTime);
    });
});
