import React, { Component } from "react";
import Navigation from "./subComponents/NavigationBar";
import { MDBContainer, MDBBtn } from "mdbreact";
import MyFooter from "./subComponents/footer";
import backgroundPhoto1 from "../Images/imageA.png";
import backgroundPhoto2 from "../Images/imageB.jpg";
import backgroundPhoto3 from "../Images/imageC.jpg";
import backgroundPhoto4 from "../Images/imageD.jpg";
import backgroundPhoto5 from "../Images/imageE.jpg";
import project from "./subComponents/static";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Nav,
  FormGroup
} from "react-bootstrap";
import FloatingLabelInput from "react-floating-label-input";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Borrowers from "./borrowers";

class Home extends Component {
  state = {
    AddUsermodalStatus: false,
    loginForm: false,
    signUpForm: true,
    AddName: "",
    AddUseremail: "",
    AddCapital: "",
    AddInterest: "",
    AddUsername: "",
    AddUserpassword: ""
  };

  myStyle = {
    mycenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: project().projectColor
    },
    buttonStyle: {
      backgroundColor: project().projectColor,
      color: "white"
    },
    spanStyle: {
      fontSize: 18,
      display: "flex",
      backgroundColor: project().projectColor,
      color: "white",
      marginBottom: 20
    },
    spanStyle2: {
      fontSize: 22,
      display: "flex",
      backgroundColor: project().projectColor,
      color: "white",
      marginBottom: 20
    }
  };

  ShowAddUserModal = () => {
    this.setState({ AddUsermodalStatus: true });
  };

  HideAddUserModal = () => {
    this.setState({
      AddUsermodalStatus: false,
      signUpForm: true,
      loginForm: false
    });
  };
  //
  validateForm() {
    if (
      this.state.AddName.trim().length > 1 &&
      this.state.AddUseremail.trim().replace(" ", "").length > 5 &&
      this.state.AddUsername.trim().replace(" ", "").length > 1 &&
      this.state.AddUserpassword.length > 6
    ) {
      return true;
    } else {
      return false;
    }
  }

  validateFormLogin() {
    // for now
    return true;
  }

  handleChangeName = event => {
    this.setState({ AddName: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ AddUseremail: event.target.value });
  };
  handleChangeCapital = event => {
    this.setState({ AddCapital: event.target.value });
  };
  handleChangeInterest = event => {
    this.setState({ AddInterest: event.target.value });
  };
  handleChangeUsername = event => {
    this.setState({ AddUsername: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ AddUserpassword: event.target.value });
  };

  handleChangeUsernameLogin = event => {
    this.setState({ LoginUsername: event.target.value });
  };
  handleChangePasswordLogin = event => {
    this.setState({ LoginUserpassword: event.target.value });
  };

  PerformSignUp = event => {
    // TODO
    //
    ReactDOM.render(
      <BrowserRouter>
        <Borrowers />
      </BrowserRouter>,
      document.getElementById("root")
    );
  };

  PerformSignIn = event => {
    // TODO
    //
    ReactDOM.render(
      <BrowserRouter>
        <Borrowers />
      </BrowserRouter>,
      document.getElementById("root")
    );
  };

  showLogin = () => {
    this.setState({ loginForm: false, signUpForm: true });
  };
  showSignUp = () => {
    this.setState({ loginForm: true, signUpForm: false });
  };

  render() {
    return (
      <div>
        <Navigation hideNavLinks={true} />
        <MDBContainer
          fluid
          style={{
            minHeight: 500,
            maxHeight: window.screen.availHeight,
            backgroundImage: "url(" + backgroundPhoto1 + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.6,
            zoom: 1,
            paddingTop: "20%"
          }}
        >
          <div>
            <Row style={this.myStyle.mycenter}>
              <h2>
                <b>Welcome to Dimes !</b>
              </h2>
            </Row>
            <Row style={this.myStyle.mycenter}>
              <Button
                block
                className="btn-warning"
                style={{
                  borderRadius: 16,
                  backgroundColor: project().projectColor,
                  opacity: 1,
                  padding: 10,
                  border: 0,
                  width: 150
                }}
                onClick={() => {
                  this.setState({ AddUsermodalStatus: true });
                }}
              >
                Start Dimes
              </Button>
            </Row>
          </div>
        </MDBContainer>
        <MyFooter />
        {/* popup window */}
        <Modal
          show={this.state.AddUsermodalStatus}
          onHide={this.HideAddUserModal} // when the closeButton 'X'  is clicked
          centered
        >
          {/* Registration form */}
          <form onSubmit={this.PerformSignUp} hidden={this.state.signUpForm}>
            <Modal.Header closeButton>
              <Modal.Title>
                <span
                  style={this.myStyle.spanStyle2}
                  className="badge badge m-2"
                >
                  Lender Registration
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                <FormGroup>
                  <FloatingLabelInput
                    id="nameId"
                    label="Lender's Name or Company Name"
                    onBlur=""
                    value={this.state.AddName}
                    onChange={this.handleChangeName}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="AddUserEmailId"
                    label={"Email"}
                    type="email"
                    onBlur=""
                    value={this.state.AddUseremail}
                    onChange={this.handleChangeEmail}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="AddUserCapitalId"
                    label={"Initial Capital"}
                    type="number"
                    onBlur=""
                    value={this.state.AddCapital}
                    onChange={this.handleChangeCapital}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="AddUserCapitalId"
                    label={"Interest Rate"}
                    type="number"
                    onBlur=""
                    value={this.state.AddInterest}
                    onChange={this.handleChangeInterest}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="AddUsernameId"
                    label={"Username"}
                    onBlur=""
                    value={this.state.AddUsername}
                    onChange={this.handleChangeUsername}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="AddUserpasswordId"
                    label={"Password"}
                    onBlur=""
                    type="password"
                    value={this.state.AddUserpassword}
                    onChange={this.handleChangePassword}
                    style={{ fontSize: 15 }}
                  />
                </FormGroup>
                Already have an account ?{" "}
                <a
                  href="#"
                  style={{ color: project().projectColor }}
                  onClick={this.showLogin}
                >
                  Sign In
                </a>
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.HideAddUserModal}>
                Cancel
              </Button>
              <MDBBtn
                className="btn-warning"
                style={this.myStyle.buttonStyle}
                disabled={!this.validateForm()}
                type="submit"
              >
                Save Lender Information
              </MDBBtn>
            </Modal.Footer>
          </form>
          {/* Login form */}
          <form onSubmit={this.PerformSignIn} hidden={this.state.loginForm}>
            <Modal.Header closeButton>
              <Modal.Title>
                <span
                  style={this.myStyle.spanStyle2}
                  className="badge badge m-2"
                >
                  Login
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                <FormGroup>
                  <FloatingLabelInput
                    id="LoginUsernameId"
                    label={"Username"}
                    onBlur=""
                    value={this.state.LoginUsername}
                    onChange={this.handleChangeUsernameLogin}
                    style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                  />
                </FormGroup>
                <FormGroup>
                  <FloatingLabelInput
                    id="LoginUserpasswordId"
                    label={"Password"}
                    onBlur=""
                    type="password"
                    value={this.state.LoginUserpassword}
                    onChange={this.handleChangePasswordLogin}
                    style={{ fontSize: 15 }}
                  />
                </FormGroup>
                Don't have an account ?{" "}
                <a
                  href="#"
                  style={{ color: project().projectColor }}
                  onClick={this.showSignUp}
                >
                  Register
                </a>
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.HideAddUserModal}>
                Cancel
              </Button>
              <MDBBtn
                className="btn-warning"
                style={this.myStyle.buttonStyle}
                disabled={!this.validateFormLogin()}
                type="submit"
              >
                Sign In
              </MDBBtn>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Home;
