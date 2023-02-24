import React from 'react'
import Layout from "../../../components/layout/Body";

import PdfCartaLaboral from '../../../libs/pdf/formatos/carta_laboral/ver_carta_laboral';

const formatos = () => {
  return (
    <Layout>
        formatos

        <ul>
            <li>carta laboral</li>
            <li>certificado de seguridad social</li>
            <li>composicion accionaria</li>
        </ul>

        <PdfCartaLaboral />
    </Layout>
  )
}

export default formatos