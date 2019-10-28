import React, { Component } from "react";
import Navigation from "./subComponents/NavigationBar";
import { MDBContainer } from "mdbreact";
import MyFooter from "./subComponents/footer";

class LenderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navigation hideNavLinks={false} activatedKey={"key2"} />
        <MDBContainer style={{ height: 500 }}>Lender Info</MDBContainer>
        <MyFooter />
      </div>
    );
  }
}

export default LenderInfo;
