import { Card, Image, Table } from 'react-bootstrap';
import { IUser } from '../../Api/api';

interface IProps {
  user: IUser;
}

function UserCard({ user }: IProps): JSX.Element {
  return (
    <Card className='mb-3' style={{ width: 'min(100%, 520px)' }}>
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
      </Card.Header>
      <Card.Body>
      <Image
        fluid
        roundedCircle
        thumbnail
        className='d-block mx-auto mb-3'
        src={`${process.env.PUBLIC_URL}/Avatars/${user.id}.jpg`}
      />
        <Table striped bordered responsive>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Website:</td>
              <td>{user.website}</td>
            </tr>
            <tr>
              <td>Company:</td>
              <td>{user.company.name}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
export { UserCard };
