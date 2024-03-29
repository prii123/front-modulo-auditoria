const ayudas = {
  formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  },

  convertirANumero(cadena) {
    // expresion regular que valida solo numeros
    var ExpRegSoloNumeros = "^[0-9]+$";

    if (!isNaN(cadena)) {
      return cadena;
    } else {
      // array vacio donde se almacenaran los valores numericos
      var array = [];
      // toma la cadena y hace un ciclo
      for (var i = 0; i < cadena?.length; i++) {
        //valida si es numero lo agrega al array vacio
        if (cadena[i].match(ExpRegSoloNumeros) != null) {
          array.push(cadena[i]);
        }
      }
      //tomo el array lleno con los numeros y utilizo el metodo toString para volverlo una cadena
      const cadena2 = array.toString();
      // remplazo todas las comas que se generarn por el metodo toString
      const str1 = cadena2?.replace(/,/g, "");
      //retorno la cadena antes convirtiendola en un Integer
      return parseInt(str1);
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

  meses(mes){
    let listaMes = {
      1:"Enero", 7:"Julio",
      2:"Febrero", 8:"Agosto",
      3:"Marzo", 9:"Septiembre",
      4:"Abril", 10:"Octubre",
      5:"Mayo", 11:"Noviembre",
      6:"Junio", 12:"Diciembre",
    }

    return listaMes[mes]
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
    return "http://localhost:4000";
  },

  principalPage(){
    return "dashboard"
  },

  urlImgBase64(IMAGE_LOCATION){

    const data64 = fetch(IMAGE_LOCATION)
      .then((res) => res.arrayBuffer())
      .then((arrayBufferData) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(arrayBufferData))
      );
      const imageFromArrayBuffer = `data:image/png;base64,${base64String}`;
      // console.log(imageFromArrayBuffer);
      return imageFromArrayBuffer
    });

    return data64

  }
};
export default ayudas;
