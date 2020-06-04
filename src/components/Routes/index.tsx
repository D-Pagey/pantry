import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageAddFoodForm2 } from '../PageAddFoodForm2';
import { PageFood } from '../PageFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageProfile } from '../PageProfile';
import { PageSignIn } from '../PageSignIn';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/sign-in" component={PageSignIn} />
        <RouteProtected path="/profile" component={PageProfile} />
        <RouteProtected path="/add" component={PageAddFoodForm} />
        <RouteProtected path="/test" component={PageAddFoodForm2} />
        <RouteProtected path="/food/:category" component={PageFood} />
        <Route component={PageNotFound} />
    </Switch>
);
