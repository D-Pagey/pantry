import React, { FC } from 'react';
import * as S from './styles';

type OptionType = {
    label: string;
    value: number;
};

type SingleSelectTypes = {
    options: OptionType[];
    selected?: number | string;
    setSelected: (option: OptionType) => void;
    testId?: string;
};

export const SingleSelect: FC<SingleSelectTypes> = ({ options, selected, setSelected, testId }) => {
    const handleClick = (option: OptionType) => (): void => setSelected(option);

    return (
        <S.Wrapper data-testid={testId}>
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
        </S.Wrapper>
    );
};
