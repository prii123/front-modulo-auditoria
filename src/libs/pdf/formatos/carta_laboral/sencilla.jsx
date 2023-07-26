import React from "react";
import { jsPDF } from "jspdf";
import libs from '../../../util'
import Firmas from './firmas'
import header from "./header";
import body from "./body";



// ----------------------------------------------------- PDF  ------------------------------------

const PdfCartaLaboral = ({ data }) => {



  const onClic = async () => {

    const img = await libs.urlImgBase64(data.logo);
    const firma = await libs.urlImgBase64(data.firma1)

    var texto = "Me permito certificar que el señor(a) " + data?.nombre +
      " identificado con CC " + libs.formatNumber(data?.cedula) + " de " + data?.municipio + " presta sus servicios en la empresa " + data?.empresa +
      " identificada con NIT " + libs.formatNumber(data?.nit) + "-" + data?.dv + ". Actualmente se desempeña como " + data?.cargo + ", labora con nosotros desde " + data?.desde +
      " y devenga un salario mensual de ($" + libs.formatNumber(data?.salario) + ".00) " + libs.numeroALetras(data?.salario) + ". Su contrato de trabajo es " + data?.contrato + ". "


    var doc = new jsPDF();
    let startY;
    startY = 5


    startY = header(doc, img, startY);
    startY += 10;
    startY = body(doc, startY, texto);
    startY += 10;

    Firmas(doc, startY, firma, data.nombreFirma, data.ccFirma, data.cargoFirma, data.telefonoFirma, data.direccionFirma)

    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <button className="btn-personalizado" onClick={onClic}>
        <i className="fas fa-eye"></i>
      </button>
    </div>
  );
};

export default PdfCartaLaboral;
