import React from "react";
import Layout from "../../../../../components/layout/Body";
import Link from "next/link";
import { useRouter } from "next/router";

const retencion = [
  {
    id: 1,
    nombre: "ANEXO",
    link: "anexo",
  },
  {
    id: 2,
    nombre: "350",
    link: "350",
  },
];

const index = () => {
  const router = useRouter();

  const idEmpresa = router.query.id;
  const periodo = router.query.periodo;

  const path = router.asPath;
  return (
    <Layout head={"MODULO DE RETENCION EN LA FUENTE"}>
      <div className="row  row-cols-4">
        {retencion.map((pag) => {
          return (
            <Link key={pag.id} href={`${path}/${pag.link}`}>
              <div className="col hover-cards p-3 align-text-center">
                <div className="card bg-white " style={{ width: "10rem", height: "10rem" }}>
                  <div className="p-3"><strong>{pag.nombre}</strong></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default index;
