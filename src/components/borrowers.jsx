import React, { Component } from "react";
import Navigation from "./subComponents/NavigationBar";
import { MDBContainer } from "mdbreact";
import MyFooter from "./subComponents/footer";

class Borrowers extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navigation hideNavLinks={false} activatedKey={"key1"} />
        <MDBContainer style={{ height: 500 }}>
          Put here The Table of Borrowers // when a borrower is clicked // a
          popup shows more info
          {/* // tests with jest // test form handling only */}
        </MDBContainer>
        <MyFooter />
      </div>
    );
  }
}

export default Borrowers;
