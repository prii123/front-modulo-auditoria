import React from "react";
import Image from "next/image";

import { jsPDF } from "jspdf";
import header from "./header";
import footer from "./footer";
import detalle from "./detalle";

import img from "../../../public/ayc.jpg";
const pdfInformeVisita = ({ data }) => {
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
      <button className="btn btn-primary" onClick={onClic}>
        Visualizar
      </button>
      <Image src={img} alt="item.title" width="400" height="300" />
    </div>
  );
};

export default pdfInformeVisita;
