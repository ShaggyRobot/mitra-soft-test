import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IProps {
  postsPerPage: number;
  totalCount: number;
  current: string;
}

function PaginationMobile({
  current,
  totalCount,
  postsPerPage,
}: IProps): JSX.Element {
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCount / postsPerPage);

  return (
    <Pagination className='ms-auto'>
      <Pagination.First
        onClick={() => navigate(`/page/1`)}
        disabled={current === '1'}
      />
      <Pagination.Prev
        onClick={() => navigate(`/page/${+current - 1}`)}
        disabled={current === '1'}
      />
      <Pagination.Item className='pe-none'>{current}</Pagination.Item>
      <Pagination.Next
        onClick={() => navigate(`/page/${+current + 1}`)}
        disabled={+current >= totalPages}
      />
      <Pagination.Last
        onClick={() => navigate(`/page/${totalPages}`)}
        disabled={+current >= totalPages}
      />
    </Pagination>
  );
}
export { PaginationMobile };
