

// ----------------------------------------------------- HEADER ------------------------------------
const header = (doc, img, startY) => {

  doc.setFontSize(12);

  startY = 50
  doc.addImage(img, "JPEG", 130, 10, 60, 40);
  doc.setFontSize(10);
  doc.text("Medellin, octubre 23 de 2023", 20, startY);
  startY += 20
  doc.text("Señores:", 20, startY);
  startY += 5
  doc.text("A QUIEN INTERESE", 20, startY);
  startY += 5
  doc.text("La ciudad", 20, startY);
  startY += 20
  return startY;

};


export default header;
