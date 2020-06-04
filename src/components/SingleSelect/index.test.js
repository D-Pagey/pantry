import React from 'react';
import userEvent from '@testing-library/user-event';
import { colours } from '../../tokens';
import { SingleSelect } from '.';

const props = {
    options: [
        {
            label: '20+',
            value: 20
        },
        {
            label: '40+',
            value: 40
        }
    ],
    label: '',
    selected: null,
    setSelected: () => {},
    testId: 'singleSelect'
};

describe('SingleSelect component', () => {
    it('should render', () => {
        const { container } = render(<SingleSelect {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle click', () => {
        const setSelected = jest.fn();
        const { getByTestId } = render(<SingleSelect {...props} setSelected={setSelected} />);
        const button = getByTestId('singleSelectButton0');

        userEvent.click(button);

        expect(setSelected).toHaveBeenCalledWith(props.options[0]);
    });

    it('should render with margin', () => {
        const margin = '1rem 0';
        const { getByTestId } = render(<SingleSelect {...props} margin={margin} />);
        expect(getByTestId(props.testId)).toHaveStyleRule('margin', margin);
    });

    it('should render with label', () => {
        const label = 'What category of food is it?';
        const { getByText } = render(<SingleSelect {...props} label={label} />);
        getByText(label);
    });

    it('should render correct selected/unselected buttons', () => {
        const { getByTestId } = render(<SingleSelect {...props} selected={20} />);

        expect(getByTestId('singleSelectButton0')).toHaveStyleRule(
            'background-color',
            colours.darkGreen100
        );
        expect(getByTestId('singleSelectButton1')).toHaveStyleRule('background-color', colours.white);
    });
});
