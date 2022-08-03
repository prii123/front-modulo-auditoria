import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="container border-end">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href={"/dashboard"}>
            <a className="nav-link text-dark">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/dashboard/empresas"}>
            <a className="nav-link text-dark">Empresas</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={"/dashboard/informes"}>
            <a className="nav-link text-dark">Informes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
