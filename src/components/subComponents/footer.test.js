import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyFooter from "./footer";

configure({ adapter: new Adapter() }); // for enzyme
it("<Footer /> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
