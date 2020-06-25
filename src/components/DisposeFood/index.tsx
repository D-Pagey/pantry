import React, { FC } from 'react';
import { Button } from '../Button';
import * as S from './styles';

type DisposeFoodProps = {
    handleDelete: () => void;
    handleEdit: () => void;
    name: string;
};

export const DisposeFood: FC<DisposeFoodProps> = ({ handleDelete, handleEdit, name }) => (
    <S.Wrapper data-testid="disposeFood">
        <Button secondary onClick={handleEdit}>
            Edit servings
        </Button>
        <Button onClick={handleDelete}>Eat all {name}&apos;s</Button>
    </S.Wrapper>
);
