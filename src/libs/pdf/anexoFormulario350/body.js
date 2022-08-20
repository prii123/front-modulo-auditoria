import newPage from "../newPage";
import libs from '../../util'
const body = (doc, startY, body) => {
  // console.log(body)
  doc.setFontSize(11);
  startY += 15;

  body?.map((anexo) => {
    startY += 5;
    startY = newPage(doc, startY, 40);
    doc.text(libs.formatNumber(anexo?.nit).toString(), 35, startY, {align: "right"});
    let rz = doc.splitTextToSize(anexo?.razonSocial.toString(), 40);

    doc.text(rz[0], 38, startY);
    doc.text(anexo?.numeroDoc?.toString() || '-', 80, startY);
    doc.text(anexo?.numeroFE?.toString() || '-', 94, startY);
    doc.text(anexo?.concepto?.toString() || '-', 118, startY);
    doc.text(libs.formatNumber(anexo?.base).toString() || '-', 175, startY, {align: "right"});
    doc.text(libs.formatNumber(anexo?.valor).toString() || '-', 200, startY, {align: "right"});
  });

  startY += 5;

  return startY;
};

export default body;
