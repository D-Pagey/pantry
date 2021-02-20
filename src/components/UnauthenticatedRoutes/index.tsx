import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PageHome } from '../PageHome';
import { PageSignIn } from '../PageSignIn';
import { PageMagicLanding } from '../PageMagicLanding';

export const UnauthenticatedRoutes: FC = () => {
    return (
        <Switch>
            <Route exact path="/">
                <PageHome />
            </Route>

            <Route path="/sign-in">
                <PageSignIn />
            </Route>

            {/* used for magic sign in email link */}
            <Route path="/magic">
                <PageMagicLanding />
            </Route>

            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};
