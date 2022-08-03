import React from "react";
import { useAuth } from "../../libs/auth";

const Header = ({ head }) => {
  const { signOut } = useAuth();
  return (
    <nav className="navbar bg-secondary bg-gradient" style={{ color: "white", height: "10%" }}>
      <div className="container-fluid">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-11">{head && head}</div>
          <div className="col-1">
          <button type="button" onClick={() => {
                signOut();
                location.reload();
              }} className="btn-close btn-close-white" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
