import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
const Body = ({ children, head }) => {
  return (
    <>
      <div className="container-fluid">
        <Header head={head} />
      </div>

      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-9 col-lg-2">
            <div
              className="bg bg-gradient "
              style={{ paddingTop: "5vh"}}
            >
              <Navigation  />
            </div>
          </div>
          <div className="col-sm-9 col-lg-9 m-0 p-0 ">
            <div
              className="container-sm "
              style={{ paddingTop: "5vh", height: "92vh" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
