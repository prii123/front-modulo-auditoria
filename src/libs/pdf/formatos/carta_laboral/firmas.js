const firmas = (doc, startY, firma1, nombreFirma, ccFirma, cargoFirma, telefonoFirma, direccionFirma) => {

    doc.setFontSize(12);
    //------------------------ firma representante legal ----------------

    startY += 50
    doc.addImage(firma1, "JPEG", 20, startY, 60, 40);
    doc.setFontSize(10);

    startY += 35
    doc.text("______________________________", 20, startY);
    startY += 5
    doc.text(nombreFirma, 20, startY);
    startY += 5
    doc.text(cargoFirma, 20, startY);
    startY += 5
    doc.text("C.C. " + ccFirma, 20, startY);
    startY += 5
    doc.text(direccionFirma, 20, startY);
    startY += 5
    doc.text("Tel: " + telefonoFirma, 20, startY);


    return startY;

};


export default firmas;