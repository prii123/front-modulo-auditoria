import newPage from "./newPage";
const hallazgos = (doc, startY, hallazgo) => {
  doc.setFontSize(11);
  doc.text("Los Hallazgos encontrados fueron los siguientes", 10, startY);

  startY += 10;
  hallazgo.map(async (hall) => {
    doc.setFontSize(11);
    startY = newPage(doc, startY, 40);

    doc.text(
      "Tipo de documento: " + hall?.nombre.toUpperCase() + " numero " + hall?.numeroDoc,
      10,
      startY
    );
    startY += 5;
    doc.text("Hallazgo: " + hall?.hallazgo, 10, startY);
    startY += 5;
    doc.text("Accion Correctiva: " + hall?.accionCorrectiva, 10, startY);
    startY += 5;
    doc.setFontSize(8);
    doc.text("hallazgo creado en: " + hall?.created_at, 10, startY);

    startY += 15;

    // doc.line(10, startY, 190, startY);
    // startY += 15;
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
