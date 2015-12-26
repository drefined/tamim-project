import React from 'react';
import {
          Navbar,
          Nav,
          NavItem,
          MenuItem,
          NavDropdown
       }            from 'react-bootstrap';
import {Link} from 'react-router';
import './sass/app-root.scss';



export default React.createClass({
  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Music Therapy</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#/">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#/admin">
              Admin
            </NavItem>
          </Nav>
        </Navbar>
        <section className="child-route">
          {this.props.children}
        </section>
      </div>
    )
  }
})
