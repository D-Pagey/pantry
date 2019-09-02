import React, { Fragment } from 'react';
import { arrayOf, func, instanceOf, string, shape } from 'prop-types';
import { format } from 'date-fns';
import deleteIcon from '../../../assets/delete.svg';

const GridRows = ({ data, handleDelete }) =>
    data.map((item, index) => (
        <Fragment key={item.name}>
            <li>{item.name}</li>
            <li>{format(item.expires, 'do MMM')}</li>
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
