import React, { FC } from 'react';
import { FormLabel } from '../FormLabel';
import * as S from './styles';

type OptionType = {
    label: string;
    value: number;
};

type SingleSelectTypes = {
    label?: string;
    margin?: string;
    options: OptionType[];
    selected?: number;
    setSelected: Function;
    testId?: string;
};

export const SingleSelect: FC<SingleSelectTypes> = ({ label, margin, options, selected, setSelected, testId }) => {
    const handleClick = (option: OptionType) => (): void => setSelected(option);

    return (
        <S.Wrapper margin={margin} data-testid={testId}>
            {label && <FormLabel>{label}</FormLabel>}

            <S.ButtonWrapper>
                {options.map(
                    (option, index: number): JSX.Element => (
                        <S.Button
                            key={option.value}
                            onClick={handleClick(option)}
                            selected={selected === option.value}
                            data-testid={`singleSelectButton${index}`}
                        >
                            {option.label}
                        </S.Button>
                    )
                )}
            </S.ButtonWrapper>
        </S.Wrapper>
    );
};
