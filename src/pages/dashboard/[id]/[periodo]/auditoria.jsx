/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../libs/util";
import Link from "next/link";
import { useRouter } from "next/router";

const auditoria = ({ data }) => {

  const Router = useRouter();

  // console.log(data)

  var documentos = [
    { id: 1, nombre: 'Facturas de venta', url:'factura' },
    { id: 2, nombre: 'Recibos de caja', url:'rcaja_cont' },
    { id: 3, nombre: 'Nota credito venta', url:'notaCVentas' },
    { id: 4, nombre: 'Cuenta por Pagar', url:'cuentasPorPagar' },
    { id: 5, nombre: 'Nota credito compra', url:'notaCCompras' },
    { id: 6, nombre: 'Orden de Pago', url:'ordenPagoCont' },
    { id: 7, nombre: 'Pago directo', url:'pagoDirectoCont' },
    { id: 8, nombre: 'Nota debito compra', url:'notaDCompras' },
    { id: 9, nombre: 'Nota debito ventas', url:'notaDVentas' }
  ]

  return (
    <Layout head={<div>AUDITORIA</div>} >

      <div className="row">
        {documentos &&
          documentos.map((dato) => {
            return (
              <div key={dato?.id} className="p-4 col-sm-6 col-lg-4">
                <div className="card text-center ">
                  <div className="card-header">Tipo de documento fuente</div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{dato?.nombre}</strong>
                    </h5>
                    <Link
                      href="/dashboard/[id]/[periodo]/[doc]"
                      as={
                        "/dashboard/" +
                        Router?.query?.id +
                        "/" +
                        Router?.query?.periodo +
                        "/" +
                        dato?.url
                      }
                    >
                      <a className="btn btn-primary">Empezar</a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const token = ctx?.req?.cookies?.__session;
  const tiposDeDocumentos = await axios({
    method: "get",
    url: libs.location() + "/documentos/tipo-documentos",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

 

  //console.log(tiposDeDocumentos)

  return {
    props: {
      data: tiposDeDocumentos?.data,
    },
  };
}

export default auditoria;
