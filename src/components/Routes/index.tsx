import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FoodType, FoodCardType, UserType } from '../../types';
import { formatExpiryDates, countExpiringFoodItems } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageProfile } from '../PageProfile';
import { PageSignIn } from '../PageSignIn';
import { PageMagicLanding } from '../PageMagicLanding';
import { RouteProtected } from '../RouteProtected';
import { swapUserIdsForPhotos } from './utils';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[] | FoodCardType[]>();
    const [fridgeUsers, setFridgeUsers] = useState<UserType[]>();
    const [expiringCount, setExpiringCount] = useState<number>(0);
    const { user } = useContext(AuthContext);

    const getFridgeUsers = useCallback(
        (userIds: string[]) => {
            db.collection('users')
                .where('uid', 'in', userIds)
                .get()
                .then((querySnapshot) => {
                    const users: UserType[] = [];

                    querySnapshot.forEach((doc) => {
                        users.push(doc.data() as UserType);
                    });

                    setFridgeUsers(users);
                    console.log({ updated: fridge && swapUserIdsForPhotos(fridge, users) });
                });
        },
        [fridge]
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

                    setFridge(formattedDates);
                    setExpiringCount(countExpiringFoodItems(formattedDates));
                    getFridgeUsers(data.users);
                });
        }
    }, [user, getFridgeUsers]);

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
                {/* @ts-ignore */}
                <PageFood fridge={fridge} />
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                <PageEditFood updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/add">
                {/* @ts-ignore */}
                <PageAddFoodForm fridge={fridge} updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/profile">{fridgeUsers && <PageProfile fridgeUsers={fridgeUsers} />}</RouteProtected>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
