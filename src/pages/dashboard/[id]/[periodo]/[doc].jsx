import React, { useState } from "react";
import Layout from "../../../../components/layout/Body";
import Modal from "../../../../components/utiles/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import libs from "../../../../libs/util";
import cookie from "js-cookie";

const doc = ({ documentosAuditar }) => {
  const Router = useRouter();

  // console.log()

  const [hallazgo, setHallazgo] = useState("");
  const [accionSeguir, setAccionSeguir] = useState("");
  const [idDocumentoAuditado, setIdDocumentoAuditado] = useState("");
  const [modal, setModal] = useState("none");
  const [hallazgoModal, setHallazgoModal] = useState([]);
  const eliminarDatos = async () => {
    const token = cookie.get("__session");

    const idEmpresa = Router.query.id;
    const periodo = Router.query.periodo;
    const tipoDoc = Router.query.doc;

    const documentosPeriodo = await axios({
      method: "delete",
      url:
        libs.location() +
        "api/documentos/" +
        idEmpresa +
        "/" +
        periodo +
        "/" +
        tipoDoc,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (documentosPeriodo.data.affectedRows) {
      window.location.reload();
    }
  };

  const incertarHallazgos = async () => {
    const token = cookie.get("__session");

    const docBody = {
      idDocumento: idDocumentoAuditado,
      id_tipo_documento: Router.query?.doc,
      hallazgo: hallazgo,
      accionCorrectiva: accionSeguir,
    };

    const incertarHallaz = await axios({
      method: "post",
      url: libs.location() + "api/hallazgos",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: docBody,
    });

    const actualizaDocumento = await axios({
      method: "put",
      url: libs.location() + "api/documento/" + idDocumentoAuditado,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        hallazgo: incertarHallaz?.data?.insertId,
      },
    });
    setModal("none");
    window.location.reload();
  };

  const buscarHalazgo = async (idBuscado) => {
    const token = cookie.get("__session");

    const hallazgo = await axios({
      method: "get",
      url: libs.location() + "api/hallazgos/" + idBuscado,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setHallazgoModal(hallazgo?.data);
    //  console.log(hallazgo)
  };

  const eliminarHalazgo = async () => {
    const token = cookie.get("__session");

    const hallazgo = await axios({
      method: "delete",
      url: libs.location() + "api/hallazgos/" + hallazgoModal[0]?.id,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const actualizaDocumento = await axios({
      method: "put",
      url: libs.location() + "api/documento/" + idDocumentoAuditado,
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
    <Layout>
      <Modal
        display={modal}
        onClose={() => {
          setModal("none");
          setHallazgoModal('');
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
            value={hallazgoModal && hallazgoModal[0]?.hallazgo}
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
            value={hallazgoModal && hallazgoModal[0]?.accionCorrectiva}
          ></textarea>
        </div>
      </Modal>
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
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nit</th>
              <th scope="col">Razon Social</th>
              <th scope="col">Numero Documento</th>
              <th scope="col">Electronico</th>
              <th scope="col">Valor Neto</th>
              <th scope="col">Impuestos</th>
              <th scope="col">ReteFuente</th>
              <th scope="col">ReteIva</th>
              <th scope="col">Concepto</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {documentosAuditar &&
              documentosAuditar.map((dat, key) => {
                return (
                  <tr
                    key={dat.id}
                    id={dat.id}
                    className={dat.hallazgo != 0 ? "table-success" : "none"}
                  >
                    <td>{key + 1}</td>
                    <td>{dat.nit}</td>
                    <td>{dat.razonSocial}</td>
                    <td>{dat.numeroDoc}</td>
                    <td>{dat.numeroFE}</td>
                    <td>{dat.valorNeto}</td>
                    <td>{dat.impuesto}</td>
                    <td>{dat.reteFuente}</td>
                    <td>{dat.reteIva}</td>
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
              })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const tipoDoc = ctx?.query?.doc;
  const periodo = ctx?.query?.periodo || 0;
  const idEmpresa = ctx?.query?.id;

  // console.log(tipoDoc);

  const documentosPeriodo = await axios({
    method: "get",
    url:
      libs.location() +
      "api/documentos/" +
      idEmpresa +
      "/" +
      periodo +
      "/" +
      tipoDoc,
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

export default doc;
