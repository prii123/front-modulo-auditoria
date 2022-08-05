import React, {useState} from "react";
import Layout from "../../../components/layout/Body";
import cookie from "js-cookie";
import libs from '../../../libs/util'
import axios from "axios";
const crear = () => {
  const token = cookie.get("__session");
  const [nit, setNit] = useState("")
  const [dv, setDv] = useState("")
  const [razonSocial, setRazonSocial] = useState("")
  const [direccion, setDireccion] = useState("")
  const [ciudad, setCiudad] = useState("")

  const guardarDatos = async() => {
    if(nit != null && dv != null && razonSocial != null && direccion != null && ciudad != null){
   
        const docBody = {
          nit: parseInt(nit),
          digitoVerificacion: parseInt(dv),
          razonSocial,
          direccion,
          ciudad
        }
        // console.log(docBody)
        const incertarEmpresa = await axios({
          method: "post",
          url: libs.location() + "api/empresa",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: docBody,
        });

        if(incertarEmpresa?.data.affectedRows){
          window.location.reload()
        }
       
    
    }else{
      console.log("debe llenar todos los campos")
    }
  };


  return (
    <Layout head={'CREACION DE EMPRESAS'}>
      <>
        <div className="card p-3">
          <div className="mb-3 row">
            <label htmlFor="nit" className="col-sm-2 col-form-label">
              NIT
            </label>
            <div className="col-sm-5">
              <input
                htmlFor="nit"
                className="form-control hover-cards"
                id="staticEmail"
                onChange={(e)=>setNit(e.target.value)}
              />
            </div>

            <label htmlFor="dv" className="col-sm-2 col-form-label">
              DV
            </label>
            <div className="col-sm-2">
              <input
                htmlFor="dv"
                className="form-control hover-cards"
                id="dv"
                onChange={(e)=>setDv(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="razonSocial" className="col-sm-2 col-form-label">
              RAZON SOCIAL
            </label>
            <div className="col-sm-10">
              <input
                htmlFor="razonSocial"
                className="form-control hover-cards"
                id="razonSocial"
                onChange={(e)=>setRazonSocial(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="direccion" className="col-sm-2 col-form-label">
              DIRECCION
            </label>
            <div className="col-sm-10">
              <input
                htmlFor="direccion"
                className="form-control hover-cards"
                id="direccion"
                onChange={(e)=>setDireccion(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="ciudad" className="col-sm-2 col-form-label">
              CIUDAD
            </label>
            <div className="col-sm-10">
              <input
                htmlFor="ciudad"
                className="form-control hover-cards"
                id="ciudad"
                onChange={(e)=>setCiudad(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={guardarDatos}>
              Guardar
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default crear;
