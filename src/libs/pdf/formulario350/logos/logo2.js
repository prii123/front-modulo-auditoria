const logo2 = (doc) => {
    // const logoFormulario =
    // "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659802042/AyC/logoFormulario.jpg";
    // doc.addImage(logoFormulario, "JPEG", 150, 12, 46, 14, "medium");
    doc.setFillColor("#386492");
    doc.rect(153, 11, 46, 13, "F");
    doc.setFontSize(48);
    doc.setFont('courier','bold');
    doc.setTextColor('#ffffff')
    doc.text("350 ", 161, 23);
    doc.setFont('courier','normal');
    doc.setTextColor('#00000')
}

export default logo2;