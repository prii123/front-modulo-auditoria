import React from "react";
import Image from "next/image";

import { jsPDF } from "jspdf";
import header from "./header";
import asunto from "./asunto";
import body from "./body";

import img from '../../../public/ayc.jpg'
const pdfInformeVisita = ({ data }) => {
  // Default export is a4 paper, portrait, using millimeters for units

  const onClic = () => {
    var doc = new jsPDF();
    let startY;

    startY = header(doc, data.head);
    startY += 10;

    startY = asunto(doc, startY, data.asunto);
    startY += 20;

    startY = body(doc, startY, data.body);

    doc.save("Zest.pdf");
  };

  return (
    <div>
      <button onClick={onClic}>pdf</button>
      <Image
        src={img}
        alt="item.title"
        width="400"
        height="300"
      />
    </div>
  );
};

export default pdfInformeVisita;
