import React from "react";
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from 'js-cookie'
import { useRouter } from "next/router";

const retencion = ({ tipoRetencion, retenciones, retencionesGuardadas }) => {
  // console.log(retencionesGuardadas)
// console.log(retencionesGuardadas.find(retencion => retencion.idDocumento == 4567)?.concepto ? retencionesGuardadas.find(retencion => retencion.idDocumento == 4567).concepto : null)
const router = useRouter(); 
const agregarTablaDeRetencion = async(e) =>{
    const token = cookie.get('__session');

    const idDocumento = parseInt(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerText)
    const id_tipo_retencion = parseInt(e.target.value);
    const documento = retenciones.find(valor =>  valor = idDocumento);

    const idEmpresa = documento?.idEmpresa;
    const periodo = documento?.periodo;
    const base = documento?.valorNeto;
    const valor = documento?.reteFuente;

    if(id_tipo_retencion && idEmpresa && idDocumento && periodo && base && valor){
      const datos ={
        id_tipo_retencion,
        idEmpresa,
        idDocumento,
        periodo,
        base,
        valor
      }

      const tipoRetencion = await axios({
        method: "post",
        url: libs.location() + "api/detalle-retencion",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: datos
      });

      if(tipoRetencion.data.affectedRows > 0){
        router.reload();
        console.log(tipoRetencion)
      }else{
        console.log('hubo un error')
      }
      
      
    }

    

    // console.log(documento)


  }
  return (
    <Layout head={"ANEXO DE LA DECLARACION DE RETENCION EN LA FUENTE"}>
      <div className="container">
        <div>HOJA DE TRABAJO</div>
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
