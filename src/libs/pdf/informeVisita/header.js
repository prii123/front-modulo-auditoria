
const header = (doc, data) => {
  let startY = 5;
//configuracion de letra e imagen
  const url = "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg";
  doc.setFont('courier','normal');
  doc.setFontSize(11);


  doc.addImage(url, "JPEG", 120, startY, 82, 46, "medium");
  startY += 5;
  doc.text(data?.fecha, 10, startY); //10
  startY += 30;
  doc.text("Señor(es):", 10, startY); // 41
  startY += 5;
  doc.setFont('courier','bold');
  doc.text(data?.dirigido, 10, startY); // 46
  doc.setFont('courier','normal');
  startY += 5;
  doc.text("La Ciudad", 10, startY);
  startY += 5;

  return startY;
};

export default header;
