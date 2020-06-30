import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WrongUrl from "./wrongUrl";

configure({ adapter: new Adapter() }); // for enzyme
it("<WrongUrl /> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WrongUrl />, div);
  ReactDOM.unmountComponentAtNode(div);
});
