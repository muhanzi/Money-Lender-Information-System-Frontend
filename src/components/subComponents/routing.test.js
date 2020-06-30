import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MyRoutes from "./routing";

configure({ adapter: new Adapter() }); // for enzyme
it("<MyRoutes /> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyRoutes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
