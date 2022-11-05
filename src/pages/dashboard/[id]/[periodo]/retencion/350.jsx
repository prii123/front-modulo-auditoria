import React from "react";
import Layout from "../../../../../components/layout/Body";
import PDF from "../../../../../libs/pdf/formulario350/Informe";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Alert from '../../../../../components/utiles/Alertas'
const index = ({ formulario350 }) => {
  // console.log(formulario350[0])
  const router = useRouter();
  const token = cookie.get("__session");
  const idEmpresa = router.query.id;
  const periodo = router.query.periodo;

  const [mensajeError, setMensajeError] = React.useState("");
const [statusMenssage, setStatusMenssage] = React.useState(false);
const [mensajeColor, setMensajeColor] = React.useState("");


  const onClic = async () => {
    const totalRetencion = await axios({
      method: "get",
      url:
        libs.location() +
        `api/preparar-total-retencion/${idEmpresa}/${periodo}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(totalRetencion)
    if(totalRetencion.data.message == 'OK'){
      setStatusMenssage(true);
        setMensajeColor("alert-green");
        setMensajeError("Actualizado exitosamente.");
        setTimeout(() => {
          setStatusMenssage(false);
          router.reload()
        }, 2000);
    }else{
      setStatusMenssage(true);
        setMensajeColor("alert-red");
        setMensajeError('hubo un error');
        setTimeout(() => {
          setStatusMenssage(false);
        }, 2000);
    }
  };
  return (
    <Layout head={'Visualiza formulario 350 - retencion en la fuente'}>
      {statusMenssage && <Alert descripcion={mensajeError} color={mensajeColor} />}
      <button className="btn btn-ligth" onClick={onClic}>
        Actualizar
      </button>
      {formulario350.length > 0 ? (
        <>
          <PDF nombre={'Visualizar'} data={formulario350} />
        </>
      ) : (
        <>
          <div>No hay informacion</div>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const idEmpresa = ctx?.query.id;
  const periodo = ctx?.query.periodo;

  // console.log(periodo)

  const totalRetencion = await axios({
    method: "get",
    url:
      libs.location() + `api/consulta-total-retencion/${idEmpresa}/${periodo}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      formulario350: totalRetencion?.data,
    },
  };
}

export default index;
