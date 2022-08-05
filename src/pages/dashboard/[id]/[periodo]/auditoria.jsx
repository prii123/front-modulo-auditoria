/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../libs/util";
import Link from "next/link";
import { useRouter } from "next/router";

const auditoria = ({ data }) => {

  const Router = useRouter();

  return (
    <Layout head={<div>AUDITORIA</div>}>
      <a
        className="pe-auto text-decoration-none"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-skip-backward"
          viewBox="0 0 16 16"
        >
          <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
        </svg>
        &nbsp;&nbsp;&nbsp;Regresar
      </a>
      <br />
      <br />
      <br />

      <div className="row">
        {data &&
          data.map((dato) => {
            return (
              <div key={dato.id} className="p-4 col-sm-6 col-lg-4">
                <div className="card text-center ">
                  <div className="card-header">Tipo de documento fuente</div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>{dato.nombre}</strong>
                    </h5>
                    <Link
                      href="/dashboard/[id]/[periodo]/[doc]"
                      as={
                        "/dashboard/" +
                        Router.query.id +
                        "/" +
                        Router.query.periodo +
                        "/" +
                        dato.id
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
    url: libs.location() + "api/tipodocumento",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      data: tiposDeDocumentos?.data,
    },
  };
}

export default auditoria;
