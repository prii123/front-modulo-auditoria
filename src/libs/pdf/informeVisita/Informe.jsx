import React from "react";
import Image from "next/image";

import { jsPDF } from "jspdf";
import header from "./header";
import asunto from "./asunto";
import body from "./body";
import hallazgos from "./hallazgos";

const pdfInformeVisita = ({ data, nombre }) => {



  const onClic = () => {
    var doc = new jsPDF();
    let startY;

    startY = header(doc, data?.head);
    startY += 10;

    startY = asunto(doc, startY, data?.asunto);
    startY += 20;

    startY = body(doc, startY, data?.body);
    startY += 10;

    startY = hallazgos(doc, startY, data?.hallazgo,  data?.hallazgosGenerales);

    // doc.save("InformeVisita.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <button className="btn-personalizado" onClick={onClic}>
        {nombre}
      </button>
      {/* <Image src={img} alt="item.title" width="400" height="300" /> */}
    </div>
  );
};

export default pdfInformeVisita;
