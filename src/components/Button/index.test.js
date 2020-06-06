import React from 'react';
import { Button } from '.';

describe('Button component', () => {
    it('should render', () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.todo('should call onClick once clicked');
    it.todo('should not call onClick if disabled');
});