import React, { Component } from "react";
import {
  MDBContainer,
  MDBDataTable,
  MDBBtn,
  MDBTable,
  MDBTableBody
} from "mdbreact";
import projectStyles from "./subComponents/Styles";
import ApiUtils from "../API/APIUtils";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Navigation from "./subComponents/NavigationBar";
import MyFooter from "./subComponents/footer";
import Home from "./home";
import { Row, Modal, Button, FormGroup } from "react-bootstrap";
import FloatingLabelInput from "react-floating-label-input";
import $ from "jquery";
import { Checkbox, withStyles, FormControlLabel } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

class Borrowers extends Component {
  state = {
    currentUser: {},
    Data: {}, // for the DataTable
    AllBorrowersInfo: [], // with all details from the database
    borrowerModal: false,
    clickedBorrower: {}, // selected borrower in the table
    depositValue: "",
    AddBorrowerModal: false,
    AddBorrowerName: "",
    AddBorrowerPhoneNumber: "",
    AddBorrowerNationalId: "",
    AddBorrowerLoanAmount: "",
    AddBorrowerLoanPeriod: "",
    AddBorrowerPeriodTypeDays: false,
    AddBorrowerPeriodTypeMonths: false,
    AddBorrowerPeriodTypeWeeks: false,
    InterestCalculated: 0.0
  };
  //
  apiUtils = new ApiUtils();
  //
  OrangeCheckbox = withStyles({
    root: {
      color: orange[400],
      "&$checked": {
        color: orange[600]
      }
    },
    checked: {}
  })(props => <Checkbox color="default" {...props} />);
  //
  componentWillMount() {
    this.checkCurrentUser();
  }
  checkCurrentUser() {
    this.apiUtils
      .getCurrentUser()
      .then(response => {
        this.setState({ currentUser: response });
        this.getBorrowers();
        return true; //just for testing
      })
      .catch(error => {
        ReactDOM.render(
          <BrowserRouter>
            <Navigation />
            <Home />
            <MyFooter />
          </BrowserRouter>,
          document.getElementById("root")
        );
        return false; //just for testing
      });
  }
  getBorrowers() {
    this.apiUtils
      .showLoans(this.state.currentUser.id)
      .then(response => {
        // get borrowers
        this.setState({ AllBorrowersInfo: response });
        let loans = [];
        response.forEach(loan => {
          loans.push({
            name: loan.borrowerName,
            amount: Number.parseFloat(loan.loanAmount).toLocaleString(),
            period: loan.loanPeriod + " " + loan.periodType,
            date: loan.date_issued,
            status: loan.status,
            clickEvent: () => {
              // show a popup for a certain borrower
              this.showBorrowerDetails(loan.id);
            }
          });
        });
        this.setState({
          Data: {
            columns: [
              {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 150
              },
              {
                label: "Loan Amount",
                field: "amount",
                sort: "asc",
                width: 270
              },
              {
                label: "Loan Period",
                field: "period",
                sort: "asc",
                width: 200
              },
              {
                label: "Date Issued",
                field: "date",
                sort: "asc",
                width: 100
              },
              {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 150
              }
            ],
            rows: loans
          }
        });
      })
      .catch(error => {});
  }
  showBorrowerDetails = id => {
    // show a popup for a certain borrower
    this.state.AllBorrowersInfo.filter(borrower => {
      if (borrower.id === id) {
        this.setState({ clickedBorrower: borrower, borrowerModal: true }); //borrowerModal // show popup window
        return borrower;
      } else {
        return {}; // the id did not match anything in the array //this.state.AllBorrowersInfo
      }
    });
  };

  HideborrowerModal = () => {
    this.setState({ borrowerModal: false });
    // refresh our data // after some operations  // deposit
    this.getBorrowers();
  };

  handleChangeDeposit = event => {
    this.setState({ depositValue: event.target.value });
  };

  validateDeposit = () => {
    if (this.state.depositValue.length === 0) {
      return false;
    } else if (Number.parseFloat(this.state.depositValue) <= 0) {
      $("#warningTextId").html("deposit sum is invalid !");
      return false;
    }
    // when deposit is greater than balance // show the warning
    else if (
      Number.parseFloat(this.state.depositValue) >
      this.state.clickedBorrower.loanAmount - this.state.clickedBorrower.deposit
    ) {
      $("#warningTextId").html("deposit sum cannot be greater than balance !");
      return false;
    } else {
      $("#warningTextId").html("");
      return true;
    }
  };

  PerformDeposit = event => {
    event.preventDefault();
    event.stopPropagation();
    let loan = this.state.clickedBorrower;
    loan.deposit += Number.parseFloat(this.state.depositValue); // new value of total deposits
    //
    // toFixed(3) // takes a float and gives a String of the number but only with 3 decimal places
    if (
      Number.parseFloat(this.state.clickedBorrower.loanAmount).toFixed(3) ===
      Number.parseFloat(loan.deposit).toFixed(3)
    ) {
      loan.status = "paid"; // change the status of loan after full amount have been paid
      this.apiUtils
        .saveLoan(Object.assign({}, loan)) // give it all properties of a javaScript object
        .then(response => {
          $("#depositId").val("");
          alert("Deposit saved successfully");
        })
        .catch(error => {
          if (error.status === 401) {
            alert("failed to save loan ! Please try again");
          } else {
            alert("Sorry! Something went wrong. Please try again!");
          }
          $("#depositId").val("");
        });
    } else {
      this.apiUtils
        .saveLoan(Object.assign({}, loan)) // give it all properties of a javaScript object
        .then(response => {
          $("#depositId").val("");
          alert("Deposit saved successfully");
        })
        .catch(error => {
          if (error.status === 401) {
            alert("failed to save loan ! Please try again");
          } else {
            alert("Sorry! Something went wrong. Please try again!");
          }
          $("#depositId").val("");
        });
    }
  };

  addNewBorrower = () => {
    this.setState({ AddBorrowerModal: true });
  };

  HideAddBorrowerModal = () => {
    this.setState({ AddBorrowerModal: false });
    // refresh our data // after some operations // after adding a borrower
    this.getBorrowers();
  };

  handleChangeborrowerName = event => {
    this.setState({ AddBorrowerName: event.target.value });
  };

  handleChangeborrowerPhoneNumber = event => {
    this.setState({ AddBorrowerPhoneNumber: event.target.value });
  };

  handleChangeborrowerNationalId = event => {
    this.setState({ AddBorrowerNationalId: event.target.value });
  };

  handleChangeborrowerLoanAmount = event => {
    this.setState({ AddBorrowerLoanAmount: event.target.value });
  };

  handleChangeborrowerLoanPeriod = event => {
    this.setState({ AddBorrowerLoanPeriod: event.target.value });
  };

  handleChangePerioTypeDays = event => {
    this.setState({
      AddBorrowerPeriodTypeDays: event.target.checked,
      AddBorrowerPeriodTypeMonths: false,
      AddBorrowerPeriodTypeWeeks: false
    });
  };

  handleChangePerioTypeWeeks = event => {
    this.setState({
      AddBorrowerPeriodTypeDays: false,
      AddBorrowerPeriodTypeMonths: false,
      AddBorrowerPeriodTypeWeeks: event.target.checked
    });
  };

  handleChangePerioTypeMonths = event => {
    this.setState({
      AddBorrowerPeriodTypeDays: false,
      AddBorrowerPeriodTypeMonths: event.target.checked,
      AddBorrowerPeriodTypeWeeks: false
    });
  };

  validateAddBorrowerForm = () => {
    if (this.state.AddBorrowerName.trim().length === 0) {
      return false;
    } else if (this.state.AddBorrowerPhoneNumber.length === 0) {
      return false;
    } else if (
      this.state.AddBorrowerPhoneNumber.length >= 1 &&
      this.state.AddBorrowerPhoneNumber.length < 10
    ) {
      $("#borrowerWarningTextId").html("Phone number must have 10 digits");
      return false;
    } else if (this.state.AddBorrowerPhoneNumber.length > 10) {
      $("#borrowerWarningTextId").html(
        "Phone number should not exceed 10 digits"
      );
      return false;
    } else if (this.state.AddBorrowerNationalId.trim().length === 0) {
      return false;
    } else if (this.state.AddBorrowerLoanAmount.length === 0) {
      return false;
    } else if (Number.parseFloat(this.state.AddBorrowerLoanAmount) <= 0) {
      $("#borrowerWarningTextId").html("Loan amount is invalid !");
      return false;
    } else if (
      Number.parseFloat(this.state.AddBorrowerLoanAmount) >
      this.state.currentUser.initialCapital +
        this.state.currentUser.totalInterest
    ) {
      $("#borrowerWarningTextId").html(
        "Loan amount is greater than your actual capital !"
      );
      return false;
    } else if (this.state.AddBorrowerLoanPeriod.length === 0) {
      return false;
    } else if (Number.parseFloat(this.state.AddBorrowerLoanPeriod) <= 0) {
      $("#borrowerWarningTextId").html("Loan period is invalid !");
      return false;
    } else if (
      this.state.AddBorrowerPeriodTypeDays === false &&
      this.state.AddBorrowerPeriodTypeWeeks === false &&
      this.state.AddBorrowerPeriodTypeMonths === false
    ) {
      return false;
    } else {
      $("#borrowerWarningTextId").html("");
      return true;
    }
  };

  PerformAddBorrower = event => {
    event.preventDefault();
    event.stopPropagation();
    let borrower = {
      borrowerName: this.state.AddBorrowerName,
      date_issued: new Date(),
      deposit: 0.0,
      lender: this.state.currentUser,
      loanAmount:
        Number.parseFloat(this.state.AddBorrowerLoanAmount) +
        this.calculateInterest(
          this.state.AddBorrowerLoanAmount,
          this.state.currentUser.interestRate,
          this.state.AddBorrowerLoanPeriod,
          this.getPeriodTypeChosen()
        ),
      loanPeriod: Number.parseFloat(this.state.AddBorrowerLoanPeriod),
      nationalIdNumber: this.state.AddBorrowerNationalId,
      periodType: this.getPeriodTypeChosen(),
      phoneNumber: this.state.AddBorrowerPhoneNumber,
      status: "onGoing"
    };
    this.apiUtils
      .saveLoan(Object.assign({}, borrower)) // give it all properties of a javaScript object
      .then(response => {
        this.updateLenderTotalInterest();
        // uncheck all the checkboxes
        this.setState({
          AddBorrowerPeriodTypeDays: false,
          AddBorrowerPeriodTypeWeeks: false,
          AddBorrowerPeriodTypeMonths: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          alert("failed to add borrower ! Please try again");
        } else {
          alert("Sorry! Something went wrong. Please try again!");
        }
        this.emptyBorrowerRegistrationForm();
      });
  };

  getPeriodTypeChosen() {
    if (this.state.AddBorrowerPeriodTypeDays === true) {
      return "days";
    } else if (this.state.AddBorrowerPeriodTypeWeeks === true) {
      return "weeks";
    } else if (this.state.AddBorrowerPeriodTypeMonths === true) {
      return "months";
    } else {
      return "";
    }
  }

  calculateInterest(loanCapital, rate, period, periodType) {
    let interest = 0.0;
    if (periodType === "days") {
      interest =
        (Number.parseFloat(loanCapital) *
          Number.parseFloat(rate) *
          Number.parseFloat(period)) /
        36000; // 36000 // 360 days in a year * 100 // rate is out hundred
    } else if (periodType === "weeks") {
      interest =
        (Number.parseFloat(loanCapital) *
          Number.parseFloat(rate) *
          Number.parseFloat(period)) /
        5200; // 52 weeks * 100
    } else if (periodType === "months") {
      interest =
        (Number.parseFloat(loanCapital) *
          Number.parseFloat(rate) *
          Number.parseFloat(period)) /
        1200; // 12 moths * 100
    } else {
    }
    //
    this.setState({ InterestCalculated: interest });
    return interest;
  }

  updateLenderTotalInterest() {
    let LenderUpdate = this.state.currentUser;
    LenderUpdate.totalInterest += this.state.InterestCalculated;
    this.apiUtils
      .updateLender(Object.assign({}, LenderUpdate)) // give it all properties of a javaScript object
      .then(response => {
        // alert("lender total interest updated successfully");
        this.emptyBorrowerRegistrationForm();
        alert("Borrower added successfully");
      })
      .catch(error => {
        // if (error.status === 401) {
        //   alert("failed to update total interest ! Please try again");
        // } else {
        //   alert("Sorry! Something went wrong. Please try again!");
        // }
      });
  }

  emptyBorrowerRegistrationForm() {
    let IDs = [
      "borrowerNameId",
      "phoneNumberId",
      "NatioanalId",
      "borrowerLoanAmountId",
      "borrowerLoanPeriodId"
    ];
    IDs.forEach(id => {
      $("#" + id).val(""); // set value to empty
    });
  }

  render() {
    return (
      <div>
        <MDBContainer style={{ minHeight: 500, padding: 20 }}>
          {/* Put here The Table of Borrowers // when a borrower is clicked // a
          popup shows more info */}
          {/* // tests with jest // test form handling only */}
          <Row style={{ marginBottom: 5 }}>
            <span
              className="badge badge m-2 mr-auto"
              style={projectStyles().spanStyle2}
            >
              List of Borrowers
            </span>
            <MDBBtn
              style={projectStyles().buttonStyle2}
              className="btn-warning"
              onClick={this.addNewBorrower}
            >
              New Borrower +
            </MDBBtn>
          </Row>
          <MDBContainer>
            <MDBDataTable
              scrollY
              maxHeight="100vh"
              striped
              hover
              bordered
              small
              responsive
              data={this.state.Data}
              id="tableID"
            />
          </MDBContainer>
          {/* popup window for more borrower details and deposit */}
          <Modal
            show={this.state.borrowerModal}
            onHide={this.HideborrowerModal}
            centered
          >
            <form onSubmit={this.PerformDeposit}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <span
                    style={projectStyles().spanStyle2}
                    className="badge badge m-2"
                  >
                    {this.state.clickedBorrower.borrowerName}
                  </span>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>
                  <MDBTable>
                    <MDBTableBody>
                      <tr>
                        <td>Natioanl ID</td>
                        <td>{this.state.clickedBorrower.nationalIdNumber}</td>
                      </tr>
                      <tr>
                        <td>Phone NUmber</td>
                        <td>{this.state.clickedBorrower.phoneNumber}</td>
                      </tr>
                      <tr>
                        <td>Loan Amount</td>
                        <td>
                          {/* toLocaleString() will give us a format of the number (with comas or dots) // in Uganda it's comas */}
                          {Number.parseFloat(
                            this.state.clickedBorrower.loanAmount
                          ).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td>Balance</td>
                        <td>
                          {Number.parseFloat(
                            this.state.clickedBorrower.loanAmount -
                              this.state.clickedBorrower.deposit
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                  <FormGroup>
                    <FloatingLabelInput
                      id="depositId"
                      label={"Deposit Sum"}
                      onBlur=""
                      type="number"
                      onChange={this.handleChangeDeposit}
                      value={this.state.depositValue}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  <span className="text-danger" id="warningTextId"></span>
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={this.HideborrowerModal}>
                  Close
                </Button>
                <MDBBtn
                  className="btn-warning"
                  style={projectStyles().buttonStyle}
                  disabled={!this.validateDeposit()}
                  type="submit"
                >
                  Deposit
                </MDBBtn>
              </Modal.Footer>
            </form>
          </Modal>
          {/* popup window for adding new borrower */}
          <Modal
            show={this.state.AddBorrowerModal}
            onHide={this.HideAddBorrowerModal}
            centered
          >
            <form onSubmit={this.PerformAddBorrower}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <span
                    style={projectStyles().spanStyle2}
                    className="badge badge m-2"
                  >
                    New Borrower
                  </span>
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>
                  <FormGroup>
                    <FloatingLabelInput
                      id="borrowerNameId"
                      label={"Name"}
                      onBlur=""
                      type="text"
                      onChange={this.handleChangeborrowerName}
                      value={this.state.AddBorrowerName}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FloatingLabelInput
                      id="phoneNumberId"
                      label={"Phone Number"}
                      type="number"
                      onBlur=""
                      onChange={this.handleChangeborrowerPhoneNumber}
                      value={this.state.AddBorrowerPhoneNumber}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FloatingLabelInput
                      id="NatioanalId"
                      label={"National ID"}
                      onBlur=""
                      onChange={this.handleChangeborrowerNationalId}
                      value={this.state.AddBorrowerNationalId}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FloatingLabelInput
                      id="borrowerLoanAmountId"
                      label={"Loan Amount"}
                      onBlur=""
                      type="number"
                      onChange={this.handleChangeborrowerLoanAmount}
                      value={this.state.AddBorrowerLoanAmount}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FloatingLabelInput
                      id="borrowerLoanPeriodId"
                      label={"Loan Period"}
                      onBlur=""
                      type="number"
                      onChange={this.handleChangeborrowerLoanPeriod}
                      value={this.state.AddBorrowerLoanPeriod}
                      style={{ fontSize: 15, fontFamilly: "sans-serif" }}
                    />
                  </FormGroup>
                  {/* // checkboxes */}
                  <span style={{ marginRight: 5 }}>Choose period type</span>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <this.OrangeCheckbox
                          id="periodTypeDaysID"
                          onChange={this.handleChangePerioTypeDays}
                          checked={this.state.AddBorrowerPeriodTypeDays} // means when the value changes it should show the box ticked or not ticked
                        />
                      }
                      label="Days"
                    />
                    <FormControlLabel
                      control={
                        <this.OrangeCheckbox
                          id="periodTypeWeeksID"
                          onChange={this.handleChangePerioTypeWeeks}
                          checked={this.state.AddBorrowerPeriodTypeWeeks} // means when the value changes it should show the box ticked or not ticked
                        />
                      }
                      label="Weeks"
                    />
                    <FormControlLabel
                      control={
                        <this.OrangeCheckbox
                          id="periodTypeMonthsID"
                          onChange={this.handleChangePerioTypeMonths}
                          checked={this.state.AddBorrowerPeriodTypeMonths} // means when the value changes it should show the box ticked or not ticked
                        />
                      }
                      label="Months"
                    />
                  </FormGroup>
                  {/* // checkBoxes  */}
                  <span
                    className="text-danger"
                    id="borrowerWarningTextId"
                  ></span>
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={this.HideAddBorrowerModal}>
                  Cancel
                </Button>
                <MDBBtn
                  className="btn-warning"
                  style={projectStyles().buttonStyle}
                  disabled={!this.validateAddBorrowerForm()}
                  type="submit"
                >
                  Save
                </MDBBtn>
              </Modal.Footer>
            </form>
          </Modal>
        </MDBContainer>
      </div>
    );
  }
}

export default Borrowers;
