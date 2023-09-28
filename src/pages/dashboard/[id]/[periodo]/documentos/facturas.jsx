import React, { useState, useEffect } from "react";
import Layout from "../../../../../components/layout/Body";
import Modal from "../../../../../components/utiles/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from "js-cookie";



const facturas = ({ documentosAuditar }) => {
  const Router = useRouter();

  // console.log(documentosAuditar)

  const [hallazgo, setHallazgo] = useState("");
  const [accionSeguir, setAccionSeguir] = useState("");
  const [idDocumentoAuditado, setIdDocumentoAuditado] = useState("");
  const [modal, setModal] = useState("none");
  const [hallazgoModal, setHallazgoModal] = useState([]);
  const [idDelHallazgoEncontrado, setIdDelHallazgoEncontrado] = useState("");

  const eliminarDatos = async () => {
    const token = cookie.get("__session");

    const idEmpresa = Router?.query?.id;
    const periodo = Router?.query?.periodo;
    const tipoDoc = Router?.query?.doc;

    const documentosPeriodo = await axios({
      method: "delete",
      url:
        libs.location() +
        "/documentos/" +
        periodo +
        "/" +
        tipoDoc +
        "/" +
        idEmpresa,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // console.log(documentosPeriodo)

    if (documentosPeriodo.status == 200) {
      window.location.reload();
    }
  };

  const incertarHallazgos = async () => {
    const token = cookie.get("__session");

    const docBody = {
      empresaId: Router.query.id,
      periodo: Router.query.periodo,
      documentoId: idDocumentoAuditado,
      tipodocumentoId: Router.query?.doc,
      hallazgo: hallazgo,
      accionCorrectiva: accionSeguir,
    };

    // console.log(docBody)

    if (!idDelHallazgoEncontrado == "") {
      const incertarHallaz = await axios({
        method: "patch",
        url: libs.location() + "/hallazgos/" + idDelHallazgoEncontrado,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });
    } else {
      const incertarHallaz = await axios({
        method: "post",
        url: libs.location() + "/hallazgos",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });



      const actualizaDocumento = await axios({
        method: "patch",
        url: libs.location() + "/documentos/" + idDocumentoAuditado,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          hallazgo: incertarHallaz?.data?.id,
        },
      });

      // console.log(actualizaDocumento)
    }
    setModal("none");
    Router.reload()
  };

  const buscarHalazgo = async (idBuscado) => {
    const token = cookie.get("__session");

    const hallazgo = await axios({
      method: "get",
      url: libs.location() + "/hallazgos/documento-id/" + idBuscado,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setHallazgoModal(hallazgo?.data);
    setHallazgo(hallazgo?.data[0]?.hallazgo);
    setAccionSeguir(hallazgo?.data[0]?.accionCorrectiva);
    setIdDelHallazgoEncontrado(hallazgo?.data[0]?.id);
  };

  const eliminarHalazgo = async () => {
    const token = cookie.get("__session");

    const hallazgoo = await axios({
      method: "delete",
      url: libs.location() + "/hallazgos/" + hallazgoModal[0]?.id,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });


    const actualizaDocumento = await axios({
      method: "patch",
      url: libs.location() + "/documentos/" + idDocumentoAuditado,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        hallazgo: 0,
      },
    });

    setModal("none");
    window.location.reload();

    //  console.log(hallazgo)
  };

  return (
    <Layout >
      <Modal
        display={modal}
        onClose={() => {
          setModal("none");
          setHallazgoModal("");
          setHallazgo("")
          setAccionSeguir("")
        }}
        onSave={incertarHallazgos}
        onDelete={eliminarHalazgo}
        tittle={"Hallazgos y posible solucion"}
      >
        {idDocumentoAuditado}
        <br />
        <label htmlFor="floatingTextarea2">
          Ingresa el hallazgo encontrado
        </label>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            onChange={(e) => setHallazgo(e.target.value)}
            value={hallazgo}
          ></textarea>
        </div>
        <br />
        <br />
        <label htmlFor="floatingTextarea2">Ingresa la accion correctiva</label>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            onChange={(e) => setAccionSeguir(e.target.value)}
            value={accionSeguir}
          ></textarea>
        </div>
      </Modal>

      <br />
      <a className="pe-auto text-decoration-none" onClick={eliminarDatos}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-archive"
          viewBox="0 0 16 16"
        >
          <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
        </svg>
        &nbsp;&nbsp;&nbsp;Eliminar
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <br />
      <br />
      <div>
        <table className="table table-bordered table-hover" style={{ fontSize: '.9rem' }}>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nit</th>
              <th scope="col">Razon Social</th>
              <th scope="col">Numero Documento</th>
              <th scope="col">Electronico</th>
              <th scope="col">Valor Neto</th>
              <th scope="col">Impuestos</th>
              <th scope="col">Concepto</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {documentosAuditar ?
              documentosAuditar.map((dat, key) => {
                return (
                  <tr
                    key={dat.id}
                    id={dat.id}
                    className={dat.estado != 1 ? "table-success" : "none"}
                  >
                    <td>{key + 1}</td>
                    <td>{dat.documento}</td>
                    <td>{dat.razon_social ? dat.razon_social : dat.nombre1}</td>
                    <td>{dat.nro_factura}</td>
                    <td>{dat.fe_number}</td>
                    <td className="text-end">{dat.neto_gv}</td>
                    <td className="text-end">{dat.iva}</td>
                    <td className="table-info">-</td>
                    <td className="table-info">-</td>
                    <td className="table-info">-</td>
                    <td>
                      <button
                        value={dat.id}
                        type="button"
                        className="btn btn-dark"
                        onClick={(e) => {
                          setModal("flex");
                          setIdDocumentoAuditado(e.target.value);
                          buscarHalazgo(e.target.value);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              }) : null}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const periodo = ctx?.query?.periodo;
  const annio = periodo.split('-')[0]
  const mes = periodo.split('-')[1]
  const idEmpresa = ctx?.query?.id;

  // console.log(tipoDoc); getServerSideProps


  const documentosPeriodo = await axios({
    method: "get",
    url:
      libs.location() +
      "/fuente-docs/factura/" +
      idEmpresa+
      "/"+
      annio+"/"+mes
    ,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });


  return {
    props: {
      documentosAuditar: documentosPeriodo?.data,
    },
  };
}

export default facturas;