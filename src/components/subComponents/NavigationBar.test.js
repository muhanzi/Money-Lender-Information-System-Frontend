import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navigation from "./NavigationBar";

configure({ adapter: new Adapter() }); // for enzyme
it("<Navigation /> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Navigation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
