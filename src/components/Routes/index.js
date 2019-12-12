import React, { useEffect, useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { firebase } from '../../services';
import PageHome from '../PageHome';
import AddFoodForm from '../AddFoodForm';
import FoodTable from '../FoodTable';
import PageSignIn from '../PageSignIn';
import PageProfile from '../PageProfile';
import { AuthContext } from '../ProviderAuth';

const db = firebase.firestore();
const HOUSEHOLDS = 'households';

/** checkIndex function
 * @param {array} array an array of objects with category and count keys
 * @param {string} label a string of what to check in the category key
 */
export const checkIndex = (array, category) => {
    return array.reduce((acc, cur, index) => {
        if (cur.category === category) return index;
        return acc;
    }, -1);
};

/** countCategories function
 * @param {array} categories an array of category objects with label and value keys
 */
export const countCategories = (categories) => {
    const reducedCategories = categories.reduce((acc, curr) => {
        const index = checkIndex(acc, curr);

        if (index === -1) {
            acc.push({ category: curr, count: 1 });
        } else {
            const newAcc = [...acc];
            newAcc[index].count += 1;
            return newAcc;
        }

        return acc;
    }, []);

    reducedCategories.push({ category: 'all', count: categories.length });

    return reducedCategories;
};

const Routes = () => {
    const [fridge, setFridge] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user, setIsAuthed, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user.household) {
            const getData = () => {
                db.collection('households')
                    .doc(user.household)
                    .onSnapshot((doc) => {
                        setFridge(
                            doc.data().fridge.map((item) => ({
                                ...item,
                                expires: item.expires.toDate()
                            }))
                        );
                        setCategories(doc.data().categories);
                    });
            };

            getData();
        }
    }, [user.household]);

    const signOut = () => {
        firebase.auth().signOut();
        setIsAuthed(false);
        setUser({});
        setCategories([]);
        setFridge([]);
    };

    const updateHousehold = ({ key, values }) => {
        db.collection(HOUSEHOLDS)
            .doc(user.household)
            .update({ [key]: values })
            .then(() => console.log(`Successfully updated ${key}!`))
            .catch((error) => console.error(`Error adding to ${key}: ${error}`));
    };

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={(props) => (
                    <PageHome
                        {...props}
                        categoryCounts={countCategories(fridge.map((item) => item.category))}
                    />
                )}
            />
            <Route path="/sign-in" component={PageSignIn} />
            <Route
                path="/profile"
                render={(props) => <PageProfile {...props} signOut={signOut} />}
            />
            <Route
                path="/add"
                render={(props) => (
                    <AddFoodForm
                        {...props}
                        categories={categories}
                        fridge={fridge}
                        updateHousehold={updateHousehold}
                    />
                )}
            />
            <Route
                path="/:category"
                render={(props) => (
                    <FoodTable {...props} fridge={fridge} updateHousehold={updateHousehold} />
                )}
            />
        </Switch>
    );
};

export default Routes;
