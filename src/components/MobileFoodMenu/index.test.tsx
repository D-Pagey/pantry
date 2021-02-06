import { render } from '../../test-utils';
import { TenantDan, TenantHeidi } from '../../fixtures';
import { MobileFoodMenu } from '.';

const props = {
    handleFoodDelete: () => null,
    handleApplyFilters: () => null,
    tenants: [TenantHeidi, TenantDan]
};

describe('MobileFoodMenu component', () => {
    it('should render', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
