import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import project from "./static";

const MyFooter = () => {
  return (
    <MDBFooter>
      <div
        style={{
          textAlign: "center",
          height: 80,
          paddingTop: 20,
          color: "white",
          backgroundColor: project().projectColor
        }}
      >
        <MDBContainer fluid>
          {" " + new Date().getFullYear() + " Copyright: Dimes"}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default MyFooter;
