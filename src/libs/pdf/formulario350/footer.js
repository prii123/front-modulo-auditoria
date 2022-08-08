import libs from '../../../libs/util'
const footer = (doc, total) => {
  doc.setFontSize(12);
  doc.setFont("courier", "bold");
  doc.text( total ? "Toral Retencion: " + libs.formatNumber(total).toString() : "0", 198, 210, {align: "right"});


};

export default footer;
