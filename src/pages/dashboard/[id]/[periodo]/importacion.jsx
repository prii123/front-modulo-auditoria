/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Layout from "../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../libs/util";
import Router, { useRouter } from "next/router";
import cookie from "js-cookie";
import * as XLSX from "xlsx";
import Alert from "../../../../components/utiles/Alertas";

const importacion = ({ data, cantidades }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = useRouter();
  const [datasend, setDatasend] = React.useState(false);
  const [documento, setDocumento] = React.useState([]);
  const [mensajeError, setMensajeError] = React.useState("");
  const [statusMenssage, setStatusMenssage] = React.useState(false);
  const [mensajeColor, setMensajeColor] = React.useState("");
  const [documentoSeleccionado, setDocumentoSeleccionado] = React.useState(0);

  const [numeroProgress, setNumeroProgress] = React.useState(0);


  const auhtCook = cookie.get("__session");

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });

        /* DO SOMETHING WITH workbook HERE */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const datos = XLSX.utils.sheet_to_json(ws);
        // console.log(ws);
        resolve(datos);
      };
    });

    promise.then((x) => {
      setDocumento(x);
      // console.log(x);
    });
  };



  const guardarDatosBD = async () => {
    if (documento[0]?.DocumentoCliente == undefined) {
      // console.log("error numero documento")
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Falta el Nit");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (
      documento[0]?.NumeroDoc == undefined ||
      documento[0]?.NumeroDoc == ""
    ) {
      // console.log("error numero documento")
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Falta numero de documento.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.ValorNeto == undefined) {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Falta valor del documento.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.IVA == undefined) {
      setStatusMenssage(true);
      setMensajeError("Falta valor del impuesto.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.ReteFuenteRenta == undefined) {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Falta valor de la retencion.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.ReteFuenteIVA == undefined) {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Rete iva.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.NombredelCliente == undefined) {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Falta la razon social.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documentoSeleccionado == 0) {
      setStatusMenssage(true);
      setMensajeColor("alert-red");
      setMensajeError("Debes Elegir el tipo de Documento.");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else {
      // console.log(documento);
      const idEmpresa = path.query?.id;
      const periodo = path.query?.periodo;
      const tipoDoc = documentoSeleccionado;

      const documentos = []


      for (let i = 0; i < documento.length; i++) {
        const body = {
          empresaId: libs.convertirANumero(idEmpresa),
          nit: libs.convertirANumero(documento[i]?.DocumentoCliente),
          razonSocial: documento[i]?.NombredelCliente,
          tipoDoc: libs.convertirANumero(tipoDoc),
          numeroDoc: libs.convertirANumero(documento[i]?.NumeroDoc),
          numeroFE: documento[i]?.NumeroFE,
          valorNeto: libs.convertirANumero(documento[i]?.ValorNeto),
          impuesto: libs.convertirANumero(documento[i]?.IVA),
          reteFuente: libs.convertirANumero(documento[i]?.ReteFuenteRenta),
          reteIva: libs.convertirANumero(documento[i]?.ReteFuenteIVA),
          periodo: periodo,
        };

        documentos.push(body)
        var valorCargado = Math.round((100 * (i + 1)) / documento.length);
        setNumeroProgress(valorCargado);
      }

      const resp = await axios({
        method: "post",
        url: libs.location() + "/documentos",
        headers: {
          authorization: `Bearer ${auhtCook}`,
        },
        data: documentos,
      });



      setStatusMenssage(true);
      setMensajeColor("alert-green");
      setMensajeError('guardado');
      setTimeout(() => {
        setStatusMenssage(false);
        Router.reload()
      }, 2000);


    }
  };

  return (
    <Layout head={<div>IMPORTACION DE DATOS</div>}>

      <div className="row">
        {data &&
          data.map((doc) => {
            // console.log(doc);   path + "/" + doc.id  cantidades
            return (
              <div className={`col-3 hover-cards  p-0`} key={doc.id}>
                <input
                  className={`form-check-input ${cantidades.find((valores) => valores.id == doc.id)
                      .cantidad > 0
                      ? "bg-success"
                      : "none"
                    }`}
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={doc.id}
                  onChange={(e) => setDocumentoSeleccionado(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  {doc?.nombre}
                </label>
              </div>
            );
          })}
      </div>

      <br />

      <div className="card" style={{ width: "100%" }}>
        <button className="btn hover-cards" onClick={guardarDatosBD}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            fill="currentColor"
            className="bi bi-cloud-download"
            viewBox="0 0 16 16"
          >
            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
          </svg>
          &nbsp;&nbsp;&nbsp;Guarda los datos
        </button>

        {statusMenssage && (
          <Alert descripcion={mensajeError} color={mensajeColor} />
        )}

        {documento && documento.length}
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Carga tu Archivo
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e) => {
                const isNameOfOneImageRegEx = /.(xlsx)$/i;
                const extencionValida = isNameOfOneImageRegEx.test(
                  e.target.files[0]?.name
                );
                if (extencionValida) {
                  const file = e.target.files[0];
                  readExcel(file);
                }
              }}
            />
          </div>
          <div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={numeroProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: numeroProgress + '%', backgroundColor: '#f5a745' }}
              >
                {numeroProgress}%
              </div>
            </div>

            <table
              className="table table-bordered"
              style={{ fontSize: ".9rem" }}
            >
              <thead>
                <tr>
                  <th scope="col">Nit</th>
                  <th scope="col">Razon Social</th>
                  <th scope="col">Numero Documento</th>
                  <th scope="col">Numero Electronico</th>
                  <th scope="col">Valor Neto</th>
                  <th scope="col">Impuestos</th>
                  <th scope="col">Retencion Fuente</th>
                  <th scope="col">Retencion Iva</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {documento?.map((doc, key) => {
                  return (
                    <tr key={key} className="hover-cards">
                      <td>{libs.convertirANumero(doc?.DocumentoCliente)}</td>
                      <td>{doc?.NombredelCliente}</td>
                      <td>{libs.convertirANumero(doc?.NumeroDoc)}</td>
                      <td>{doc?.NumeroFE}</td>
                      <td>{libs.convertirANumero(doc?.ValorNeto)}</td>
                      <td>{libs.convertirANumero(doc?.IVA)}</td>
                      <td>{libs.convertirANumero(doc?.ReteFuenteRenta)}</td>
                      <td>{libs.convertirANumero(doc?.ReteFuenteIVA)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const token = ctx?.req?.cookies?.__session;
  const idEmpresa = ctx?.query.id;
  const periodo = ctx?.query.periodo;
  const resp = await axios({
    method: "get",
    url: libs.location() + "/documentos/tipo-documentos",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });



  const cant = await axios({
    method: "get",
    url:
      libs.location() + `/documentos/numero-por-cada-documento/${periodo}/${idEmpresa}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });


  const cantidades = cant.data;

  console.log(resp.data)

  const json = resp.data;

  return { props: { data: json, cantidades } };
}

export default importacion;
