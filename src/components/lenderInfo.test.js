import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LenderInfo from "./lenderInfo";

configure({ adapter: new Adapter() }); // for enzyme
it("<LenderInfo /> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LenderInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
