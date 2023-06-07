import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../Redux/store';
import { fetchCommentsAction } from '../../Redux/saga';

import { IPost } from '../../Api/types';

import { Card, Image, Button } from 'react-bootstrap';
import { PostComment } from '../Comment/PostComment';

interface IProps {
  post: IPost;
}

function Post(props: IProps): JSX.Element {
  const { post } = props;
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleComments = () => {
    if (!commentsOpen) {
      dispatch(fetchCommentsAction(post.id));
    }
    setCommentsOpen(!commentsOpen);
  };

  return (
    <Card className='mb-3' style={{ width: 'min(100%, 770px)' }}>
      <Card.Header className='d-flex justify-content-between'>
        <Card.Title>{post.title}</Card.Title>
        <Image
          roundedCircle
          fluid
          style={{ height: '48px', minWidth: '48px' }}
          role='button'
          src={`${process.env.PUBLIC_URL}/Avatars/${post.userId}.jpg`}
          onClick={() => navigate(`/user/${post.userId}`)}
        />
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.body}</Card.Text>
        {commentsOpen && <hr />}
        <Button
          variant='link'
          className='d-block ms-auto'
          onClick={toggleComments}
        >
          {commentsOpen ? 'Hide' : 'Show'} Comments
        </Button>
        {post.comments &&
          commentsOpen &&
          post.comments.map((comment) => (
            <PostComment key={comment.id} comment={comment} />
          ))}
      </Card.Body>
    </Card>
  );
}
export { Post };
