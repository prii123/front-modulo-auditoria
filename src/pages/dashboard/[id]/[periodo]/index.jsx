import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout/Body";
import { myGet } from "../../../../libs/fetchApi";
import BotonRegresar from "../../../../components/utiles/BotonRegresar";
import Alertas from "../../../../components/utiles/Alertas";

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
      setMessageAlert("La url esta mal.");
      setColorAlert("danger");
      setStatusAlert(true);
      setTimeout(() => {
        setMessageAlert("");
        setColorAlert("");
        setStatusAlert(false);
      }, 3000);
    } else {
      // onClick={()=> router.push(router.asPath + "/modificar")}
      // console.log(router.asPath + "/" + url + " PERIODO -  " + periodo)
      router.push(router.asPath + "/" + url);
    }
  };

  const Cabecera = () => {
    return (
      <>
        <>{data[0]?.razonSocial?.toUpperCase() + "   "}</>
      </>
    );
  };
  return (
    <Layout head={<Cabecera />} >
      {statusAlert && <Alertas descripcion={messageAlert} color="danger" />}

      <br />
      <br />
      <div className="row">
        {cards &&
          cards.map((card) => {
            return (
              <div key={card.id} className="col-6">
                <div className="card" key={card.id}>
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
