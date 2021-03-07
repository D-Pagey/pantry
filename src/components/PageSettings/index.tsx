import { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TenantType } from '../../types';
import { firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { Layout } from '../Layout';
import { Household } from '../Household';
import { Button } from '../Button';
import * as S from './styles';

const inviteToHousehold = firebase.functions().httpsCallable('inviteToHousehold');

type PageSettingsProps = {
    tenants: TenantType[];
};

export const PageSettings: FC<PageSettingsProps> = ({ tenants }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [emailInvite, setEmailInvite] = useState('');
    const { signOut, user } = useContext(AuthContext);
    const history = useHistory();

    const handleInviteClick = async () => {
        const trimmedEmail = emailInvite.trim();

        if (tenants.map((tenant) => tenant.email).includes(trimmedEmail)) {
            toast.error('That user is already in your household');
        } else {
            setIsLoading(true);

            try {
                const { data } = await inviteToHousehold({ email: trimmedEmail, householdId: user?.household });

                if (data.userExists && data.hasNotified) {
                    toast.success(`An invite was sent to ${trimmedEmail}`);
                } else {
                    toast.error(data.result);
                }

                setEmailInvite('');
            } catch (error) {
                toast.error('Error with notifying the user');
            }

            setIsLoading(false);
        }
    };

    return (
        <Layout title="Settings">
            <S.Wrapper data-testid="PageSettings">
                <S.PersonalWrapper>
                    <S.PersonalSubtitle>Personal:</S.PersonalSubtitle>
                    <S.Name>{user!.name}</S.Name>
                    <S.Email>
                        <S.Bold>Email:</S.Bold>
                        {user!.email}
                    </S.Email>
                    <S.Photo email={user!.email!} name={user!.name} photo={user!.photo!} />
                </S.PersonalWrapper>

                <S.HouseholdWrapper>
                    <S.Subtitle>Household:</S.Subtitle>
                    <Household tenants={tenants} user={user!} />

                    <S.Text>Invite someone to join your household:</S.Text>
                    <S.Input
                        disabled={isLoading}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setEmailInvite(e.target.value)}
                        placeholder="Your friends' email"
                        value={emailInvite}
                    />
                    <S.InviteButton isLoading={isLoading} onClick={handleInviteClick} loadingContent="Inviting">
                        Invite
                    </S.InviteButton>
                </S.HouseholdWrapper>

                <S.ButtonWrapper>
                    <Button secondary onClick={() => history.push('/food')}>
                        Back
                    </Button>

                    <S.SignOutButton destructive onClick={(): void => signOut()} data-testid="PageSettingsButton">
                        Sign Out
                    </S.SignOutButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </Layout>
    );
};
