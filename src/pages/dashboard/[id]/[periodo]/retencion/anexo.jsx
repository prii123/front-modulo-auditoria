import React from "react";
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import Alert from '../../../../../components/utiles/Alertas'

const retencion = ({ tipoRetencion, retenciones, retencionesGuardadas }) => {

  const router = useRouter();
  const [mensajeError, setMensajeError] = React.useState("");
  const [statusMenssage, setStatusMenssage] = React.useState(false);
  const [mensajeColor, setMensajeColor] = React.useState("");


  const agregarTablaDeRetencion = async (e) => {
    const token = cookie.get('__session');

    let documentoId = parseInt(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerText)
    // console.log(idDocumento)
    const tiporetencionId = parseInt(e.target.value);
    let documento = retenciones.find(valor => valor.id == documentoId);
    // console.log(documento)
    let empresaId = documento?.empresaId;
    let periodo = documento?.periodo;
    let base = documento?.valorNeto;
    let valor = documento?.reteFuente;

    // console.log(tiporetencionId + "-" + empresaId + "-" + documentoId + "-" + periodo + "-" + base + "-" + valor)

    if (tiporetencionId && empresaId && documentoId && periodo && base && valor) {
      let datos = {
        tiporetencionId,
        empresaId,
        documentoId,
        periodo,
        base,
        valor
      }

      // console.log(datos)

      const tipoRetencion = await axios({
        method: "post",
        url: libs.location() + "/retencion-fuente",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: datos
      });

      const statusCode = tipoRetencion.status > 200 ? true : false;
      console.log(statusCode)



      if (statusCode) {
        // router.reload();
        // console.log(tipoRetencion) 
        setStatusMenssage(true);
        setMensajeColor("alert-green");
        setMensajeError("Agregado exitosamente.");
        setTimeout(() => {
          setStatusMenssage(false);
        }, 2000);
      } else {
        // console.log('hubo un error')
        setStatusMenssage(true);
        setMensajeColor("alert-red");
        setMensajeError("Recarga la pagina, algo esta mal.");
        setTimeout(() => {
          setStatusMenssage(false);
        }, 2000);
      }
    }
  }

  const borrarElemento = async (e) => {
    console.log(e.target.value)

    const token = cookie.get('__session');
    const tipoRetencion = await axios({
      method: "delete",
      url: libs.location() + "/retencion-fuente/documentoId/" + e.target.value,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (tipoRetencion.status <= 200) {
      router.reload()
    }
  }
  return (
    <Layout head={"ANEXO DE LA DECLARACION DE RETENCION EN LA FUENTE"}>
      {statusMenssage && <Alert descripcion={mensajeError} color={mensajeColor} />}
      <div className="container">
        {/* <div><button onClick={hanleClieckAgregarOtrasRtetenciones} className="btn">Agregar otras retenciones</button></div> */}
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">NIT</th>
              <th scope="col">RAZON SOCIAL</th>
              <th scope="col">DOCUMENTO</th>
              <th scope="col">NETO</th>
              <th scope="col">RETENCION</th>
              <th scope="col">porciento%</th>
              <th scope="col">TIPO</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody className="table-group-divider" style={{ fontSize: ".9rem" }}>
            {retenciones &&
              retenciones.map((ret, key) => {
                return (
                  <tr key={key + 1}>
                    <td scope="row">{ret.id}</td>
                    <td className="text-end">{ret.nit}</td>
                    <td>{ret.razonSocial}</td>
                    <td>{ret.numeroDoc}</td>
                    <td className="text-end">{libs.formatNumber(ret.valorNeto)}</td>
                    <td className="text-end">{libs.formatNumber(ret.reteFuente)}</td>
                    <td className="text-end">
                      {libs.formatNumber(Number.parseFloat(
                        (ret.reteFuente / ret.valorNeto) * 100
                      ).toFixed(2)) + " %"}
                    </td>
                    <td>
                      <div className="row g-2">
                        <div className="col-md">
                          <div className="form">
                            <select
                              className="form-select"
                              id="floatingSelectGrid"
                              onChange={agregarTablaDeRetencion}
                            >
                              <option defaultValue={0} >
                                Selecciona Retencion
                              </option>
                              {tipoRetencion &&
                                tipoRetencion.map((opcion) => {
                                  return (
                                    <option key={opcion?.id} value={opcion?.id}>
                                      {opcion?.concepto}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{retencionesGuardadas.find(retencion => retencion.documentoId == ret.id)?.concepto ? retencionesGuardadas.find(retencion => retencion?.documentoId == ret?.id)?.concepto : 'Vacio'}</td>
                    <td>
                      {retencionesGuardadas.find(retencion => retencion.documentoId == ret.id)?.concepto ? (
                        <button value={ret.id} onClick={(e) => borrarElemento(e)}>
                          borrar
                        </button>
                      ) : ''}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div></div>

      <br />
      <br />
      <br />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const idEmpresa = ctx?.query.id;
  const periodo = ctx?.query.periodo;

  const tipoRetencion = await axios({
    method: "get",
    url: libs.location() + "/retencion-fuente/tipos",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const retencionesPracticadas = await axios({
    method: "get",
    url: libs.location() + `/retencion-fuente/${idEmpresa}/${periodo}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const retencionesGuardadas = await axios({
    method: "get",
    url: libs.location() + `/retencion-fuente/anexo-retencion/${idEmpresa}/${periodo}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });



  return {
    props: {
      tipoRetencion: tipoRetencion?.data,
      retenciones: retencionesPracticadas?.data?.retencionesEnDocumento,
      retencionesGuardadas: retencionesGuardadas?.data
    },
  };
}

export default retencion;
