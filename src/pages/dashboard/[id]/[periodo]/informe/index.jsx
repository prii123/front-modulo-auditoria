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


  const hanleClieckAgregarOtrasRtetenciones = () => {
    const id = router?.query?.id
    const periodo = router?.query?.periodo;

    router.push(`/${libs.principalPage()}/${id}/${periodo}/informe/i-hallazgos`)
  }

  const preparar = async () => {
    const preparaInforme = await axios({
      method: "get",
      url:
        libs.location() +
        "/informes/preparar/" +
        idEmpresa +
        "/" +
        periodo,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });


    if (preparaInforme.status == 200) {
      setStatusMenssage(true);
      setMensajeColor("alert-green");
      setMensajeError("Informe Preparado.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError(JSON.stringify('Hay un error'));
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
        "/informes/consultar/" +
        idEmpresa +
        "/" +
        periodo,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // console.log(res)

    const hallazgos = await axios({
      method: "get",
      url:
        libs.location() + "/hallazgos/" + periodo + "/" + idEmpresa,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const hallazgosGenerales = await axios({
      method: "get",
      url:
        libs.location() + "/hallazgos/generales/" + periodo + "/" + idEmpresa,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const info = {
      head: {
        fecha: libs.formatFechaLarga(new Date()),
        dirigido: res.data[0]?.razonSocial,
        logo: await libs.urlImgBase64("https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg")
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
      <br />

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
