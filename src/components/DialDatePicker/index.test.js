import React from 'react';
import userEvent from '@testing-library/user-event';
import dateFns from 'date-fns';
import DialDatePicker from '.';

const props = {
    initialDate: new Date()
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
        direction     | unit        | buttonIndex | dateFormat | testId
        ${'increase'} | ${'Days'}   | ${'0'}      | ${'Do'}    | ${'dialDatePickerDay'}
        ${'increase'} | ${'Months'} | ${'1'}      | ${'MMMM'}  | ${'dialDatePickerMonth'}
        ${'increase'} | ${'Years'}  | ${'2'}      | ${'YYYY'}  | ${'dialDatePickerYear'}
        ${'decrease'} | ${'Days'}   | ${'0'}      | ${'Do'}    | ${'dialDatePickerDay'}
        ${'decrease'} | ${'Months'} | ${'1'}      | ${'MMMM'}  | ${'dialDatePickerMonth'}
        ${'decrease'} | ${'Years'}  | ${'2'}      | ${'YYYY'}  | ${'dialDatePickerYear'}
    `(
        'should handle $direction in $unit ',
        ({ direction, unit, buttonIndex, dateFormat, testId }) => {
            const { queryAllByText, getByTestId } = render(<DialDatePicker {...props} />);
            const buttons = queryAllByText(direction === 'increase' ? 'Up' : 'Down');
            const addOrSub = direction === 'increase' ? 'add' : 'sub';
            const futureDate = dateFns[`${addOrSub}${unit}`](props.initialDate, 1);

            userEvent.click(buttons[buttonIndex]);

            expect(getByTestId(testId)).toHaveTextContent(dateFns.format(futureDate, dateFormat));
        }
    );

    it('should handle week increment', () => {
        const { getByText, getByTestId } = render(<DialDatePicker {...props} />);
        const oneWeeksTime = dateFns.addWeeks(props.initialDate, 1);

        userEvent.click(getByText('Add 1 week'));

        expect(getByTestId('dialDatePickerDay')).toHaveTextContent(
            dateFns.format(oneWeeksTime, 'Do')
        );
        expect(getByTestId('dialDatePickerMonth')).toHaveTextContent(
            dateFns.format(oneWeeksTime, 'MMMM')
        );
        expect(getByTestId('dialDatePickerYear')).toHaveTextContent(
            dateFns.format(oneWeeksTime, 'YYYY')
        );
    });
});
