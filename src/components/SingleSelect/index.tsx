import React, { FC } from 'react';
import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import * as S from './styles';

type SingleSelectTypes = {
    label: string;
    margin?: string;
    options: {
        label: string;
        value: number;
    }[];
    selected?: number;
    setSelected: Function;
    testId?: string;
};

export const SingleSelect: FC<SingleSelectTypes> = ({ label, margin, options, selected, setSelected, testId }) => {
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
