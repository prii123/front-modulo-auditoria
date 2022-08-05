import React from "react";
import Layout from "../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../libs/util";

const retencion = ({ tipoRetencion, retenciones }) => {

  return (
    <Layout head={'ANEXO DE LA DECLARACION DE RETENCION EN LA FUENTE'}>
      
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
          <tbody className="table-group-divider" style={{fontSize: '.9rem'}}>
            {retenciones &&
              retenciones.map((ret, key) => {
                return (
                  <tr key={key + 1}>
                    <th scope="row">{key + 1}</th>
                    <td>{ret.nit}</td>
                    <td>{ret.razonSocial}</td>
                    <td>{ret.numeroDoc}</td>
                    <td>{ret.valorNeto}</td>
                    <td>{ret.reteFuente}</td>
                    <td>{Number.parseFloat((ret.reteFuente/ret.valorNeto)*100).toFixed(2)  + " %"}</td>
                    <td>
                      <div className="row g-2">
                        <div className="col-md">
                          <div className="form">
                            <select
                              className="form-select"
                              id="floatingSelectGrid"
                            >
                                <option selected="">Selecciona Retencion</option>
                                {tipoRetencion && tipoRetencion.map((opcion)=>{
                                    return(<option key={opcion?.id} value={opcion?.id}>{opcion?.concepto}</option>)
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>


      <div></div>

      <br/>
      <br/>
      <br/>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const idEmpresa = ctx?.query.idEmpresa;
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

  return {
    props: {
      tipoRetencion: tipoRetencion?.data,
      retenciones: retencionesPracticadas?.data,
    },
  };
}

export default retencion;
