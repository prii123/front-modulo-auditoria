import newPage from "../newPage";
import libs from '../../util'
const body = (doc, startY, body) => {
  // console.log(body)
  doc.setFontSize(11);
  startY += 15;



  startY = newPage(doc, startY, 40);
  doc.setFont('courier','bold');
  doc.text('NIT', 20, startY,  { align: "left" });
  doc.text('RAZON SOCIAL', 38, startY, );
  doc.text('DOC', 80, startY);
  doc.text('# FE', 94, startY);
  doc.text('CONCEPTO', 118, startY);
  doc.text('BASE', 165, startY, { align: "right" });
  doc.text('RETENCION', 200, startY, { align: "right" });
  doc.setFont('courier','normal');
  startY += 5;

  body.sort()
  body?.map((anexo) => {
    // console.log(anexo)
    startY += 5;
    startY = newPage(doc, startY, 40);
    doc.text(libs.formatNumber(anexo?.documento).toString(), 35, startY, { align: "right" });
    let rz = doc.splitTextToSize(anexo?.razon_social?.toString(), 40);

    doc.text(rz[0], 38, startY);
    doc.text(anexo?.nroCuenta?.toString() || '-', 80, startY);
    doc.text(anexo?.nroFactura?.toString() || '-', 94, startY);

    doc.text(anexo?.concepto?.substr(0, 14)?.toString() || '-', 118, startY);
    doc.text(libs.formatNumber(anexo?.netoGv).toString() || '-', 175, startY, { align: "right" });
    doc.text(libs.formatNumber(anexo?.retRenta).toString() || '-', 200, startY, { align: "right" });
  });

  startY += 5;

  return startY;
};

export default body;
