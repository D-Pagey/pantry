import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const PageHome = () => {
    const { value } = useContext(FirebaseContext);

    return (
        <S.Wrapper>
            {value &&
                value.docs.map((doc) => (
                    <React.Fragment key={doc.id}>{JSON.stringify(doc.data())}</React.Fragment>
                ))}
        </S.Wrapper>
    );
};

export default PageHome;
