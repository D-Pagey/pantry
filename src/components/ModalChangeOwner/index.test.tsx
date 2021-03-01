import { render } from '../../test-utils';
import { ModalChangeOwner } from '.';
import { TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';

const props = {
    currentOwner: TenantDan,
    expiryDate: new Date(),
    itemName: 'steak',
    tenants: [TenantDan, TenantJoe, TenantHeidi],
    unit: 'servings'
};

describe('ModalChangeOwner component', () => {
    it('should render', () => {
        const { container } = render(<ModalChangeOwner {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
