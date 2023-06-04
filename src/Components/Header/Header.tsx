import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

function Header(): JSX.Element {
  return (
    <header>
      <Navbar bg='light' expand='lg' className='shadow-sm mx-1'>
        <Container fluid>
          <Navbar.Brand>MitraSoftTest</Navbar.Brand>
          <Navbar.Toggle aria-controls='burger-menu-left' />
          <Navbar.Offcanvas id='burger-menu-left'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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
