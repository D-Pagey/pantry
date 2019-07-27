import React from 'react';
import { arrayOf, bool, func, oneOfType, shape, string } from 'prop-types';
import Button from '../Button';
import * as S from './styles';

const SingleSelect = ({ label, margin, options, selected, setSelected, testId }) => {
    const handleClick = (option) => () => setSelected(option);

    return (
        <S.Wrapper margin={margin} data-testid={testId}>
            {label && <S.Label>{label}</S.Label>}

            <S.ButtonWrapper>
                {options.map((option, index) => (
                    <Button
                        key={option.value}
                        onClick={handleClick(option)}
                        testId={`singleSelectButton${index}`}
                        variant={option.value === selected.value ? 'selected' : 'unselected'}
                    >
                        {option.label}
                    </Button>
                ))}
            </S.ButtonWrapper>
        </S.Wrapper>
    );
};

SingleSelect.propTypes = {
    label: string,
    margin: string,
    options: arrayOf(
        shape({
            label: string.isRequired,
            value: oneOfType([string, bool]).isRequired
        }).isRequired
    ).isRequired,
    selected: shape({
        label: string.isRequired,
        value: oneOfType([string, bool]).isRequired
    }).isRequired,
    setSelected: func.isRequired,
    testId: string.isRequired
};

SingleSelect.defaultProps = {
    label: '',
    margin: ''
};

export default SingleSelect;
