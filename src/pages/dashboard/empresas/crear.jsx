import React, { useState } from "react";
import Layout from "../../../components/layout/Body";
import cookie from "js-cookie";
import libs from '../../../libs/util'
import axios from "axios";
import Alerta from "../../../components/utiles/Alertas";

const crear = () => {
  const token = cookie.get("__session");
  const [nit, setNit] = useState("")
  const [dv, setDv] = useState("")
  const [razonSocial, setRazonSocial] = useState("")
  const [direccion, setDireccion] = useState("")
  const [ciudad, setCiudad] = useState("")

  const [alert, setAlert] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");

  const guardarDatos = async () => {
    if (nit != null && dv != null && razonSocial != null && direccion != null && ciudad != null) {

      const docBody = {
        nit: nit,
        digitoVerificacion: dv,
        razonSocial,
        direccion,
        ciudad
      }
      // console.log(docBody)
      const incertarEmpresa = await axios({
        method: "post",
        url: libs.location() + "/empresas",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });

      // console.log(incertarEmpresa.status)

      if (incertarEmpresa?.status <= 200) {
        setAlert(true);
        setDescripcion("Usuario creado Exitosamente.");
        setColor("alert-green");
        limpiar();

        setTimeout(() => {
          setAlert(false);
          setDescripcion("");
          setColor("");
        }, 1000);
      }


    } else {
      setAlert(true);
      setDescripcion("Todos los campos deben estar completos.");
      setColor("alert-red");


      setTimeout(() => {
        setAlert(false);
        setDescripcion("");
        setColor("");
      }, 1000);
    }
  };

  const limpiar = () => {
    let nit = document.getElementById('nit')
    let dv = document.getElementById('dv')
    let razonSocial = document.getElementById('razonSocial')
    let direccion = document.getElementById('direccion')
    let ciudad = document.getElementById('ciudad')

    nit.value = ''
    dv.value = ''
    razonSocial.value = ''
    direccion.value = ''
    ciudad.value = ''
  }


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
                id="nit"
                onChange={(e) => setNit(e.target.value)}
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
                onChange={(e) => setDv(e.target.value)}
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
                onChange={(e) => setRazonSocial(e.target.value)}
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
                onChange={(e) => setDireccion(e.target.value)}
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
                onChange={(e) => setCiudad(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={guardarDatos}>
              Guardar
            </button>

            {alert && (
            <Alerta descripcion={descripcion} color={color} />
          )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default crear;
