import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { colours } from '../../tokens';
import * as S from './styles';

type LoadingTypes = {
    isLoading: boolean;
};

export const Loading = ({ isLoading }: LoadingTypes): JSX.Element => (
    <S.Wrapper data-testid="loading">
        <PropagateLoader color={colours.darkGreen100} loading={isLoading} />
    </S.Wrapper>
);
