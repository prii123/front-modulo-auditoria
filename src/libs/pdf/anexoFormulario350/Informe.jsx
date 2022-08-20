import React from "react";
import { jsPDF } from "jspdf";
import header from "./header";
import body from "./body";

const pdfInformeVisita = ({ data, nombre }) => {
  // Default export is a4 paper, portrait, using millimeters for units

  const onClic = () => {
    var doc = new jsPDF();
    let startY;

    startY = header(doc, data);
    startY += 10;
    startY = body(doc, startY, data);
    startY += 10;


    // doc.save("InformeVisita.pdf");
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
