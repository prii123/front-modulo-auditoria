import React from "react";
import { jsPDF } from "jspdf";
import libs from '../../../util'


// ----------------------------------------------------- HEADER ------------------------------------
const header = (doc, img, startY) => {

  doc.setFontSize(12);

  startY = 50
  doc.addImage(img, "JPEG", 130, 10, 60, 40);
  doc.setFontSize(10);
  doc.text("Medellin, octubre 23 de 2023", 20, startY);
  startY += 20
  doc.text("Señores:", 20, startY);
  startY += 5
  doc.text("A QUIEN INTERESE", 20, startY);
  startY += 5
  doc.text("La ciudad", 20, startY);
  startY += 20
  return startY;

};



// ----------------------------------------------------- BODY  ------------------------------------
const body = (doc, startY, texto) => {

  doc.setFontSize(12);

  const maxWidth = 170; // Maximum width of the text box
  const lineHeight = 5; // Height between lines

  // Split the text into lines based on the maxWidth
  const lines = doc.splitTextToSize(texto, maxWidth);

  // Calculate the total height needed for the justified text
  const totalHeight = lines.length * lineHeight;

  // Calculate the starting Y position to center the text vertically
  const paddingTop = (250 - totalHeight) / 2;

  const textY = startY //+ paddingTop;

  // Render each line with doc.text
  lines.forEach((line, index) => {
    doc.text(line, 20, textY + index * lineHeight);
  });

  return startY + 10; // Adjust the vertical position for the next element
};




// ----------------------------------------------------- PDF  ------------------------------------

const PdfCartaLaboral = () => {

  const data = {
    nombre: "BRAYAN OBILMER VALLEJOS MUESES",
    cedula: "1085306970",
    municipio: "PASTO",
    empresa: "ANALISIS Y CONSULTORIAS SAS",
    nit: "811006790",
    dv: "2",
    cargo: "CONTADOR",
    desde: "01 DE AGOSTO DE 1993",
    salario: "2400000",
    salarioLetras: "DOS MILLONES CUATROCIENTOS MILES PESOS",
    contrato: "TERMINO INDEFINIDO"
  }

  const onClic = async () => {
    const img = await libs.urlImgBase64(
      "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg"
    );

    var texto = "Me permito certificar que el señor(a) " + data?.nombre +
      " identificado con CC " + data?.cedula + " de " + data?.municipio + " presta sus servicios en la empresa " + data?.empresa +
      " identificada con NIT " + data?.nit + "-" + data?.dv + ". Actualmente se desempeña como " + data?.cargo + ", labora con nosotros desde " + data?.desde +
      " y devenga un salario mensual de ($" + data?.salario + ".00) " + data?.salarioLetras + ". Su contrato de trabajo es " + data?.contrato + ". "



    var doc = new jsPDF();
    let startY;
    startY = 5


    startY = header(doc, img, startY);
    startY += 10;
    startY = body(doc, startY, texto);
    startY += 10;

    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <button className="btn-personalizado" onClick={onClic}>
        {'carta laboral'}
      </button>
    </div>
  );
};

export default PdfCartaLaboral;
