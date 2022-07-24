const ayudas = {
  formatNumber(number) {
    return new Intl.NumberFormat().format(number);
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
  splitFecha(hoy) {
    // formatea fechas que viene un string
    let dia = hoy?.split("T")[0]

    return dia;
  },
  location (){
    return 'http://localhost:4000/'
  }
};
export default ayudas;
