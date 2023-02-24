import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";
import BotonRegresar from "../../../components/utiles/BotonRegresar";
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
    titulo: "Retencion en la Fuente",
    descripcion: "Genera la retencion en la fuente a titulo de renta",
    link: "retencion",
  },
  {
    id: 3,
    titulo: "Informes",
    descripcion: "Realiza tu informe de auditoria",
    link: "informe",
  },
  {
    id: 4,
    titulo: "Importar Datos",
    descripcion: "Importa tus datos",
    link: "importacion",
  },
];
const index = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [periodo, setPeriodo] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [statusAlert, setStatusAlert] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messageAlert, setMessageAlert] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [colorAlert, setColorAlert] = useState("");
  // console.log(router.asPath + "/" + periodo)


  const verificaPeriodo = () => {

    if(periodo){
      router.push(router.asPath + "/" + periodo);
    }else{
      setMessageAlert("Seleccione un periodo");
      setColorAlert("danger");
      setStatusAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setColorAlert("");
        setStatusAlert(false);
      }, 3000);
    }


    };

  const Cabecera = () => {
    return (
      <>
        <>{data[0]?.razonSocial?.toUpperCase() + "   "}</>
        <button className="btn btn-ligth " onClick={()=> router.push(router.asPath + "/modificar")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="white"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
      </>
    );
  };
  return (
    <Layout head={<Cabecera />} btnRegresar={<BotonRegresar />}>
      {statusAlert && <Alertas descripcion={messageAlert} color="danger" />}

      <br />

      <input
        id="perAuditado"
        type={"month"}
        onChange={(e) => setPeriodo(e.target.value)}
        style={{ height: "3rem", borderColor: "white" }}
      />
    <br/>
    <br/>
    <button onClick={verificaPeriodo} className="btn btn-primary">Ir al periodo</button>

    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx?.query?.id;
  const json = await myGet("/empresas/" + id, ctx);

  return { props: { data: json?.data } };
}

export default index;
