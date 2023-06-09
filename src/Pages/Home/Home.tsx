import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostsAction } from '../../Redux/saga';

import {
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Spinner,
} from 'react-bootstrap';

import { IPost } from '../../Api/types';

import { Post, PaginationComponent, PaginationMobile } from '../../Components';
import { POSTS_PER_PAGE, SORT_KEYS } from '../../Constants/constants';

function Home(): JSX.Element {
  const { isFetching, items: posts } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const { page } = useParams() as { page: string };
  const pageNum = parseInt(page) || 1;

  const [innerWidth, setInnerWidth] = useState<number>();
  const [paginatedPosts, setPaginatedPosts] = useState<IPost[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SORT_KEYS>(SORT_KEYS.DEFAULT);

  useEffect(() => {
    !posts.length && dispatch(fetchPostsAction());

    window.addEventListener('resize', getSize);
    getSize();

    const paginationSlice = sortPosts(
      filterPosts(searchString),
      sortOrder,
    ).slice((pageNum - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * pageNum);

    setPaginatedPosts(paginationSlice);

    return () => {
      window.removeEventListener('resize', getSize);
    };
  }, [page, posts, searchString, sortOrder]);

  const getSize = () => {
    setInnerWidth(window.innerWidth);
  };

  const filterPosts = (filterString: string) => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(filterString.toLowerCase()),
    );
  };

  const sortPosts = (posts: IPost[], sort: SORT_KEYS) => {
    if (sort === SORT_KEYS.DEFAULT) return posts;

    const sorted = posts.sort((a, b) => a.title.localeCompare(b.title));
    sort === SORT_KEYS.DESC && sorted.reverse();

    return sorted;
  };

  const sortHandler = (eventKey: SORT_KEYS | null) => {
    if (eventKey) {
      setSortOrder(eventKey);
    }
  };

  return (
    <Container
      fluid
      className='d-flex flex-column align-items-center flex-grow-1 pt-3'
    >
      <Form
        className='mb-3 d-flex flex-row gap-3'
        style={{ width: 'min(770px, 100%)' }}
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => {
          const elem = e.target as HTMLInputElement;
          setSearchString(elem.value);
        }}
      >
        <InputGroup>
          <Form.Control
            type='search'
            id='search'
            aria-describedby='search'
            placeholder='Search by title'
            style={{ borderColor: 'var(--bs-gray-600)' }}
            autoComplete='off'
          />
          <DropdownButton
            as={ButtonGroup}
            variant='outline-secondary'
            title='Sort By Title'
            onSelect={(eventKey) => sortHandler(eventKey as SORT_KEYS)}
          >
            <Dropdown.Item eventKey={SORT_KEYS.DEFAULT}>Default</Dropdown.Item>
            <Dropdown.Item eventKey={SORT_KEYS.ASC}>A-Z</Dropdown.Item>
            <Dropdown.Item eventKey={SORT_KEYS.DESC}>Z-A</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Form>
      {isFetching && (
        <div className='d-flex flex-grow-1 align-items-center justify-content-center'>
          <Spinner />
        </div>
      )}
      {!isFetching &&
        posts &&
        paginatedPosts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      {innerWidth && posts && innerWidth >= 820 ? (
        <PaginationComponent
          current={page || '1'}
          postsPerPage={POSTS_PER_PAGE}
          totalCount={filterPosts(searchString).length}
        />
      ) : (
        <PaginationMobile
          current={page || '1'}
          postsPerPage={POSTS_PER_PAGE}
          totalCount={filterPosts(searchString).length}
        />
      )}
    </Container>
  );
}

export { Home };
