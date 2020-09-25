import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Button } from '.';

describe('Button component', () => {
    it('should render', () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick once clicked', () => {
        const onClick = jest.fn();
        const name = 'Click me';
        const { getByText } = render(<Button onClick={onClick}>{name}</Button>);

        userEvent.click(getByText(name));

        expect(onClick).toHaveBeenCalled();
    });

    it('should have disabled attribute if passed disabled prop', () => {
        const { getByText } = render(<Button disabled>Click me</Button>);
        expect(getByText('Click me')).toBeDisabled();
    });

    it('should not call onClick function if disabled', () => {
        const onClick = jest.fn();
        const name = 'Click me';
        const { getByText } = render(
            <Button onClick={onClick} disabled>
                {name}
            </Button>
        );

        userEvent.click(getByText(name));

        expect(onClick).not.toHaveBeenCalled();
    });

    it('should render loading content when loading', () => {
        const loadingContent = 'I am loading';

        const { getByText } = render(
            <Button isLoading loadingContent={loadingContent}>
                Helloooooo
            </Button>
        );

        getByText(loadingContent);
    });
});
