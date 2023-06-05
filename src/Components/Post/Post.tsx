import { Card,Image, Button } from 'react-bootstrap';
import { IPost } from '../../Api/api';

interface IProps {
  post: IPost;
}

function Post(props: IProps): JSX.Element {
  const { post } = props;

  return (
    <Card className='mb-3' style={{ width: 'min(100%, 1200px)' }}>
      <Card.Header className='d-flex justify-content-between'>
        <Card.Title>{post.title}:{post.id}</Card.Title>
        <Image
          roundedCircle
          fluid
          style={{ height: '48px' }}
          src={`${process.env.PUBLIC_URL}/cat.jpg`}
        />
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.body}</Card.Text>
        <Button variant='link' className='d-block mx-auto'>
          Show Comments
        </Button>
      </Card.Body>
    </Card>
  );
}
export { Post };
