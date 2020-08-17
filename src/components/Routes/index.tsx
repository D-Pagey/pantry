import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FoodType, DatabaseUserType, UserType } from '../../types';
import { formatExpiryDates, countExpiringFoodItems } from '../../utils';
import { formatUser } from '../ProviderAuth/utils';
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
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>();
    const [fridgeUsersInfo, setFridgeUsersInfo] = useState<UserType[]>();
    const [expiringCount, setExpiringCount] = useState<number>(0);
    const { user } = useContext(AuthContext);

    const fetchFridgeUsersInfo = useCallback(
        (users: string[]): void => {
            if (fridgeUsersInfo) console.log('unneccessary fired');
            if (!fridgeUsersInfo) console.log('neccessary fired');

            db.collection('users')
                .where('uid', 'in', users)
                .get()
                .then((querySnapshot) => {
                    const data: UserType[] = [];

                    querySnapshot.forEach((doc) => {
                        const formatted = formatUser(doc.data() as DatabaseUserType);
                        data.push(formatted);
                    });

                    setFridgeUsersInfo(data);
                });
        },
        [fridgeUsersInfo]
    );

    const updateFridge = (values: FoodType): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({ [`fridge.${values.name}`]: values })
                .then(() => toast.success('Food item added'))
                .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const getFridgeData = useCallback(() => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .onSnapshot((doc: any) => {
                    const data = doc.data();

                    const fridgeItems: FoodType[] = Object.values(data.fridge);
                    const formattedDates = formatExpiryDates(fridgeItems);

                    if (data.users.length > 0 && !fridgeUsersInfo) fetchFridgeUsersInfo(data.users);

                    setFridge(formattedDates);
                    setExpiringCount(countExpiringFoodItems(formattedDates));
                });
        }
    }, [user, fetchFridgeUsersInfo, fridgeUsersInfo]);

    useEffect(() => {
        if (user?.household) {
            getFridgeData();
        }
    }, [getFridgeData, user]);

    return (
        <Switch>
            <Route exact path="/">
                <PageHome expiringCount={expiringCount} />
            </Route>

            <Route path="/sign-in">
                <PageSignIn />
            </Route>

            <Route path="/magic">
                <PageMagicLanding />
            </Route>

            <RouteProtected path="/food">
                <PageFood fridge={fridge} />
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                <PageEditFood updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/add">
                <PageAddFoodForm fridge={fridge} updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/settings">
                {fridgeUsersInfo && <PageSettings fridgeUsers={fridgeUsersInfo} />}
            </RouteProtected>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
