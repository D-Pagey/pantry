import React from 'react';
import { render } from '../../test-utils';
import { ModalChangeDate } from '.';

const props = {
    expires: new Date(),
    handleDateChange: () => {},
    handleModalClose: () => {}
};

describe('ModalChangeDate component', () => {
    it('should render', () => {
        const { container } = render(<ModalChangeDate {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
