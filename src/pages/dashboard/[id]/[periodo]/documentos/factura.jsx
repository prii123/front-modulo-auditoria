/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Layout from "../../../../../components/layout/Body";
import Modal from "../../../../../components/utiles/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from "js-cookie";


const factura = ({ documentosAuditar, hallazgos }) => {
  const Router = useRouter();

  // console.log(documentosAuditar)

  const [hallazgo, setHallazgo] = useState("");
  const [accionSeguir, setAccionSeguir] = useState("");
  const [idDocumentoAuditado, setIdDocumentoAuditado] = useState("");
  const [modal, setModal] = useState("none");
  const [hallazgoModal, setHallazgoModal] = useState([]);
  const [idDelHallazgoEncontrado, setIdDelHallazgoEncontrado] = useState("");


  const incertarHallazgos = async () => {
    const token = cookie.get("__session");

    const docBody = {
      empresaId: Router.query.id,
      periodo: Router.query.periodo,
      documentoId: idDocumentoAuditado,
      tipodocumentoId: 4,
      hallazgo: hallazgo,
      accionCorrectiva: accionSeguir,
    };

    // console.log(docBody)

    if (!idDelHallazgoEncontrado == "") {
      await axios({
        method: "patch",
        url: libs.location() + "/hallazgos/" + idDelHallazgoEncontrado,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });
    } else {

      await axios({
        method: "post",
        url: libs.location() + "/hallazgos",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });



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

    await axios({
      method: "delete",
      url: libs.location() + "/hallazgos/" + hallazgoModal[0]?.id,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });


     await axios({
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
              <th scope="col">ReteFuente</th>
              <th scope="col">ReteIva</th>
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
                    className={hallazgos.find(hall => hall.documentoId == dat.id) ? "table-success" : "none"}
                  >
                    <td>{key + 1}</td>
                    <td>{dat.documento}</td>
                    <td>{dat.razon_social ? dat.razon_social : dat.nombre1}</td>
                    <td>{dat.nroCuenta}</td>
                    <td>{dat.nroFactura}</td>
                    <td className="text-end">{dat.netoGv}</td>
                    <td className="text-end">{dat.iva}</td>
                    <td className="text-end">{dat.retRenta}</td>
                    <td className="text-end">{dat.retIva}</td>
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


  const hallazgos = await axios({
    method: "get",
    url: libs.location() + "/hallazgos/"+periodo+"/" + idEmpresa,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });




  return {
    props: {
      documentosAuditar: documentosPeriodo?.data,
      hallazgos: hallazgos.data
    },
  };
}

export default factura;