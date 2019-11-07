import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Borrowers from "./borrowers";

configure({ adapter: new Adapter() }); // for enzyme
const borrowing = new Borrowers();

it("<Borrowers/> renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Borrowers />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// UI test
describe("MDBBtn inside <Borrowers/>", () => {
  it("MDBBtn", () => {
    const component = shallow(<Borrowers />); //enzyme  wiil mount it // will not include child components
    expect(component.find("MDBBtn").unmount);
    expect(component.find("MDBBtn").length).toEqual(0); // we don't expect a button to have text // only inputs can have text
  });
});
test("Calculate Interest", () => {
  let interest = borrowing.calculateInterest(350000, 3, 8, "weeks");
  expect(Number.parseFloat(interest.toFixed(3))).toBe(1615.385); //passed
});
test("Calculate Interest equal to 0", () => {
  let interest = borrowing.calculateInterest(350000, 3, 8, "");
  expect(Number.parseFloat(interest.toFixed(3))).toBe(0.0);
});
test("Calculate Interest with null values", () => {
  let interest = borrowing.calculateInterest(null, null, null, "months");
  expect(Number.parseFloat(interest.toFixed(3))).toBe(NaN); //NaN //not a number
});
test("Calculate Interest with nulls and no periodType", () => {
  let interest = borrowing.calculateInterest(null, null, null, "");
  expect(Number.parseFloat(interest.toFixed(3))).toBe(0.0);
});
// test getPeriodType()
