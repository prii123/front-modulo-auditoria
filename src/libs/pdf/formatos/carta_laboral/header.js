import libs from '../../../util'



const header = async (doc, img1, img2) => {


  
  
  const url = "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg"
  let startY = 5;

  doc.setFont('courier', 'normal');
  doc.setFontSize(11);

 
  // console.log(ff)


  // console.log(imagen_logo_superior)
  doc.addImage(img1, "JPEG", 120, startY, 82, 46, "medium");
  doc.addImage(img2, "JPEG", 120, startY+50, 82, 46, "medium");
  // await doc.addImage(imagen_logo_superior, "JPEG", 120, startY+100, 82, 46, "medium");
  // startY += 5;

  startY += 10;
  doc.text("Señor(es):", 10, startY); // 41
  startY += 5;
  doc.setFont('courier', 'bold');
  doc.text('data[0]?.empresa?.razonSocial' + " - " + 'data[0]?.empresa?.nit', 10, startY); // 46
  doc.setFont('courier', 'normal');
  startY += 5;
  doc.text("La Ciudad", 10, startY);
  startY += 25;

  doc.text("ANEXO A LA DECLARACION DE RETENCION EN LA FUENTE " + 'data[0].periodo', 10, startY);

  return startY;
};

export default header;
