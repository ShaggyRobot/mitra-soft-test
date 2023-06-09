import { Container, Nav, Navbar, Offcanvas, Image } from 'react-bootstrap';

function Header(): JSX.Element {
  return (
    <header>
      <Navbar bg='light' expand={false} className='shadow-sm mx-1'>
        <Container fluid>
          <Navbar.Brand>MitraSoftTest</Navbar.Brand>
          <Navbar.Toggle aria-controls='burger-menu-left' />
          <Navbar.Offcanvas id='burger-menu-left'>
            <Offcanvas.Header closeButton className='ms-auto'>
            </Offcanvas.Header>
            <Offcanvas.Body className='mt-0 pt-0'>
              <hr className='mt-0' />
              <div className='d-flex flex-column align-items-center'>
                <Image
                  roundedCircle
                  fluid
                  style={{ height: '128px', width: '128px' }}
                  src='https://img.hhcdn.ru/photo/720096702.png?t=1686236034&h=PWEDu9bdn8AhOFEfRt_23w'
                />
                <a
                  href='mailto:shaggyrobot@gmail.com'
                  className='fw-bold'
                  style={{ fontSize: '.95rem' }}
                >
                  ShaggyRobot@gmail.com
                </a>
              </div>
              <hr />
              <Nav className='mx-auto'>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/about'>About</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}
export { Header };
