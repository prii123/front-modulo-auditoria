import newPage from "../../newPage";
import libs from '../../../util'



// ----------------------------------------------------- BODY  ------------------------------------
const body = (doc, startY, texto) => {

  doc.setFontSize(12);

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

  return startY + 10; // Adjust the vertical position for the next element
};

export default body;
