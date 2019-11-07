import React, { Component } from "react";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Row } from "react-bootstrap";
import projectStyles from "./subComponents/Styles";
import project from "./subComponents/static";
import ApiUtils from "../API/APIUtils";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Navigation from "./subComponents/NavigationBar";
import MyFooter from "./subComponents/footer";
import Home from "./home";

class LenderInfo extends Component {
  // to show the current path
  // alert(this.props.location.pathname); // when you route to a component react-router places it in props to the component
  // so here it would be '/lenderInfo'
  constructor(props) {
    super(props);
    this.state = {
      lendeInfo: {}
    };
  }
  apiUtils = new ApiUtils();
  componentWillMount() {
    this.checkCurrentUser();
  }
  checkCurrentUser() {
    this.apiUtils
      .getCurrentUser()
      .then(response => {
        this.setState({ lendeInfo: response });
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
      });
  }

  render() {
    return (
      <div>
        <MDBContainer style={{ minHeight: 500, padding: 20 }}>
          <Row style={{ marginBottom: 15 }}>
            <span
              className="badge badge m-2"
              style={projectStyles().spanStyle2}
            >
              Lender's Information
            </span>
          </Row>
          <MDBTable striped>
            <MDBTableHead color="primary-color">
              <tr style={{ backgroundColor: project().projectColor }}>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Company Name</td>
                <td>{this.state.lendeInfo.companyName}</td>
              </tr>
              <tr>
                <td>Initial Capital</td>
                <td>
                  {/* toLocaleString() will give us a format of the number (with comas or dots) // in Uganda it's comas */}
                  {Number.parseFloat(
                    this.state.lendeInfo.initialCapital
                  ).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Actual Capital</td>
                <td>
                  {Number.parseFloat(
                    this.state.lendeInfo.initialCapital +
                      this.state.lendeInfo.totalInterest
                  ).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Total Interest</td>
                <td>
                  {Number.parseFloat(
                    this.state.lendeInfo.totalInterest
                  ).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Interest Rate</td>
                <td>
                  {Number.parseFloat(
                    this.state.lendeInfo.interestRate
                  ).toLocaleString() + "%"}
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </div>
    );
  }
}

export default LenderInfo;
