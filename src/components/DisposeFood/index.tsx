import React, { FC } from 'react';
import { Button } from '../Button';
import * as S from './styles';

export type DisposeFoodProps = {
    handleClick: (option: string) => void;
};

export const DisposeFood: FC<DisposeFoodProps> = ({ handleClick }) => {
    const handleOptionClick = (option: string) => (): void => handleClick(option);

    return (
        <S.Wrapper data-testid="disposeFood">
            <Button secondary onClick={handleOptionClick('eat')}>
                Eat
            </Button>
            <Button secondary onClick={handleOptionClick('chuck')}>
                Chuck
            </Button>
        </S.Wrapper>
    );
};
