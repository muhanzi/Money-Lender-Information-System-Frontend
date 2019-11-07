import React from "react";
import MyRoutes from "./components/subComponents/routing";
import "./App.css";
import Navigation from "./components/subComponents/NavigationBar";
import MyFooter from "./components/subComponents/footer";

function App() {
  return (
    <div>
      <Navigation />
      <MyRoutes />
      <MyFooter />
    </div>
  );
}

export default App;
