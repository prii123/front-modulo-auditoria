import React from "react";
import Link from "next/link";

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
    link: "/dashboard/informes",
  },
  {
    id: 4,
    nombre: "Usuarios",
    link: "/dashboard/usuarios/listar",
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
    </div>
  );
};

export default Navigation;
