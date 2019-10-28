import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "../home";
import Borrowers from "../borrowers";
import LenderInfo from "../lenderInfo";
import WrongUrl from "./wrongUrl";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/borrowers" component={Borrowers} />
        <Route path="/lenderInfo" component={LenderInfo} />
        <Route component={WrongUrl} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRoutes;
