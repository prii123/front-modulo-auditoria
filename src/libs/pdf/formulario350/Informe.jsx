import React from "react";
import Image from "next/image";

import { jsPDF } from "jspdf";
import header from "./header";
import footer from "./footer";
import detalle from "./detalle";

const pdfInformeVisita = ({ data, nombre }) => {

  let totalRetencion = 0;

  data.map((retencion) => {
    totalRetencion += retencion?.valor;
  });

  // console.log(totalRetencion)

  const onClic = () => {
    var doc = new jsPDF();

    header(doc, data[0]);

    detalle(doc, data);
    footer(doc, totalRetencion);

    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <button className="btn-personalizado" onClick={onClic}>
        {nombre}
      </button>
    </div>
  );
};

export default pdfInformeVisita;
