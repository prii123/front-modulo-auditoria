import newPage from "./newPage";
const body = (doc, startY, body) => {
  doc.setFontSize(11);
  doc.text(
    "AUDITORÍA DEL PROCESOS CONTABLE DEL PERIODO " + body.periodo + " : ",
    10,
    startY
  );
  startY += 5;
  doc.text("AUDITORIA DE LOS DOCUMENTOS FUENTE", 10, startY);
  startY += 25;


  body.documentos.map(async (documentosFuente) => {
    startY =  newPage(doc, startY, 40);

    doc.text(documentosFuente.nombre.toUpperCase(), 10, startY);
    startY += 7;
    doc.text(
      "Se revisó la facturación del mes Junio desde el consecutivo número " +
        documentosFuente.valMin +
        " hasta el consecutivo número " +
        documentosFuente.valMax +
        ".",
      10,
      startY
    );
    startY += 5;

    doc.line(10, startY, 190, startY);

    startY += 15;
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

export default body;
