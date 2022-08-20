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

const hanleClieckAgregarOtrasRtetenciones = () =>{
  const id = router?.query?.id
  const periodo = router?.query?.periodo;

  router.push(`/${libs.principalPage()}/${id}/${periodo}/retencion/agregarotrasretenciones`)
}

const agregarTablaDeRetencion = async(e) =>{
    const token = cookie.get('__session');

    let idDocumento = parseInt(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerText)
    // console.log(idDocumento)
    const id_tipo_retencion = parseInt(e.target.value);
    let documento = retenciones.find(valor =>  valor.id == idDocumento);
    // console.log(documento)
    let idEmpresa = documento?.idEmpresa;
    let periodo = documento?.periodo;
    let base = documento?.valorNeto;
    let valor = documento?.reteFuente;

    if(id_tipo_retencion && idEmpresa && idDocumento && periodo && base && valor){
      let datos ={
        id_tipo_retencion,
        idEmpresa,
        idDocumento,
        periodo,
        base,
        valor
      }

      // console.log(datos)

      const tipoRetencion = await axios({
        method: "post",
        url: libs.location() + "api/detalle-retencion",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: datos
      });

      if(tipoRetencion.data.affectedRows > 0){
        // router.reload();
        // console.log(tipoRetencion) 
        setStatusMenssage(true);
        setMensajeColor("success");
        setMensajeError("Agregado exitosamente.");
        setTimeout(() => {
          setStatusMenssage(false);
        }, 2000);
      }else{
        console.log('hubo un error')
        setStatusMenssage(true);
        setMensajeColor("danger");
        setMensajeError("Recarga la pagina, algo esta mal.");
        setTimeout(() => {
          setStatusMenssage(false);
        }, 2000);
      }
      
      
    }

    

    // console.log(documento)


  }
  return (
    <Layout head={"ANEXO DE LA DECLARACION DE RETENCION EN LA FUENTE"}>
      {statusMenssage && <Alert descripcion={mensajeError} color={mensajeColor} />}
      <div className="container">
        <div><button onClick={hanleClieckAgregarOtrasRtetenciones} className="btn">Agregar otras retenciones</button></div>
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
                    <td className="text-end">{libs.formatNumber(ret.valorNeto) }</td>
                    <td className="text-end">{libs.formatNumber(ret.reteFuente) }</td>
                    <td className="text-end">
                      {libs.formatNumber(Number.parseFloat(
                        (ret.reteFuente / ret.valorNeto) * 100
                      ).toFixed(2))  + " %"}
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
                    <td>{retencionesGuardadas.find(retencion => retencion.idDocumento == ret.id)?.concepto ? retencionesGuardadas.find(retencion => retencion.idDocumento == ret.id)?.concepto : 'Vacio'}</td>
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
    url: libs.location() + "api/tiporetencion",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const retencionesPracticadas = await axios({
    method: "get",
    url: libs.location() + `api/retencione-practicadas/${idEmpresa}/${periodo}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // console.log(retencionesPracticadas)

  return {
    props: {
      tipoRetencion: tipoRetencion?.data,
      retenciones: retencionesPracticadas?.data.reteFuentePracticadas,
      retencionesGuardadas: retencionesPracticadas?.data.reteFuenteGuardada
    },
  };
}

export default retencion;
