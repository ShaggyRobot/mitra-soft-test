import { Card, Container, Image } from 'react-bootstrap';

function About(): JSX.Element {
  return (
    <Container className='d-flex align-items-center justify-content-center h-100'>
      <Card className='mb-3' style={{ width: 'min(100%, 520px)' }}>
        <Card.Header className='text-center'>
          <Card.Title>Александр Посошин</Card.Title>
        </Card.Header>
        <Card.Body>
          <Image
            roundedCircle
            fluid
            style={{ height: '256px' }}
            className='d-block mx-auto mb-3'
            src='https://img.hhcdn.ru/photo/720096702.png?t=1686236034&h=PWEDu9bdn8AhOFEfRt_23w'
          />
          <Card.Text>
            40лет, живу в Санкт-Петербурге. Программированием увлёкся в 2021
            году. Сначала изучал Python самостоятельно, написал пару ботов для
            Telegram. Затем обучался в {' '}
            <a href='https://rs.school/'>Rolling Scopes School</a> на курсах JavaScript Frontend и React. В программу обучения входили различные задачи, такие, как pixel-perfect вёрстка с макета, написание SPA-приложений с использованием TypeScript, CSS-препроцессоров, ESLint, webpack и т.д.
            Участвовал командной разработке, в том числе в качестве teamlid.
            <br />
            <br />
            Хочу продолжать развиваться как Web-разработчик на реальных проектах с сильной комадой.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
export { About };
