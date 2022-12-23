import newPage from "../newPage";
import libs from '../../util'
const body = (doc, startY, body) => {
  let mesNumero = parseInt(body?.periodo?.split("-")[1]);
  let annio = body?.periodo?.split("-")[0];
  let mesLetras = libs?.meses(mesNumero);
  doc.setFontSize(11);
  doc.text(
    "AUDITORÍA DEL PROCESOS CONTABLE DEL PERIODO " + mesLetras?.toUpperCase() + " DE " + annio,
    10,
    startY 
  );
  startY += 5;
  doc.text("AUDITORIA DE LOS DOCUMENTOS FUENTE", 10, startY);
  startY += 25;

  body.documentos.map(async (documentosFuente) => {
    startY = newPage(doc, startY, 40);
    doc.setFont('courier','normal');

    doc.setFont('courier','bold');
    doc.text(documentosFuente?.nombre?.toUpperCase(), 10, startY);
    doc.setFont('courier','normal');
    startY += 7;

    let informe = doc.splitTextToSize(
      "Se revisó la facturación del mes "+ mesLetras +" desde el consecutivo número " +
        documentosFuente?.valMin +
        " hasta el consecutivo número " +
        documentosFuente?.valMax +
        ".",
      190
    );
    
    doc.text(informe, 10, startY);
    startY += 5 * informe.length;

    doc.line(10, startY, 190, startY);

    startY += 10;
  });


  startY += 5;

  return startY;
};

export default body;
