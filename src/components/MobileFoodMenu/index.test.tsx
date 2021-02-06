import { render } from '../../test-utils';
import { TenantDan, TenantHeidi } from '../../fixtures';
import { SortOptions } from '../PageFood/foodReducer';
import { MobileFoodMenu } from '.';

const props = {
    handleFoodDelete: () => null,
    handleApplyFilters: () => null,
    tenants: [TenantHeidi, TenantDan],
    foodPageFilters: {
        selectedOwners: [],
        showOnlyExpiring: true,
        sortBy: 'name' as SortOptions
    }
};

describe('MobileFoodMenu component', () => {
    it('should render', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
