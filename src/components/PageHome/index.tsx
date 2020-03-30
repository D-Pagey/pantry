import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FirebaseContext } from '../ProviderFirebase';
import CategoryList from '../CategoryList';
import Loading from '../Loading';
import Button from '../Button';
import * as S from './styles';

const PageHome = (): JSX.Element => {
  const { expiringFood, isAuthed, isCheckingAuth } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (expiringFood.length > 0) {
      toast.warn(
        `You have ${expiringFood.length} item${expiringFood.length > 1 && 's'} expiring in the next 2 days!`,
        { onClick: () => history.push('/food/expiring') },
      );
    }
  }, [expiringFood, history]);

  if (isCheckingAuth) return <Loading isLoading />;

  return (
    <S.Wrapper data-testid="pageHome">
      {isAuthed && <CategoryList />}

      <Link to="/add">
        <Button>Add Item</Button>
      </Link>
    </S.Wrapper>
  );
};

export default PageHome;
