import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FoodType, TenantType, BatchType, DatabaseFoodType, MetaDataType } from '../../types';
import { formatExpiryDates, countExpiringFoodItems } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageSettings } from '../PageSettings';
import { PageSignIn } from '../PageSignIn';
import { PageMagicLanding } from '../PageMagicLanding';
import { PageAlexa } from '../PageAlexa';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>();
    const [tenants, setTenants] = useState<TenantType[]>();
    const [expiringCount, setExpiringCount] = useState<number>(0);
    const [metaData, setMetaData] = useState<MetaDataType>();
    const { user } = useContext(AuthContext);

    const updateBatch = ({ name, batch }: { name: string; batch: BatchType }): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({
                    [`fridge.${name}.batches.${batch.id}`]: batch
                })
                // .then(() => toast.success(`Batch updated for ${name}`))
                // TODO: Do we need toast here?
                .then(() => null)
                .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const updateExistingProperties = ({
        name,
        category,
        unit
    }: {
        name: string;
        category: string;
        unit: string;
    }): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({
                    [`fridge.${name}`]: { name, category, unit }
                })
                // .then(() => toast.success(`${name} (${category}) added`))
                // TODO: Do we need a toast for adding food?!
                .then(() => null)
                .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const getFridgeData = useCallback(() => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                // eslint-disable-next-line
                .onSnapshot((doc: any) => {
                    const data = doc.data();

                    if (data) {
                        const fridgeItems: DatabaseFoodType[] = Object.values(data.fridge);
                        const formattedDates = formatExpiryDates(fridgeItems);
                        const firebaseTenants = Object.values(data.tenants) as TenantType[];

                        setFridge(formattedDates);
                        setMetaData(data.meta);
                        setTenants(firebaseTenants.filter((tenant) => tenant.houseRole !== 'alexa'));
                    }
                });
        }
    }, [user]);

    useEffect(() => {
        if (user?.household) {
            getFridgeData();
        }
    }, [getFridgeData, user]);

    return (
        <Switch>
            <Route exact path="/">
                <PageHome />
            </Route>

            <Route path="/sign-in">
                <PageSignIn />
            </Route>

            <Route path="/magic">
                <PageMagicLanding />
            </Route>

            <Route path="/alexa">
                <PageAlexa />
            </Route>

            <RouteProtected path="/food">
                {fridge && tenants && <PageFood fridge={fridge} tenants={tenants} />}
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                {fridge && tenants && <PageEditFood fridge={fridge} tenants={tenants} updateBatch={updateBatch} />}
            </RouteProtected>

            {metaData && (
                <RouteProtected path="/add">
                    <PageAddFoodForm
                        fridge={fridge}
                        updateExistingProperties={updateExistingProperties}
                        updateBatch={updateBatch}
                        metaData={metaData}
                    />
                </RouteProtected>
            )}

            <RouteProtected path="/settings">{tenants && <PageSettings tenants={tenants} />}</RouteProtected>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
