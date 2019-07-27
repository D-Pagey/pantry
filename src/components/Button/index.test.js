import React from 'react';
import Button from '.';

const props = {
    testId: 'testButton'
};

describe('Button component', () => {
    it('should render', () => {
        const { container } = render(<Button {...props}>Click Me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render specified width button', () => {
        const width = '300px';
        const { getByText } = render(
            <Button width={width} {...props}>
                Wide Button
            </Button>
        );
        expect(getByText('Wide Button')).toHaveStyleRule('width', width);
    });

    it.each`
        variant         | backgroundColor
        ${'selected'}   | ${'linear-gradient(199.65deg,#288efc 0%,#2863fc 100%)'}
        ${'unselected'} | ${'white'}
    `('should render $variant styles', ({ variant, backgroundColor }) => {
        const { getByTestId } = render(
            <Button {...props} variant={variant}>
                Click Me
            </Button>
        );

        expect(getByTestId(props.testId)).toHaveStyleRule('background-color', backgroundColor);
    });
});
