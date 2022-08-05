
const header = (doc, data) => {
  let startY = 5;
  //   const url =
  //     "https://as1.ftcdn.net/v2/jpg/02/96/06/10/1000_F_296061090_pSkvbdCXVhpgZWyV7Udxbr9XcwlitBwZ.jpg";
  const url = "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg";


  doc.setFontSize(11);
  doc.addImage(url, "JPEG", 120, startY, 82, 46, "medium");
  startY += 5;
  doc.text(data?.fecha, 10, startY); //10
  startY += 30;
  doc.text("Señor(es):", 10, startY); // 41
  startY += 5;
  // doc.setFontType("bolditalic");
  doc.text(data?.dirigido, 10, startY); // 46
  startY += 5;
  doc.text("La Ciudad", 10, startY);
  startY += 5;

  return startY;
};

export default header;
