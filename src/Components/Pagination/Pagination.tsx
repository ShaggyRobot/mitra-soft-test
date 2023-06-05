import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IProps {
  postsPerPage: number;
  totalCount: number;
  current: string;
}

function PaginationComponent({
  current,
  totalCount,
  postsPerPage,
}: IProps): JSX.Element {
  let items = [];
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCount / postsPerPage);

  for (let i = 1; i <= totalPages; i += 1) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === parseInt(current)}
        onClick={() => navigate(`/page/${i}`)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  return <Pagination>{items}</Pagination>;
}
export { PaginationComponent };
