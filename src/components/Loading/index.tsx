import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { colours } from '../../tokens';
import * as S from './styles';

type LoadingTypes = {
    isLoading: boolean;
};

export const Loading = ({ isLoading }: LoadingTypes): JSX.Element => (
    <S.Wrapper data-testid="loading">
        <ScaleLoader color={colours.darkGreen100} loading={isLoading} />
    </S.Wrapper>
);
