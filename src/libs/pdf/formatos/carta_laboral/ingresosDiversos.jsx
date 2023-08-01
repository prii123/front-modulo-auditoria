import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import libs from '../../../util'
import Firmas from './firmas'
import header from "./header";
import body from "./body";
import '@fortawesome/fontawesome-free/css/all.css';



// ----------------------------------------------------- PDF  ------------------------------------

const PdfCartaLaboralDiversosIngresos = ({ data }) => {




    const onClic = async () => {

        const img = await libs.urlImgBase64(data?.logo);
        const firma = await libs.urlImgBase64(data?.firma1)

        var otrosIngresos = data?.ingresosAdicionales?.map(x => {
            return ` Adicionalmente obtiene unos ingresos por concepto de ${x.concepto} por un valor de $${libs.formatNumber(x.valor)} ${libs.numeroALetras(x.valor)}`;
        })

        var ingresos = otrosIngresos ? otrosIngresos : ''


        // Convertir los valores a números y calcular el total usando reduce
        const totalValores = (data?.ingresosAdicionales?.map((valor) => parseInt(valor.valor)) ?? []).reduce((total, valor) => total + valor, 0);
        console.log(totalValores)
        // Obtener el salario de data y convertirlo a número si es necesario
        const salario = parseInt(data?.salario ?? 0);
        // Calcular el valor total sumando el salario y el total de los valores
        const valorTotal = salario + totalValores;

        var texto = "Me permito certificar que el señor(a) " + libs.capitalizeFirstLetterOfEachWord(data?.nombre?.toLowerCase()) +
            " identificado con CC " + libs.formatNumber(data?.cedula) + " de " + libs.capitalizeFirstLetterOfEachWord(data?.municipio?.toLowerCase()) +
            " presta sus servicios en la empresa " + libs.capitalizeFirstLetterOfEachWord(data?.empresa?.toLowerCase()) +
            " identificada con NIT " + libs.formatNumber(data?.nit) + "-" + data?.dv + ". Actualmente se desempeña como " +
            libs.capitalizeFirstLetterOfEachWord(data?.cargo?.toLowerCase()) + ", labora con nosotros desde " + data?.desde +
            " y devenga un salario mensual de ($" + libs.formatNumber(data?.salario) + ".00) " + libs.numeroALetras(data?.salario) +
            ". Su contrato de trabajo es " + libs.capitalizeFirstLetterOfEachWord(data?.contrato?.toLowerCase()) + ", " + ingresos +
            ", Para un valor total promedio mensual de $" + libs.formatNumber(valorTotal) + " " + libs.numeroALetras(valorTotal) + "."



        var doc = new jsPDF();
        let startY;
        startY = 5

        startY = header(doc, img, startY);
        startY += 10;
        startY = body(doc, startY, texto);
        startY += 10;

        Firmas(doc, startY, firma, data?.nombreFirma, data?.ccFirma, data?.cargoFirma, data?.telefonoFirma, data?.direccionFirma)

        window.open(doc.output("bloburl"), "_blank");

    }

    return (
        <div>

            <button className="btn-personalizado" onClick={onClic}>
                <i className="fas fa-eye"></i>
            </button>
        </div>
    );
};

export default PdfCartaLaboralDiversosIngresos;
