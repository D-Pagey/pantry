import React, { FC, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arraySort from 'array-sort';

import { FoodType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { ExpiringPill } from '../ExpiringPill';
// import { CategoryFilter } from '../CategoryFilter';
import { FoodCard } from '../FoodCard';
import { Layout } from '../Layout';
// import { Button } from '../Button';
import * as S from './styles';

export const PageFood: FC = () => {
    const [isExpiring, setIsExpiring] = useState(false);
    const { category } = useParams();
    const { fridge } = useContext(FirebaseContext);

    const handleExpiringClick = () => setIsExpiring(!isExpiring);

    // if (isValidCategory === undefined || isCheckingAuth) return <Loading isLoading />;
    // if (isValidCategory === false) return <Redirect to="/not-found" />;

    return (
        <Layout>
            {/* <CategoryFilter selected={category} setSelected={(select) => console.log(select)} /> */}

            <S.Wrapper>
                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem 0" />

                {fridge.length === 0 ? (
                    <p data-testid="pageFoodNoData">There is no food that falls under the category of {category}</p>
                ) : (
                    <>
                        {arraySort(fridge, 'name').map((item: FoodType) => (
                            <FoodCard key={item.name} batches={item.batches} name={item.name} margin="0 0 1rem" />
                        ))}
                    </>
                )}

                {/* <Link to="/add">
                    <Button>Add Item</Button>
                </Link> */}
            </S.Wrapper>
        </Layout>
    );
};
