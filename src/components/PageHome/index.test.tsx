import React from 'react';
import { toast } from 'react-toastify';

import { render } from '../../test-utils';
import { PageHome } from '.';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn()
    }
}));

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render toast notification if expiringCount > 0', () => {
        const expiringCount = 1;

        render(<PageHome expiringCount={expiringCount} />);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toast.error).toHaveBeenCalledWith(`${expiringCount} expiring items`, { onClick: expect.any(Function) });
    });
});
