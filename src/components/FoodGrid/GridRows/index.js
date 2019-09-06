import React, { Fragment } from 'react';
import { arrayOf, func, instanceOf, string, shape } from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import deleteIcon from '../../../assets/delete.svg';
import * as S from './styles';

const GridRows = ({ data, handleDelete }) => {
    const chooseColour = (date) => {
        const difference = differenceInDays(date, new Date());

        if (difference < 1) return 'red';
        if (difference <= 2) return 'blue';

        return 'black';
    };

    return data.map((item, index) => (
        <Fragment key={item.name}>
            <li>{item.name}</li>
            <S.Item colour={chooseColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
            <li>{item.servings.label}</li>
            <li>
                <button
                    type="button"
                    onClick={handleDelete(item.name)}
                    style={{ cursor: 'pointer' }}
                    data-testid={`deleteButton${index}${item.category.label}`}
                >
                    <img src={deleteIcon} alt="delete" />
                </button>
            </li>
        </Fragment>
    ));
};

GridRows.propTypes = {
    data: arrayOf(
        shape({
            expires: instanceOf(Date).isRequired,
            name: string.isRequired,
            servings: shape({
                label: string.isRequired,
                value: string.isRequired
            }).isRequired
        })
    ),
    handleDelete: func.isRequired
};

export default GridRows;
