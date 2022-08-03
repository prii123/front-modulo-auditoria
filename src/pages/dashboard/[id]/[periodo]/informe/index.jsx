import React from "react";
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import InformeVisita from "../../../../../libs/pdf/informeVisita/Informe"

const informe = ({ informe }) => {
  // console.log(libs.formatFechaLarga(new Date()));
  // console.log(informe);

  const info = {
    head: {
      fecha: libs.formatFechaLarga(new Date()),
      dirigido: informe[0]?.razonSocial,
    },
    asunto: {
      asunto: "REVISIÓN DE LA INFORMACIÓN CONTABLE",
      delegado: informe[0]?.username,
    },
    body: {
      periodo: informe[0]?.periodo,
      documentos: informe,
    },
  };

  console.log(info)

  return (
    <Layout head={<div>INFORMES</div>}>
      <a
        className="pe-auto text-decoration-none"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-skip-backward"
          viewBox="0 0 16 16"
        >
          <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
        </svg>
        &nbsp;&nbsp;&nbsp;Regresar
      </a>
      <br />

      <InformeVisita data={info}  />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const periodo = ctx?.query?.periodo || 0;
  const idEmpresa = ctx?.query?.id;

  // console.log(tipoDoc);

  const documentosPeriodo = await axios({
    method: "get",
    url:
      libs.location() +
      "api/consulta-informe-revision/" +
      idEmpresa +
      "/" +
      periodo,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return {
    props: {
      informe: documentosPeriodo?.data,
    },
  };
}

export default informe;
