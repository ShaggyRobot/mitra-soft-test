import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostsAction } from '../../Redux/saga';

import { Container, Spinner } from 'react-bootstrap';
import { Post } from '../../Components/Post/Post';
import { useParams } from 'react-router-dom';
import { PaginationComponent } from '../../Components/Pagination/Pagination';

const POSTS_PER_PAGE = 5;

function Home(): JSX.Element {
  const {
    isFetching,
    items: posts,
    totalCount,
  } = useSelector((state: RootState) => state);

  const { page } = useParams() as { page: string };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchPostsAction({
        start: (parseInt(page) - 1) * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
      }),
    );
  }, [page]);

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center flex-grow-1 pt-3'
    >
      {isFetching && (
        <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
          <Spinner />
        </div>
      )}
      {!isFetching &&
        posts &&
        posts.map((post) => <Post key={post.id} post={post} />)}
      <PaginationComponent
        current={page || '1'}
        postsPerPage={POSTS_PER_PAGE}
        totalCount={totalCount}
      />
    </Container>
  );
}

export { Home };
