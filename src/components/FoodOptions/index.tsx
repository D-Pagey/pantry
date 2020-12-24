import React, { FC } from 'react';
import { titleCase } from 'title-case';
import { Button } from '../Button';
import * as S from './styles';

export type FoodOptionsProps = {
    handleDelete: () => void;
    handleEdit: () => void;
    name: string;
};

export const FoodOptions: FC<FoodOptionsProps> = ({ handleDelete, handleEdit, name }) => (
    <S.Wrapper data-testid="foodOptions">
        <S.InnerWrapper>
            <S.Text>{titleCase(name)}:</S.Text>
            <Button secondary onClick={handleEdit}>
                Amend
            </Button>
            <Button destructive onClick={handleDelete}>
                Delete
            </Button>
        </S.InnerWrapper>
    </S.Wrapper>
);
