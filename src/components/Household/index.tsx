import React, { FC } from 'react';

import { UserType } from '../../types';
import * as S from './styles';

// TODO: change how these props work
type HouseholdProps = {
    people: Partial<UserType & { houseRole?: string }>[];
};

export const Household: FC<HouseholdProps> = ({ people }) => (
    <S.List>
        {people.map((person) => (
            <S.Item key={person.uid}>
                <S.Image src={person.photo} alt="user" onError={(e: any) => console.log('shit balls', e)} />
                <S.Name>{person.name}</S.Name>
                <S.Email>{person.email}</S.Email>
                {person.houseRole === 'owner' ? (
                    // eslint-disable-next-line jsx-a11y/accessible-emoji
                    <S.Span role="img" aria-label="cool">
                        😎
                    </S.Span>
                ) : (
                    // eslint-disable-next-line jsx-a11y/accessible-emoji
                    <S.Span role="img" aria-label="smile">
                        😀
                    </S.Span>
                )}
                <S.HouseRole>{person.houseRole}</S.HouseRole>
            </S.Item>
        ))}
    </S.List>
);
