import React from "react";
import Link from "next/link";
import BotonRegresar from "../utiles/BotonRegresar";

export const navigator = [
  {
    id: 1,
    nombre: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    nombre: "Empresas",
    link: "/dashboard/empresas/listar",
  },
  {
    id: 3,
    nombre: "Informes",
    link: "/dashboard/informes/init",
  },
  {
    id: 4,
    nombre: "Usuarios",
    link: "/dashboard/usuarios/listar",
  },
  {
    id: 5,
    nombre: "Formatos",
    link: "/dashboard/formatos",
  },
];

const Navigation = () => {
  return (
    <div className="container border-end">
      <ul className="nav flex-column">
        {navigator.map((item) => {
          return (
            <li className="nav-item" key={item.id}>
              <Link href={item.link}>
                <a className="nav-link text-dark">{item.nombre}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <br/>
      <br/>
      <br/>
      <div><BotonRegresar/></div>
    </div>
  );
};

export default Navigation;
