import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'

const Header = ({title}) => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
        </Container>
      </Navbar>
    )
}

export default Header;