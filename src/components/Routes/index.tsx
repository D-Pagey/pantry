import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageHome from '../PageHome';
import AddFoodForm from '../AddFoodForm';
import FoodTable from '../FoodTable';
import PageSignIn from '../PageSignIn';
import PageProfile from '../PageProfile';
import RouteProtected from '../RouteProtected';

const Routes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/sign-in" component={PageSignIn} />
        <RouteProtected path="/profile" component={PageProfile} />
        <RouteProtected path="/add" component={AddFoodForm} />
        <RouteProtected path="/:category" component={FoodTable} />
    </Switch>
);

export default Routes;
