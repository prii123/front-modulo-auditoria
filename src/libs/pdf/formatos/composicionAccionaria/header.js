import libs from "../../../../libs/util"

// ----------------------------------------------------- HEADER ------------------------------------
const header = (doc, img, startY) => {


  doc.setFontSize(12);

  startY = 20
  //doc.addImage(img, "JPEG", 130, 10, 60, 40);
  doc.setFontSize(10);
  // doc.text(libs.formatFechaLarga(new Date()), 20, startY);

  return startY;

};


export default header;
