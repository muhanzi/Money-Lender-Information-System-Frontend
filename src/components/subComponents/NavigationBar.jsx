import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import project from "./static";
import ApiUtils from "../../API/APIUtils";

class Navigation extends Component {
  state = { hideNavLinks: false, activeNavLink: "" };
  apiUtils = new ApiUtils();
  componentWillMount() {
    //window.location.href  // gives the current URL (whole of it) in the browser's url field // it a javaScript thing
    //window.location.pathname  // provide by react // when you route to a component react-router will pass it automatically to the props of the component
    //window.location.pathname  // will give just the current pathname eg. '/login'
    // when this component is displayed what is the pathname in the url
    //
    let URLpath = window.location.href; // String
    // switch (URLpath.replace(project().projectUrl, "")) {
    //   case "borrowers":
    //     this.setState({ activeNavLink: "key1" });
    //     break;
    //   case "lenderInfo":
    //     this.setState({ activeNavLink: "key2" });
    //     break;
    //   default:
    // }
    // http://localhost:3000/   has 22 characters // so starting from 0 to 21st character  // we only need from 22nd charcter up to the length of the String
    switch (URLpath.substr(22)) {
      case "borrowers":
        this.setState({ activeNavLink: "key1" });
        break;
      case "lenderInfo":
        this.setState({ activeNavLink: "key2" });
        break;
      default:
    }
    //
    this.checkCurrentUser();
  }
  checkCurrentUser() {
    this.apiUtils
      .getCurrentUser()
      .then((response) => {
        this.setState({ hideNavLinks: false });
      })
      .catch((error) => {
        this.setState({ hideNavLinks: true });
      });
  }
  handleSelection = (key) => {
    switch (key) {
      case "key1":
        break;
      case "key2":
        break;
      case "key3":
        this.apiUtils.Logout();
        break;
      default:
    }
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
            activeKey={this.state.activeNavLink}
          >
            <Nav.Link
              href="/borrowers"
              eventKey="key1"
              hidden={this.state.hideNavLinks}
            >
              Borrowers
            </Nav.Link>
            <Nav.Link
              href="/lenderInfo"
              eventKey="key2"
              hidden={this.state.hideNavLinks}
            >
              Lender's Info
            </Nav.Link>
            <Nav.Link href="/" eventKey="key3" hidden={this.state.hideNavLinks}>
              Logout
            </Nav.Link>
            <Nav.Link href="#"></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
