import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostsAction, fetchUserAction } from '../../Redux/saga';

import { Button, Container, Spinner } from 'react-bootstrap';

import { IPost } from '../../Api/types';
import { Post, UserCard } from '../../Components';

function User(): JSX.Element {
  const { userId } = useParams();

  const user = useSelector((state: RootState) => state.user?.user);
  const posts = useSelector((state: RootState) => state.items);
  const isFetching = useSelector((state: RootState) => state.isFetching);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    userId && dispatch(fetchUserAction(parseInt(userId)));
  }, []);

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center flex-grow-1 pt-3'
    >
      <Button
        variant='link'
        className='d-block me-auto'
        onClick={() => {
          navigate('/');
        }}
      >
        {'<<Go Back'}
      </Button>
      {!isFetching && user && <UserCard user={user} />}

      {isFetching && (
        <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
          <Spinner />
        </div>
      )}

      {!isFetching &&
        posts &&
        user &&
        posts
          .filter((post) => post.userId === user?.id)
          .map((post: IPost) => <Post key={post.id} post={post} />)}
    </Container>
  );
}
export { User };
