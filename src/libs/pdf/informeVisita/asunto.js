const asunto = (doc, startY, asunto) => {
  doc.setFontSize(11);
  doc.setFont("courier", "bold");
  doc.text("ASUNTO: " + asunto?.asunto, 10, startY);
  startY += 5;
  doc.text("ANÁLISIS Y CONSULTORIAS SAS", 10, startY);
  startY += 5;
  doc.text("GESTOR: " + asunto?.delegado, 10, startY);

  startY += 5;

  return startY;
};

export default asunto;
