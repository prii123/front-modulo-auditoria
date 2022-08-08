import libs from '../../../libs/util'
const detalle = (doc, data) => {
  doc.setFontSize(11);
  //COLOR DE FONDO DE LOS CONCEPTOS DE RETENCION
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 110, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 115, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 120, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 125, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 130, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 135, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 140, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 145, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 150, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 155, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 160, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 165, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 170, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 175, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 180, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 185, 189, 5, "F");
  doc.setFillColor("#F0FFF0");
  doc.rect(11, 190, 189, 5, "F");
  doc.setFillColor("#FFFFFF");
  doc.rect(11, 195, 189, 5, "F");

  doc.line(15, 110, 15, 200);
  doc.line(105, 105, 105, 200); // divide el cuerpo de retenciones
  doc.line(110, 110, 110, 200); // divide

  doc.line(155, 105, 155, 200); // divide
  doc.line(160, 110, 160, 200); // divide

  doc.setFontSize(8);
  doc.text("1.", 12, 113);
  doc.text("Rentas de trabajo", 16, 113);
  doc.text("27", 106, 113);
  doc.text("52", 156, 113);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 1)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 1)?.base).toString()
      : "0",
    154,
    113, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 1)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 1)?.valor).toString()
      : "0",
    198,
    113, {align: "right"}
  );

  doc.text("2.", 12, 118);
  doc.text("Rentas de pensiones", 16, 118);
  doc.text("28", 106, 118);
  doc.text("53", 156, 118);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 1)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 1)?.base).toString()
      : "0",
    154,
    118, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 2)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 2)?.valor).toString()
      : "0",
    198,
    118, {align: "right"}
  );

  doc.text("3.", 12, 123);
  doc.text("Honorarios", 16, 123);
  doc.text("29", 106, 123);
  doc.text("54", 156, 123);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 3)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 3)?.base).toString()
      : "0",
    154,
    123, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 3)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 3)?.valor).toString()
      : "0",
    198,
    123, {align: "right"}
  );

  doc.text("4.", 12, 128);
  doc.text("Comisiones", 16, 128);
  doc.text("30", 106, 128);
  doc.text("55", 156, 128);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 4)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 4)?.base).toString()
      : "0",
    154,
    128, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 4)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 4)?.valor).toString()
      : "0",
    198,
    128, {align: "right"}
  );

  doc.text("5.", 12, 133);
  doc.text("Servicios", 16, 133);
  doc.text("31", 106, 133);
  doc.text("56", 156, 133);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 5)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 5)?.base).toString()
      : "0",
    154,
    133, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 5)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 5)?.valor).toString()
      : "0",
    198,
    133, {align: "right"}
  );

  doc.text("6.", 12, 138);
  doc.text("Rendimientos financieros", 16, 138);
  doc.text("32", 106, 138);
  doc.text("57", 156, 138);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 6)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 6)?.base).toString()
      : "0",
    154,
    138, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 6)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 6)?.valor).toString()
      : "0",
    198,
    138, {align: "right"}
  );

  doc.text("7.", 12, 143);
  doc.text("Arrendamientos", 16, 143);
  doc.text("33", 106, 143);
  doc.text("58", 156, 143);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 7)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 7)?.base).toString()
      : "0",
    154,
    143, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 7)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 7)?.valor).toString()
      : "0",
    198,
    143, {align: "right"}
  );

  doc.text("8.", 12, 148);
  doc.text("Regalias y explotacion de la propiedad intelectual", 16, 148);
  doc.text("34", 106, 148);
  doc.text("59", 156, 148);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 8)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 8)?.base).toString()
      : "0",
    154,
    148, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 8)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 8)?.valor).toString()
      : "0",
    198,
    148, {align: "right"}
  );

  doc.text("9.", 12, 153);
  doc.text("Dividendos y participaciones", 16, 153);
  doc.text("35", 106, 153);
  doc.text("60", 156, 153);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 9)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 9)?.base).toString()
      : "0",
    154,
    153, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 9)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 9)?.valor).toString()
      : "0",
    198,
    153, {align: "right"}
  );

  doc.text("10.", 11, 158);
  doc.text("Compras", 16, 158);
  doc.text("36", 106, 158);
  doc.text("61", 156, 158);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 10)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 10)?.base).toString()
      : "0",
    154,
    158, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 10)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 10)?.valor).toString()
      : "0",
    198,
    158, {align: "right"}
  );

  doc.text("11.", 11, 163);
  doc.text("Transacciones con tarjetas debito y credito", 16, 163);
  doc.text("37", 106, 163);
  doc.text("62", 156, 163);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 11)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 11)?.base).toString()
      : "0",
    154,
    163, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 11)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 11)?.valor).toString()
      : "0",
    198,
    163, {align: "right"}
  );

  doc.text("12.", 11, 168);
  doc.text("Contratos de construccion", 16, 168);
  doc.text("38", 106, 168);
  doc.text("63", 156, 168);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 12)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 12)?.base).toString()
      : "0",
    154,
    168, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 12)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 12)?.valor).toString()
      : "0",
    198,
    168, {align: "right"}
  );

  doc.text("13.", 11, 173);
  doc.text("Enajenamiento de activos fijos de peronas naturales", 16, 173);
  doc.text("39", 106, 173);
  doc.text("64", 156, 173);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 13)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 13)?.base).toString()
      : "0",
    154,
    173, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 13)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 13)?.valor).toString()
      : "0",
    198,
    173, {align: "right"}
  );

  doc.text("14.", 11, 178);
  doc.text("Loterias, rifas, apuestas y similares", 16, 178);
  doc.text("40", 106, 178);
  doc.text("65", 156, 178);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 14)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 14)?.base).toString()
      : "0",
    154,
    178, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 14)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 14)?.valor).toString()
      : "0",
    198,
    178, {align: "right"}
  );

  doc.text("15.", 11, 183);
  doc.text("Otros pagos sujetos a retencion", 16, 183);
  doc.text("41", 106, 183);
  doc.text("66", 156, 183);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 15)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 15)?.base).toString()
      : "0",
    154,
    183, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 15)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 15)?.valor).toString()
      : "0",
    198,
    183, {align: "right"}
  );

  doc.text("16.", 11, 188);
  doc.text(
    "Contribuyentes exonerados de aportes (art. 114) - AUTORRENTA",
    16,
    188
  );
  doc.text("42", 106, 188);
  doc.text("67", 156, 188);
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 16)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 16)?.base).toString()
      : "0",
    154,
    188, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 16)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 16)?.valor).toString()
      : "0",
    198,
    188, {align: "right"}
  );

  doc.text("17.", 11, 193);
  doc.text("Retencion de IVA", 16, 193);
  doc.text("43", 106, 193);
  doc.text("68", 156, 193);

  doc.text(
    data?.find((base) => base.id_tipo_retencion == 17)?.base
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 17)?.base).toString()
      : "0",
    154,
    193, {align: "right"}
  );
  doc.text(
    data?.find((base) => base.id_tipo_retencion == 17)?.valor
      ? libs.formatNumber(data?.find((base) => base.id_tipo_retencion == 17)?.valor).toString()
      : "0",
    198,
    193, {align: "right"}
  );


};

export default detalle;
