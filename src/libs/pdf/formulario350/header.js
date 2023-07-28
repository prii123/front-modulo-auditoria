import logo from "./logos/logo";
import logo2 from "./logos/logo2"
const header = (doc, data) => {
  let startY = 5;
  //configuracion de letra e imagen
  logo(doc)
  logo2(doc)


  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setDrawColor("#9DB49C", 0, 0);

  const fecha = data.periodo.split("-")

  // console.log(doc.getFontList())

  //lineas Horizontales
  doc.line(10, 10, 200, 10);

  // doc.addImage('../../../public/ayc.jpg', "JPEG", 10, 12, 46, 14, "medium");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Declaracion de Retencion en la Fuente", 65, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // doc.addImage(logoFormulario, "JPEG", 163, 12, 36, 14, "medium");

  //año de la retencion
  doc.setFontSize(8);
  doc.text("1. Año ", 13, 32);
  doc.setFontSize(11);
  doc.text(fecha[0], 28, 32); // año que se practica la retencion   &&&&&&&&&&&
  doc.line(26, 27, 46, 27); //linea horizontal
  doc.line(26, 27, 26, 33); // vertical
  doc.line(26, 33, 46, 33); // linea horizontal
  doc.line(46, 27, 46, 33); //vertical

  doc.line(105, 25, 105, 75); // divide la cavecera
  doc.setFontSize(8);
  doc.text("3. Periodo ", 75, 32);
  doc.setFontSize(11);
  doc.text(fecha[1], 95, 32); // periodo que se practica la retencion  &&&&&&&&&&&
  doc.line(90, 27, 103, 27); // horizontal
  doc.line(103, 27, 103, 33); // vertical
  doc.line(90, 33, 103, 33); // horizontal
  doc.line(90, 27, 90, 33); // vertical

  doc.setFontSize(14);
  doc.setTextColor("#D8DBD8");
  doc.text("POR UNA COLOMBIA MAS HONESTA", 13, 60);
  doc.line(13, 62, 95, 62);

  //CUADRICULA 2
  doc.setFontSize(8);
  doc.setTextColor("#000000");
  doc.text("4. Numero de formulario ", 108, 35);
  doc.setFontSize(11);

  doc.setFontSize(8);
  doc.text("5. Numero de Identificacion Tributaria (NIT): ", 17, 80);
  doc.setFontSize(11);
  doc.text(data?.nit, 75, 80); // nit                             &&&&&&&&&&&&&&&
  doc.setFontSize(8);
  doc.text("11. Razon Social: ", 17, 90);
  doc.setFontSize(11);
  doc.text(data?.razonSocial, 45, 90); // razon social &&&&&&&&&&&&&
  doc.setFontSize(8);
  doc.line(10, 25, 200, 25);
  doc.line(10, 75, 200, 75);
  doc.line(15, 85, 200, 85);

  doc.setFontSize(8);
  doc.text(
    "Si es una correccion indique:  25. Cod.     26. No. Formulario anterior             96. Autorretenedores personas juridicas exonerados",
    11,
    98
  );
  doc.setFont("helvetica", "bold");
  doc.text("A titulo de impuesto sobre la renta y complementario", 65, 104);

  doc.text("concepto", 46, 108);
  doc.text("Base sujeta a retencion", 117, 108);
  doc.text("Retenciones", 165, 108);


  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.line(10, 95, 200, 95);
  doc.line(10, 100, 200, 100);
  doc.line(10, 105, 200, 105);
  doc.line(10, 110, 200, 110);

  doc.line(10, 290, 200, 290);

  //lineas verticales
  doc.line(10, 10, 10, 290);
  doc.line(15, 75, 15, 95);
  doc.line(200, 10, 200, 290);

  // doc.text("data?.fecha", 10, startY); //10
  startY += 30;

  return startY;
};

export default header;
