import React, { useState } from "react";
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import InformeVisita from "../../../../../libs/pdf/informeVisita/Informe";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import Alert from "../../../../../components/utiles/Alertas";

const informe = () => {
  const router = useRouter();

  const token = cookie.get("__session");
  const periodo = router.query?.periodo || 0;
  const idEmpresa = router.query?.id;

  const [datosInforme, setDatosInforme] = useState({});
  const [dataBolea, setDataBolea] = useState(false);


  const [mensajeError, setMensajeError] = React.useState("");
  const [statusMenssage, setStatusMenssage] = React.useState(false);
  const [mensajeColor, setMensajeColor] = React.useState("");


  const hanleClieckAgregarOtrasRtetenciones = () =>{
    const id = router?.query?.id
    const periodo = router?.query?.periodo;
  
    router.push(`/${libs.principalPage()}/${id}/${periodo}/informe/i-hallazgos`)
  }

  const preparar = async () => {
    const preparaInforme = await axios({
      method: "get",
      url:
        libs.location() +
        "api/prepara-informe-revision/" +
        idEmpresa +
        "/" +
        periodo,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if(preparaInforme.data.message == 'OK'){
      setStatusMenssage(true);
      setMensajeColor("success");
      setMensajeError("Informe Preparado.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    }else{
      setStatusMenssage(true);
      setMensajeColor("danger");
      setMensajeError(JSON.stringify(preparaInforme.data.message));
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    }

  };

  const generarDatosInforme = async () => {
    const res = await axios({
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

    const hallazgos = await axios({
      method: "get",
      url:
        libs.location() + "api/consulta-hallazgos/" + idEmpresa + "/" + periodo,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const hallazgosGenerales = await axios({
      method: "get",
      url:
        libs.location() + "api/hallazgos-generales/" + idEmpresa + "/" + periodo,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const info = {
      head: {
        fecha: libs.formatFechaLarga(new Date()),
        dirigido: res.data[0]?.razonSocial,
      },
      asunto: {
        asunto: "REVISIÓN DE LA INFORMACIÓN CONTABLE",
        delegado: res.data[0]?.username,
      },
      body: {
        periodo: res.data[0]?.periodo,
        documentos: res.data,
      },
      hallazgo: hallazgos?.data,
      hallazgosGenerales: hallazgosGenerales?.data
    };
    setDatosInforme(info);
    setDataBolea(true);
  };

  //

  return (
    <Layout head={<div>INFORMES</div>}>
      {statusMenssage && (
        <Alert descripcion={mensajeError} color={mensajeColor} />
      )}

      <button onClick={hanleClieckAgregarOtrasRtetenciones} className="btn">Agregar otras observaciónes</button>
      <br/>

      <button className="btn btn-primary" onClick={preparar}>
        Prepara/Actualizar
      </button>
      <br />
      <br />
      <button className="btn btn-primary" onClick={generarDatosInforme}>
        Generar
      </button>

      {dataBolea == true ? <InformeVisita nombre={'visualizar'} data={datosInforme} /> : null}
    </Layout>
  );
};

export default informe;
