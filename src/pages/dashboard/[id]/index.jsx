import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";

import Alertas from "../../../components/utiles/Alertas";

export const cards = [
  {
    id: 1,
    titulo: "Auditoria",
    descripcion: "Realiza la auditoria tributaria de forma periodica",
    link: "auditoria",
  },
  {
    id: 2,
    titulo: "Informes",
    descripcion: "Realiza tu informe de auditoria",
    link: "informe",
  },
  {
    id: 3,
    titulo: "Importar Datos",
    descripcion: "Importa tus datos",
    link: "importacion",
  },
];
const index = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [periodo, setPeriodo] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [statusAlert, setStatusAlert] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messageAlert, setMessageAlert] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [colorAlert, setColorAlert] = useState("");
  // console.log(router.asPath + "/" + periodo)

  const verificaPeriodo = (url) => {
    if (!url) {
      setMessageAlert("algo esta mal con la url");
      setColorAlert("danger");
      setStatusAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setColorAlert("");
        setStatusAlert(false);
      }, 3000);
    }
    if (periodo <= 0) {
      setMessageAlert("debes seleccionar un periodo");
      setColorAlert("danger");
      setStatusAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setColorAlert("");
        setStatusAlert(false);
      }, 3000);
    } else {
      // router.push(router.asPath + "/" + periodo + "/"+ url)
      // console.log(router.asPath + "/" + url + " PERIODO -  " + periodo)
      router.push(router.asPath + "/" + periodo + "/" + url);
    }
  };
  return (
    <Layout head={data[0]?.razonSocial?.toUpperCase()}>
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
      <br />
      {statusAlert && <Alertas descripcion={messageAlert} color="danger" />}

      <br />

      <div className="form-floating w-50">
        <select
          className="form-select"
          id="floatingSelect"
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option defaultValue={0}>Open this select menu</option>
          <option value={1}>Enero</option>
          <option value={2}>Febrero</option>
          <option value={3}>Marzo</option>
          <option value={4}>Abril</option>
          <option value={5}>Mayo</option>
          <option value={6}>Junio</option>
          <option value={7}>Julio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Septiembre</option>
          <option value={10}>Octubre</option>
          <option value={11}>Noviembre</option>
          <option value={12}>Diciembre</option>
        </select>
        <label htmlFor="floatingSelect">SELECCCIONA UN PERIODO</label>
      </div>
      <br />
      <br />
      <div className="container h-100">
        {cards &&
          cards.map((card) => {
            return (
              <div key={card.id}>
                <div className="card" style={{ width: "50rem" }} key={card.id}>
                  <div className="card-body">
                    <h5 className="card-title">{card.titulo}</h5>
                    <p className="card-text">{card.descripcion}</p>
                    {/* <Link href={`/dashboard/[id]/[periodo]`} as={`${router.asPath}/${periodo}`}> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => verificaPeriodo(card.link)}
                    >
                      Empezar
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
                <br />
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx?.query?.id;
  const json = await myGet("api/empresa/" + id, ctx);

  return { props: { data: json } };
}

export default index;
