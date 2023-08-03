import React from "react";
import { jsPDF } from "jspdf";
import libs from '../../../util'
import Firmas from './firmas'
import header from "./header";
import body from "./body";



// ----------------------------------------------------- PDF  ------------------------------------

const PdfComposicionAccionaria = ({ data }) => {


  const onClic = async () => {

    const img = await libs.urlImgBase64(data?.logo);
    const firma = await libs.urlImgBase64(data?.firma1)

    var texto = "Que el Capital de la sociedad LOS MEJORES JUGUETES SAS, con NIT 901.324.391 -4 al dia 21 de julio del año 2023, " +
      "segun reposa en libros de contabilidad, esta compuesto de la siguiente forma:"

    var capital = {
      autorizado: {valor:100000000, acciones:100000, nominal:1000},
      suscrito: {valor:20000000, acciones:2000, nominal:1000},
      pagado: {valor:20000000, acciones:2000, nominal:1000}
    }

    var socios = [
      {
        nombre:"brayan obilmer vallejos mueses",
        acciones: 500,
      },
      {
        nombre:"brayan obilmer vallejos mueses",
        acciones: 700,
      },
      {
        nombre:"brayan obilmer vallejos mueses",
        acciones: 800,
      }
    ]





    var doc = new jsPDF();
    let startY;
    startY = 5


    startY = header(doc, img, startY);
    startY += 10;
    startY = body(doc, startY, texto, capital, socios);
    startY += 10;

    Firmas(doc, startY, firma, data?.nombreFirma, data?.ccFirma, data?.cargoFirma, data?.telefonoFirma, data?.direccionFirma)

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

export default PdfComposicionAccionaria;
