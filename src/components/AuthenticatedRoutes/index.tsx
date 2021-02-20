import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { FoodType, TenantType, DatabaseFoodType, MetaDataType } from '../../types';
import { checkAndFormatFridge } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFood } from '../PageAddFood';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageNotFound } from '../PageNotFound';
import { PageSettings } from '../PageSettings';

export const AuthenticatedRoutes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>([]);
    const [tenants, setTenants] = useState<TenantType[]>([]);
    const [metaData, setMetaData] = useState<MetaDataType>();
    const { user } = useContext(AuthContext);

    const getFridgeData = useCallback(() => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                // eslint-disable-next-line
                .onSnapshot((doc: any) => {
                    const data = doc.data();

                    if (data) {
                        const fridgeItems: DatabaseFoodType[] = Object.values(data.fridge);
                        const cleanData = checkAndFormatFridge(fridgeItems);
                        const firebaseTenants = Object.values(data.tenants) as TenantType[];

                        setMetaData(data.meta);
                        setFridge(cleanData);
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
            <Route exact path={['/', '/sign-in', '/magic']}>
                <Redirect to="/food" />
            </Route>

            <Route path="/food">
                <PageFood fridge={fridge} tenants={tenants} categories={metaData?.categories} />
            </Route>

            <Route path="/:name/edit">
                <PageEditFood fridge={fridge} tenants={tenants} metadata={metaData} />
            </Route>

            <Route path="/add">
                <PageAddFood fridge={fridge} metaData={metaData} />
            </Route>

            <Route path="/settings">
                <PageSettings tenants={tenants} />
            </Route>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
