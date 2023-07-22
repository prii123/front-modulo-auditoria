import React from 'react'

import Layout from "../../../components/layout/Body";
import Link from 'next/link';

const index = () => {
  return (
    <Layout>
      <div className="button-container">
        <a href={"/dashboard/configuracion/documentos"} className="btn btn-primary">Documentos fuente</a>
        <a href={"/dashboard/configuracion/retencion"} className="btn btn-primary">Conceptos Retencion</a>
      </div>
    </Layout>
  )
}

export default index