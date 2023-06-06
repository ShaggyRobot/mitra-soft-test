import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchUserAction } from '../../Redux/saga';
import { Container, Spinner } from 'react-bootstrap';
import { IPost } from '../../Api/api';
import { Post } from '../../Components/Post/Post';

function User(): JSX.Element {
  const user = useSelector((state: RootState) => state.user?.user);
  const posts = useSelector((state: RootState) => state.items)
  const isFetching = useSelector((state: RootState) => state.isFetching);
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();

  useEffect(() => {
    console.log(userId);
    userId && dispatch(fetchUserAction(parseInt(userId)));
  }, []);

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center flex-grow-1 pt-3'
    >
      <h1>{user?.name}</h1>
      {isFetching && (
        <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
          <Spinner />
        </div>
      )}
      {!isFetching &&
        posts &&
        posts.map((post: IPost) => <Post key={post.id} post={post} />)}
    </Container>
  );
}
export { User };
