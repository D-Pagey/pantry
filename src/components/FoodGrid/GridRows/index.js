import React, { Fragment } from 'react';
import { arrayOf, func, string, shape } from 'prop-types';
import deleteIcon from '../../../assets/delete.svg';

const GridRows = ({ data, handleDelete }) =>
    data.map((item, index) => (
        <Fragment key={item.name}>
            <li>{item.name}</li>
            <li>{item.expires}</li>
            <li>{item.servings} Servings</li>
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
            name: string.isRequired,
            expires: string.isRequired,
            servings: string.isRequired
        })
    ),
    handleDelete: func.isRequired
};

export default GridRows;
