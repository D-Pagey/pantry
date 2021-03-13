import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { TenantDan, TenantHeidi, UserDan } from '../../fixtures';
import { PageSettings } from '.';

const props = {
    tenants: [TenantHeidi, TenantDan]
};

const context = {
    signOut: () => null,
    user: UserDan
};

describe('PageSettings component', () => {
    it('should render', () => {
        const { container } = render(<PageSettings {...props} />, context);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call sign out on click', () => {
        const signOut = jest.fn();
        const { getByTestId } = render(<PageSettings {...props} />, { ...context, signOut });

        userEvent.click(getByTestId('PageSettingsButton'));

        expect(signOut).toHaveBeenCalled();
    });
});
