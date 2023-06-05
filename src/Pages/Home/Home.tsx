import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostsAction } from '../../Redux/saga';

import { Container, Spinner } from 'react-bootstrap';

function Home(): JSX.Element {
  const { isFetching, items: posts } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPostsAction({ start: 0, limit: 5 }));
  }, []);

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center flex-grow-1'
    >
      <h1>Home</h1>
      {isFetching && (
        <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
          <Spinner />
        </div>
      )}
      {posts &&
        posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
    </Container>
  );
}

export { Home };
