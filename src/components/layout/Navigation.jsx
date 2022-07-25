import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div
      className="container"
      style={{ backgroundColor: "#DFDDDD", height: '90vh' }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href={'/dashboard'}>
            <a className="nav-link" >Home</a>
          </Link>
        </li>
        <li className="nav-item">
        <Link href={'/dashboard/empresas'}>
          <a className="nav-link" >
            Empresas
          </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={'/dashboard/informes'}>
          <a className="nav-link">
            Informes
          </a>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Navigation;
