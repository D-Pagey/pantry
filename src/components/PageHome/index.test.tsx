import React from 'react';
import { toast } from 'react-toastify';
import { render } from '../../test-utils';
import { PageHome } from '.';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn()
    }
}));

const context = {
    expiringCount: 0
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render toast notification if expiringCount > 0', () => {
        const expiringCount = 1;

        render(<PageHome />, { ...context, expiringCount });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toast.error).toHaveBeenCalledWith(`${expiringCount} expiring items`);
    });
});
