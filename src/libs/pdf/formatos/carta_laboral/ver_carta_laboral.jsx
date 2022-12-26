import React from "react";
import { jsPDF } from "jspdf";
import libs from '../../../util'


import header from "./header";
import body from "./body";


const PdfCartaLaboral = () => {
  // Default export is a4 paper, portrait, using millimeters for units




  const onClic = async () => {

    const img1 = await libs.urlImgBase64("https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg")
    const img2 = await libs.urlImgBase64("https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg")

    var doc = new jsPDF();
    let startY;

    startY = header(doc, img1, img2);
    startY += 10;
    // startY = body(doc, startY);
    startY += 10;


    // doc.save("InformeVisita.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <button className="btn-personalizado" onClick={onClic}>
        {'ver'}
      </button>
    </div>
  );
};

export default PdfCartaLaboral;
