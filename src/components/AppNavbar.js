import { Container, Navbar, Nav } from "react-bootstrap";


export default function AppNavbar() {
	return (
		<>

			
			<Navbar bg='primary' variant='dark'>
				<Container>
					<Navbar.Brand href='/home'>Store</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link href='/home'>Home</Nav.Link>
						<Nav.Link href='/admin'>Admin</Nav.Link>
						<Nav.Link href='/stats'>Stats</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}
