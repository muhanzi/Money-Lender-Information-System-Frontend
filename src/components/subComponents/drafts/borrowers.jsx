import React, { Component } from "react";
import { MDBContainer, MDBDataTable } from "mdbreact";
import { Row } from "react-bootstrap";
import projectStyles from "./subComponents/Styles";
import { data } from "./subComponents/drafts/draftData";

class Borrowers extends Component {
  state = {};
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // you can also use the react DataTable component if you want to implement a table with DataTable Features
  // import DataTable from 'react-data-table-component';
  render() {
    return (
      <div>
        <MDBContainer style={{ minHeight: 500, padding: 20 }}>
          {/* Put here The Table of Borrowers // when a borrower is clicked // a
          popup shows more info */}
          {/* // tests with jest // test form handling only */}
          <Row style={{ marginBottom: 5 }}>
            <span
              className="badge badge m-2"
              style={projectStyles().spanStyle2}
            >
              List of Borrowers
            </span>
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
              data={data}
              id="tableID"
            />
          </MDBContainer>
        </MDBContainer>
      </div>
    );
  }
}

export default Borrowers;
