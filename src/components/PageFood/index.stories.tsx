import { FC } from 'react';

import { UserDan, Fridge, TenantHeidi, Categories } from '../../fixtures';
import { AuthContext } from '../ProviderAuth';
import { PageFood } from '.';

export default { title: 'PageFood' };

export const normal: FC = () => (
    <AuthContext.Provider
        value={{
            fetchUserData: () => null,
            signOut: () => null,
            user: UserDan
        }}
    >
        <PageFood fridge={Fridge} tenants={[TenantHeidi]} categories={Categories} />
    </AuthContext.Provider>
);
