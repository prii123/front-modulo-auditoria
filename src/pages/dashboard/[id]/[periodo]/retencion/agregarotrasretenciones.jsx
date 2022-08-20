import React from 'react'
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import Alert from '../../../../../components/utiles/Alertas'

const agregarotrasretenciones = () => {
  return (
    <Layout head={'Agrega otras retenciones que pudieron haber faltado en el cargue de las cuentas por pagar.'}>
        <div>agregarotrasretenciones</div>
    </Layout>
  )
}

export default agregarotrasretenciones