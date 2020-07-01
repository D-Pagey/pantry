import React from 'react';
import { addDays } from 'date-fns';

import { render } from '../../test-utils';
import { Donut } from '.';

const props = {
    date: new Date()
};

describe('Donut component', () => {
    it('should render', () => {
        const { container } = render(<Donut {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render expired text when passed expired date', () => {
        const { getByText } = render(<Donut {...props} date={addDays(new Date(), -1)} />);
        getByText('Expired');
    });
});
