const ayudas = {
  formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  },

  convertirANumero(str) {
    const string = str.toString();
    if (string) {
      const str1 = string?.replace(",", "");
      const str2 = str1?.replace(".", "");
      const str3 = str2?.replace("C", "");
      const str4 = str3?.replace("N", "");
      const str5 = str4?.replace("I", "");
      const str6 = str5?.replace("T", "");

      return parseInt(str6);
    }
  },

  formatFecha(hoy) {
    let dia = hoy.getDay();
    let mes = hoy.getMonth() + 1;
    let agnio = hoy.getFullYear();

    // AAAA-MM-DD:
    let formato1 = `${agnio}-${mes}-${dia}`;
    //console.log(formato1);
    return formato1;
  },
  formatFechaLarga(hoy) {
    let mesLetras = "";

    let dia = hoy.getDay();
    let mes = hoy.getMonth() + 1;
    let agnio = hoy.getFullYear();

    switch (mes) {
      case 1:
        mesLetras = "Enero";
        break;
      case 2:
        mesLetras = "Febrero";
        break;
      case 3:
        mesLetras = "Marzo";
        break;
      case 4:
        mesLetras = "Abril";
        break;
      case 5:
        mesLetras = "Mayo";
        break;
      case 6:
        mesLetras = "Junio";
        break;
      case 7:
        mesLetras = "Julio";
        break;
      case 8:
        mesLetras = "Agosto";
        break;
      case 9:
        mesLetras = "Septiembre";
        break;
      case 10:
        mesLetras = "Octubre";
        break;
      case 11:
        mesLetras = "Noviembre";
        break;
      case 12:
        mesLetras = "Diciembre";
        break;
      default:
        mesLetras = "fecha no valida";
    }

    let formato1 = `Medellin, ${mesLetras} ${dia} de ${agnio}`;
    //console.log(formato1);
    return formato1;
  },
  splitFecha(hoy) {
    // formatea fechas que viene un string
    let dia = hoy?.split("T")[0];

    return dia;
  },
  location() {
    return "http://localhost:4000/";
  },
};
export default ayudas;
