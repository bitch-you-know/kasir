import React from "react";
import {Nav,Navbar,Container,NavDropdown,Form,Button} from 'react-bootstrap'
import "../index.css"
import { Link } from "react-router-dom";

const NavbarComponent=()=>{
  return(
    <Navbar expand="lg" variant="dark" className="navbarStyle   bg-primary text-white ">
    <Container>
      <Navbar.Brand href="#" className="text-light fs-1"><strong>kasir</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link className="text-light px-3" to={"/"}> DashBoard</Link> 
          <Link  className="text-light " to={"/riwayat"}>Riwayat Transaksi</Link>
          
        </Nav>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
export default NavbarComponent