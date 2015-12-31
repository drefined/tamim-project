import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './sass/app-root.scss';

class App extends React.Component {
  render() {
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
    );
  }
}

export default App;
