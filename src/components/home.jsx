import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";
import backgroundPhoto1 from "../Images/imageA.png";
import backgroundPhoto2 from "../Images/imageB.jpg";
import backgroundPhoto3 from "../Images/imageC.jpg";
import backgroundPhoto4 from "../Images/imageD.jpg";
import backgroundPhoto5 from "../Images/imageE.jpg";
import project from "./subComponents/static";
import { Row, Modal, Button, FormGroup } from "react-bootstrap";
import FloatingLabelInput from "react-floating-label-input";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Borrowers from "./borrowers";
import Navigation from "./subComponents/NavigationBar";
import MyFooter from "./subComponents/footer";
import ApiUtils from "../API/APIUtils";
import { ACCESS_TOKEN } from "../API/constants";
import $ from "jquery";

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
    AddUserpassword: "",
    LoginUsername: "",
    LoginUserpassword: ""
  };
  //
  apiUtils = new ApiUtils();
  //
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
  componentWillMount() {
    this.checkCurrentUser();
  }

  checkCurrentUser() {
    this.apiUtils
      .getCurrentUser()
      .then(response => {
        ReactDOM.render(
          <BrowserRouter>
            <Navigation />
            <Borrowers />
            <MyFooter />
          </BrowserRouter>,
          document.getElementById("root")
        );
      })
      .catch(error => {});
  }

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
  // validate lender's registration form
  validateForm() {
    if (this.state.AddName.trim().length === 0) {
      return false;
    } else if (this.state.AddUseremail.trim().replace(" ", "").length < 1) {
      return false;
    } else if (this.state.AddUsername.trim().replace(" ", "").length < 1) {
      return false;
    } else if (this.state.AddCapital.length === 0) {
      return false;
    } else if (Number.parseFloat(this.state.AddCapital) <= 0) {
      $("#registrationWarningTextId").html("Invalid capital !");
      return false;
    } else if (this.state.AddInterest.length === 0) {
      return false;
    } else if (Number.parseFloat(this.state.AddInterest) <= 0) {
      $("#registrationWarningTextId").html("Invalid interest rate !");
      return false;
    } else if (this.state.AddUserpassword.length < 6) {
      return false;
    } else {
      $("#registrationWarningTextId").html("");
      return true;
    }
  }

  validateFormLogin() {
    if (
      this.state.LoginUsername.trim().replace(" ", "").length >= 1 &&
      this.state.LoginUserpassword.length === 6
    ) {
      return true;
    } else {
      return false;
    }
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
  //
  handleChangeUsernameLogin = event => {
    this.setState({ LoginUsername: event.target.value });
  };
  handleChangePasswordLogin = event => {
    this.setState({ LoginUserpassword: event.target.value });
  };
  //
  PerformSignUp = event => {
    event.preventDefault();
    event.stopPropagation();
    const signUpRequest = {
      username: this.state.AddUsername,
      password: this.state.AddUserpassword,
      email: this.state.AddUseremail,
      companyName: this.state.AddName,
      initialCapital: Number.parseFloat(this.state.AddCapital),
      interestRate: Number.parseFloat(this.state.AddInterest),
      role: "user"
    };
    this.apiUtils
      .signup(Object.assign({}, signUpRequest)) // give it all properties of a javaScript object
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        // empt fields
        this.emptySignUpForm();
        // go to component 'Borrowers'
        ReactDOM.render(
          <BrowserRouter>
            <Navigation />
            <Borrowers />
            <MyFooter />
          </BrowserRouter>,
          document.getElementById("root")
        );
        //
      })
      .catch(error => {
        if (error.status === 401) {
          alert("failed to add a new user ! Please try again");
        } else {
          alert("Sorry! Something went wrong. Please try again!");
        }
        //
        // else if (error.status === 409) {
        //   alert("conflict ! username exists already");
        // }
        //
        // empt fields
        this.emptySignUpForm();
      });
  };

  emptySignUpForm() {
    let IDs = [
      "nameId",
      "AddUserEmailId",
      "AddUserCapitalId",
      "AddUserInterestRateId",
      "AddUsernameId",
      "AddUserpasswordId"
    ];
    IDs.forEach(id => {
      $("#" + id).val(""); // set value to empty
    });
  }

  PerformSignIn = event => {
    event.preventDefault();
    event.stopPropagation();
    const loginRequest = {
      username: this.state.LoginUsername,
      password: this.state.LoginUserpassword
    };
    this.apiUtils
      .login(Object.assign({}, loginRequest)) // give it all properties of a javaScript object
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        // go to component 'Borrowers'
        ReactDOM.render(
          <BrowserRouter>
            <Navigation />
            <Borrowers />
            <MyFooter />
          </BrowserRouter>,
          document.getElementById("root")
        );
        //
      })
      .catch(error => {
        if (error.status === 401) {
          alert("Your Username or Password is incorrect. Please try again!");
          // empty fields
          $("#LoginUserpasswordId").val("");
          $("#LoginUsernameId").val("");
        } else {
          alert(
            error.message || "Sorry! Something went wrong. Please try again!"
          );
        }
      });
  };

  showLogin = () => {
    this.setState({ loginForm: false, signUpForm: true });
  };
  showSignUp = () => {
    this.setState({ loginForm: true, signUpForm: false });
  };

  render() {
    // limit the number of characters in the password field
    $("#LoginUserpasswordId").attr("maxlength", "6");
    $("#AddUserpasswordId").attr("maxlength", "6");
    //
    return (
      <div>
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
                    id="AddUserInterestRateId"
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
                    label={"Password (6 characters)"}
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
                <FormGroup>
                  <span
                    className="text-danger"
                    id="registrationWarningTextId"
                  ></span>
                </FormGroup>
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
                    label={"Password (6 characters)"}
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
