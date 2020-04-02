import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import * as S from './styles';

type propTypes = {
    label: string;
    margin: string;
    options: {
        label: string;
        value: number;
    }[];
    selected: number;
    setSelected: Function;
    testId: string;
};

export const SingleSelect = ({ label, margin, options, selected, setSelected, testId }: propTypes): JSX.Element => {
    const handleClick = (option: { label: string; value: number }) => (): Function => setSelected(option);

    return (
        <S.Wrapper margin={margin} data-testid={testId}>
            {label && <FormLabel>{label}</FormLabel>}

            <S.ButtonWrapper>
                {options.map(
                    (option, index: number): JSX.Element => (
                        <Button
                            key={option.value}
                            onClick={handleClick(option)}
                            testId={`singleSelectButton${index}`}
                            variant={option.value === selected ? 'selected' : 'unselected'}
                        >
                            {option.label}
                        </Button>
                    )
                )}
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
            value: number.isRequired
        }).isRequired
    ).isRequired,
    selected: number,
    setSelected: func.isRequired,
    testId: string
};

SingleSelect.defaultProps = {
    label: '',
    margin: '',
    selected: null,
    testId: ''
};
