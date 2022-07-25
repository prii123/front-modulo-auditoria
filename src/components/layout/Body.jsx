import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
const Body = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />

      <div className="row" style={{ height: "90vh" }}>
        <div className="col-sm-9 col-lg-2">
          <Navigation />
        </div>
        <div className="col-sm-9 col-lg-9">
          <div className="container-sm" style={{paddingTop: '5vh'}}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Body;
