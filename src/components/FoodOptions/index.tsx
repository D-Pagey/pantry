import React, { FC } from 'react';
import { Button } from '../Button';
import * as S from './styles';

export type FoodOptionsProps = {
    handleDelete: () => void;
    handleEdit: () => void;
    name: string;
};

export const FoodOptions: FC<FoodOptionsProps> = ({ handleDelete, handleEdit, name }) => (
    <S.Wrapper data-testid="foodOptions">
        <Button secondary onClick={handleEdit}>
            Amend {name}
        </Button>
        <Button destructive onClick={handleDelete}>
            Remove {name}
        </Button>
    </S.Wrapper>
);
