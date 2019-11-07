import React, { Component } from "react";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Row } from "react-bootstrap";
import projectStyles from "./subComponents/Styles";
import project from "./subComponents/static";

class LenderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      </div>
    );
  }
}

export default LenderInfo;
