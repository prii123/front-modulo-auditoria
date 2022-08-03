/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Layout from "../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../libs/util";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import * as XLSX from "xlsx";

const importacion = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = useRouter();
  const [datasend, setDatasend] = React.useState(false);
  const [documento, setDocumento] = React.useState([]);
  const [mensajeError, setMensajeError] = React.useState("");
  const [statusMenssage, setStatusMenssage] = React.useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = React.useState(0);
  // console.log(path.asPath)

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

  // console.log(cookie.get('__session'))

  const guardarDatosBD = () => {
    if (documento[0]?.nit == undefined) {
      // console.log("error numero documento")
      setStatusMenssage(true);
      setMensajeError("falta el Nit");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.numeroDoc == undefined) {
      // console.log("error numero documento")
      setStatusMenssage(true);
      setMensajeError("falta numero de documento");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.valorNeto == undefined) {
      setStatusMenssage(true);
      setMensajeError("falta valor del documento");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.impuesto == undefined) {
      setStatusMenssage(true);
      setMensajeError("falta valor del impuesto");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.reteFuente == undefined) {
      setStatusMenssage(true);
      setMensajeError("falta valor de la retencion");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.reteIva == undefined) {
      setStatusMenssage(true);
      setMensajeError("rete iva");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documento[0]?.razonSocial == undefined) {
      setStatusMenssage(true);
      setMensajeError("Falta la razon social");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else if (documentoSeleccionado == 0) {
      setStatusMenssage(true);
      setMensajeError("Debes Elegir el tipo de Documento Fuente");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    } else {
      // console.log(documento);
      const idEmpresa = path.query?.id;
      const periodo = path.query?.periodo;
      const tipoDoc = documentoSeleccionado;

      documento.map(async (daDoc) => {
        const body = {
          idEmpresa: libs.convertirANumero(idEmpresa),
          nit: daDoc?.nit,
          razonSocial: daDoc?.razonSocial,
          tipoDoc: libs.convertirANumero(tipoDoc),
          numeroDoc: libs.convertirANumero(daDoc?.numeroDoc),
          numeroFE: daDoc?.numeroFE,
          valorNeto: libs.convertirANumero(daDoc?.valorNeto),
          impuesto: libs.convertirANumero(daDoc?.impuesto),
          reteFuente: libs.convertirANumero(daDoc?.reteFuente),
          reteIva: libs.convertirANumero(daDoc?.reteIva),
          periodo: libs.convertirANumero(periodo),
        };

        const resp = await axios({
          method: "post",
          url: libs.location() + "api/documento",
          headers: {
            authorization: `Bearer ${auhtCook}`,
          },
          data: body,
        });

        // console.log(resp?.data);
      });

      setStatusMenssage(true);
      setMensajeError("Se Cargo con exito");
      setTimeout(() => {
        setStatusMenssage(false);
      }, 2000);
    }
  };

  return (
    <Layout head={<div>IMPORTACION DE DATOS</div>}>
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

      <div className="list-group">
        {data &&
          data.map((doc) => {
            // console.log(doc);   path + "/" + doc.id
            return (
              <div className="form-check form-check-inline" key={doc.id}>
                <input
                  className="form-check-input"
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

      {statusMenssage && (
        <>
          <div className="alert alert-danger" role="alert">
            {mensajeError}
          </div>
        </>
      )}

      <br />

      <div className="card" style={{ width: "100%" }}>
        <a className="pe-auto text-decoration-none" onClick={guardarDatosBD}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-cloud-download"
            viewBox="0 0 16 16"
          >
            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
          </svg>
          &nbsp;&nbsp;&nbsp;Guarda los datos
        </a>
        <br />
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
            <table className="table table-bordered">
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
                  return(
                    <tr key={key}>
                        <td>{doc?.nit}</td>
                        <td>{doc?.razonSocial}</td>
                        <td>{doc?.numeroDoc}</td>
                        <td>{doc?.numeroFE}</td>
                        <td>{doc?.valorNeto}</td>
                        <td>{doc?.impuesto}</td>
                        <td>{doc?.reteFuente}</td>
                        <td>{doc?.reteIva}</td>
                      </tr>
                  )
                }
                      
                    )
                  }
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
  const resp = await axios({
    method: "get",
    url: libs.location() + "api/tipodocumento",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const json = resp.data;

  return { props: { data: json } };
}

export default importacion;
