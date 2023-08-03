import newPage from "../../newPage";
import libs from '../../../util'



// ----------------------------------------------------- BODY  ------------------------------------
const body = (doc, startY, texto, capital, socios) => {

  doc.setFontSize(11);

  const maxWidth = 170; // Maximum width of the text box
  const lineHeight = 5; // Height between lines


  // Split the text into lines based on the maxWidth
  const lines = doc.splitTextToSize(texto, maxWidth);

  // Calculate the total height needed for the justified text
  const totalHeight = lines.length * lineHeight;

  // Calculate the starting Y position to center the text vertically
  const paddingTop = (250 - totalHeight) / 2;

  const textY = startY //+ paddingTop;

  // Render each line with doc.text
  lines.forEach((line, index) => {
    doc.text(line, 20, textY + index * lineHeight);
  });




  startY += 20;

  var textoStart = 20
  var startX = 20;
  var pageWidth = 170;
  var columnWidth = pageWidth / 4; // Dividimos en 4 columnas
  var rowHeight = 6; // Ajustamos la altura de las filas para tener espacio para las líneas

  function drawTableLine() {
    for (var i = 0; i <= 4; i++) {
      doc.line(startX, startY + i * rowHeight, startX + pageWidth, startY + i * rowHeight); // Línea horizontal entre filas
    }

    doc.line(startX, startY, startX, startY + 4 * rowHeight); // Línea vertical izquierda
    doc.line(startX + pageWidth, startY, startX + pageWidth, startY + 4 * rowHeight); // Línea vertical derecha
    doc.line(startX, startY, startX + pageWidth, startY); // Línea horizontal superior
    doc.line(startX, startY + 4 * rowHeight, startX + pageWidth, startY + 4 * rowHeight); // Línea horizontal inferior

    doc.line(startX + columnWidth, startY, startX + columnWidth, startY + 4 * rowHeight); // Línea vertical entre la 1ª y 2ª columna
    doc.line(startX + 2 * columnWidth, startY, startX + 2 * columnWidth, startY + 4 * rowHeight); // Línea vertical entre la 2ª y 3ª columna
    doc.line(startX + 3 * columnWidth, startY, startX + 3 * columnWidth, startY + 4 * rowHeight); // Línea vertical entre la 3ª y 4ª columna
  }

  function drawCell(text, x, y, alineacion) {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textX = x - textWidth / 2;
    var textY = y + doc.internal.getLineHeight() / 2.5;
    doc.text(text, textX, textY, alineacion && { align: alineacion });
  }

  drawTableLine();

  // -------------------------------------------------- capital ----------------------

  startX += 10
  // Encerrando los textos en celdas
  drawCell(" ", startX + 0.7 * columnWidth, startY + 0.001 * (rowHeight - 2), "center");
  drawCell("CAPITAL", startX + 1.5 * columnWidth, startY + 0.001 * (rowHeight - 2), "center");
  drawCell("NO. ACCIONES", startX + 2.5 * columnWidth, startY + 0.001 * (rowHeight - 2), "center");
  drawCell("NOMINAL", startX + 3.5 * columnWidth, startY + 0.001 * (rowHeight - 2), "center");
  startY += 5;

  // Encerrando los textos en celdas
  drawCell("AUTORIZADO", startX + 0.7 * columnWidth, startY + 0.001 * (rowHeight - 2), "center");
  drawCell(libs.formatNumber(capital?.autorizado.valor).toString(), startX + 1.5 * columnWidth, startY + 0.001 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.autorizado.acciones).toString(), startX + 2.5 * columnWidth, startY + 0.001 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.autorizado.nominal).toString(), startX + 3.5 * columnWidth, startY + 0.001 * (rowHeight), "center");
  startY += 5;

  // Encerrando los textos en celdas
  drawCell("SUSCRITO", startX + 0.7 * columnWidth, startY + 0.2 * (rowHeight - 2), "center");
  drawCell(libs.formatNumber(capital?.suscrito.valor).toString(), startX + 1.5 * columnWidth, startY + 0.2 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.suscrito.acciones).toString(), startX + 2.5 * columnWidth, startY + 0.2 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.suscrito.nominal).toString(), startX + 3.5 * columnWidth, startY + 0.2 * (rowHeight), "center");
  startY += 5;

  // Encerrando los textos en celdas
  drawCell("PAGADO", startX + 0.7 * columnWidth, startY + 0.4 * (rowHeight - 2), "center");
  drawCell(libs.formatNumber(capital?.pagado.valor).toString(), startX + 1.5 * columnWidth, startY + 0.4 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.pagado.acciones).toString(), startX + 2.5 * columnWidth, startY + 0.4 * (rowHeight), "center");
  drawCell(libs.formatNumber(capital?.pagado.nominal).toString(), startX + 3.5 * columnWidth, startY + 0.4 * (rowHeight), "center");

  startY += 20;
  doc.text("Que dicho capital pagado esta distribuidos en los siguientes socios:", 20, startY);
  startY += 5;


  // -------------------------------------------------- accionistas  ----------------------


  var columnWidth2 = pageWidth / 5; //

  drawCell("ACCIONISTAS", startX + 1 * columnWidth2 , startY  , "center");
  drawCell("NO. ACCIONES", startX + 2.3 * columnWidth2 , startY  , "center");
  drawCell("PORCENTAJE", startX + 3.2 * columnWidth2 , startY , "center");
  drawCell("V/R ACCIÓN", startX + 4 * columnWidth2, startY  , "center");
  drawCell("V/R TOTAL", startX + 4.7 * columnWidth2, startY  , "center");

  startY += 10;
  doc.line(textoStart, startY, pageWidth + textoStart, startY);
  startY += 5;


  for (let i in socios) {
    drawCell(libs.capitalizeFirstLetterOfEachWord(socios[i]?.nombre.toLowerCase()), textoStart+25 , startY );
    drawCell(libs.formatNumber(socios[i]?.acciones).toString(), textoStart + 2.3 * columnWidth2, startY , "center");
    drawCell(((socios[i]?.acciones/capital?.pagado.acciones)*100).toString()+" %", textoStart + 3.2 * columnWidth2, startY , "center");
    drawCell(libs.formatNumber(capital?.pagado.nominal).toString(), textoStart + 4.1 * columnWidth2, startY , "center");
    drawCell(libs.formatNumber(capital?.pagado.nominal * socios[i]?.acciones).toString(), textoStart + 4.8 * columnWidth2, startY, "center");
    startY += 5;
  }

  startY += 5;

  doc.line(textoStart, startY, pageWidth + textoStart, startY);

  startY += 5;

  var totalAcciones = socios.reduce((total, socio) => total + socio.acciones, 0);
  var totalPorcentaje = (totalAcciones/capital?.pagado.acciones)*100
  var valorTotal = totalAcciones*capital?.pagado.nominal

  drawCell("TOTAL ", textoStart+25 , startY );
  drawCell(libs.formatNumber(totalAcciones).toString(), textoStart + 2.3 * columnWidth2, startY , "center");
  drawCell(totalPorcentaje.toString()+" %", textoStart + 3.2 * columnWidth2, startY , "center");
  drawCell(libs.formatNumber(libs.formatNumber(capital?.pagado.nominal)).toString(), textoStart + 4.1 * columnWidth2, startY , "center");
  drawCell(libs.formatNumber(valorTotal).toString(), textoStart + 4.8 * columnWidth2, startY, "center");


  startY += 20;
  doc.text("Este certificado se expide a solicitud de QUIEN INTERESE, en "+ libs.formatFechaLarga(new Date()), 20, startY);
  startY += 5;





  return startY + 10; // Adjust the vertical position for the next element
};

export default body;
