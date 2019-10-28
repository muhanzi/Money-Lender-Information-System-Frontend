import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavItem } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import project from "./static";

class Navigation extends Component {
  state = {};
  handleSelection = key => {
    // switch (key) {
    //   case "key1":
    //     break;
    //   case "key2":
    //     break;
    //   case "key3":
    //     break;
    //   default:
    // }
  };
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: project().projectColor }}
      >
        <Navbar.Brand href="#home">Dimes </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          {/* //or just put this empty nav and give it a margin right "push the next element (Nav) up to the end" <Nav className="mr-auto"></Nav> */}
          <Nav
            onSelect={this.handleSelection}
            activeKey={this.props.activatedKey}
          >
            <Nav.Link
              href="/borrowers"
              eventKey="key1"
              hidden={this.props.hideNavLinks}
            >
              Borrowers
            </Nav.Link>
            <Nav.Link
              href="/lenderInfo"
              eventKey="key2"
              hidden={this.props.hideNavLinks}
            >
              Lender's Info
            </Nav.Link>
            <Nav.Link href="/" eventKey="key3" hidden={this.props.hideNavLinks}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
