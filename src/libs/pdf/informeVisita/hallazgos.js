import newPage from "../newPage";
const hallazgos = (doc, startY, hallazgo) => {
  //configuracion del documento
  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  doc.setFont("courier", "bold");
  doc.text("SECCION DE HALLAZGOS Y PROCEDIMIENTO A SEGUIR :", 10, startY);
  doc.setFont("courier", "normal");
  startY += 10;
  hallazgo.map(async (hall) => {
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
      "Tipo de documento: " +
        hall?.nombre.toUpperCase() +
        " numero " +
        hall?.numeroDoc,
      10,
      startY
    );
    doc.setFont("courier", "normal");
    startY += 5;

    // let lines = doc.splitTextToSize("Hallazgo: " + hall?.hallazgo, 190)
    doc.text(hallazgo, 10, startY);
    startY += 5 * hallazgo.length;

    startY = newPage(doc, startY, 40);

    doc.text(accionCorrectiva, 10, startY);
    startY += 5 * accionCorrectiva.length;

    doc.setFontSize(8);
    doc.text("hallazgo creado en: " + hall?.created_at, 10, startY);

    startY += 10;
  });

  // console.log(startY)

  //   const pageHeight = doc.internal.pageSize.height;
  //   console.log(pageHeight)

  // body.documentos.forEach((element) => {
  //   doc.text(doc.nombre, 10, startY);
  //   startY += 5;
  // });

  startY += 5;

  return startY;
};

export default hallazgos;
