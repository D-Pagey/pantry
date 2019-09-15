import React, { Fragment, useContext } from 'react';
import { shape, string } from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import deleteIcon from '../../assets/delete.svg';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const chooseColour = (date) => {
    const difference = differenceInDays(date, new Date());

    if (difference < 1) return 'red';
    if (difference <= 2) return 'blue';

    return 'black';
};

const FoodGrid = ({ match }) => {
    const { fridge, updateFridge } = useContext(FirebaseContext);

    const filteredData = fridge
        ? fridge.filter((item) => {
              const { category } = match.params;

              if (category === 'all') return true;

              return item.category.value === category;
          })
        : [];

    const handleDelete = (name) => () => {
        const filteredItems = fridge.filter((item) => item.name !== name);
        updateFridge(filteredItems);
    };

    return (
        <S.Wrapper>
            <S.Title>{match.params.category}</S.Title>
            <S.List>
                <S.Heading>Name</S.Heading>
                <S.Heading>Expires</S.Heading>
                <S.Heading>Servings</S.Heading>
                <S.Heading>Amend</S.Heading>

                {filteredData.map((item, index) => (
                    <Fragment key={item.name}>
                        <li>{item.name}</li>
                        <S.Item colour={chooseColour(item.expires)}>
                            {format(item.expires, 'do MMM')}
                        </S.Item>
                        <li>{item.servings.label}</li>
                        <li>
                            <button
                                type="button"
                                onClick={handleDelete(item.name)}
                                style={{ cursor: 'pointer' }}
                                data-testid={`deleteButton${index}`}
                            >
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </li>
                    </Fragment>
                ))}
            </S.List>
        </S.Wrapper>
    );
};

FoodGrid.propTypes = {
    match: shape({
        params: shape({
            category: string.isRequired
        }).isRequired
    }).isRequired
};

export default FoodGrid;
