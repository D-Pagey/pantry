import { FC } from 'react';
import { Layout } from '../Layout';
import * as S from './styles';

export const PageNotFound: FC = () => (
    <Layout title="Not found">
        <S.Title>404 - This page does not exist</S.Title>
        <S.RouterLink to="/">Return Home</S.RouterLink>
    </Layout>
);
