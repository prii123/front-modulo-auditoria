import newPage from "../newPage";
const hallazgos = (doc, startY, hallazgo, hallazgosGenerales) => {
  //configuracion del documento
  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  if (hallazgo) {
    doc.setFont("courier", "bold");
    doc.text("SECCION DE HALLAZGOS Y PROCEDIMIENTO A SEGUIR :", 10, startY);
    doc.setFont("courier", "normal");
    startY += 10;

  }

  hallazgo.map(async (hall, key) => {
    //configuracion del documento
    doc.setFontSize(11);
    doc.setFont("courier", "normal");

    startY = newPage(doc, startY, 40);

    let hallazgo = doc.splitTextToSize("Hallazgo: " + hall?.hallazgo, 190);

    let accionCorrectiva = doc.splitTextToSize(
      "Accion Correctiva: " + hall?.accionCorrectiva,
      190
    );
    doc.setFont("courier", "bold");
    doc.text(
      key +
      1 +
      ") " +
      "Tipo de documento: " +
      hall?.nombre?.toUpperCase() +
      " numero " +
      hall?.numeroDoc,
      10,
      startY
    );
    doc.setFont("courier", "normal");
    startY += 5;

    // let lines = doc.splitTextToSize("Hallazgo: " + hall?.hallazgo, 190)
    doc.text(hallazgo, 10, startY);
    startY += 5 * hallazgo?.length;

    startY = newPage(doc, startY, 40);

    doc.text(accionCorrectiva, 10, startY);
    startY += 5 * accionCorrectiva?.length;

    doc.setFontSize(7);
    doc.text("hallazgo creado en: " + hall?.created_at, 10, startY);

    startY += 10;
  });








  startY += 5;

  if (hallazgosGenerales) {
    doc.setFont("courier", "bold");
    doc.setFontSize(11);
    doc.text("ANOTACIONES GENERALES", 10, startY);
    startY += 10;
    doc.setFont("courier", "normal");
  }



  hallazgosGenerales?.map(async (hal, key) => {
    //configuracion del documento
    doc.setFontSize(11);
    doc.setFont("courier", "normal");

    startY = newPage(doc, startY, 40);

    let hallazgo = doc.splitTextToSize(hal?.hallazgo, 180);
    // (key + 1) + ") " + 
    doc.text((key + 1) + ")", 10, startY);
    doc.text(hallazgo, 15, startY);
    startY += 5 * hallazgo.length;

    doc.setFontSize(7);
    doc.text("hallazgo creado en: " + hal?.created_at, 10, startY);

    startY += 10;
  });

  return startY;
};

export default hallazgos;
