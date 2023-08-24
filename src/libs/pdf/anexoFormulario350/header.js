
const header = (doc, data) => {
  let startY = 5;
//configuracion de letra e imagen
  const url = "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg";
  doc.setFont('courier','normal');
  doc.setFontSize(11);


  doc.addImage(url, "JPEG", 120, startY, 82, 46, "medium");
  // startY += 5;

  startY += 10;
  doc.text("Señor(es):", 10, startY); // 41
  startY += 5;
  doc.setFont('courier','bold');
  doc.text(data[0]?.razonSocialEmpresa + " - " + data[0]?.nitEmpresa, 10, startY); // 46
  doc.setFont('courier','normal');
  startY += 5;
  doc.text("La Ciudad", 10, startY);
  startY += 25;

  doc.text("ANEXO A LA DECLARACION DE RETENCION EN LA FUENTE " + data[0].periodo, 10, startY);

  return startY;
};

export default header;
