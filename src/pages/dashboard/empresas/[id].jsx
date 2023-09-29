import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";
import cookie from "js-cookie";
import axios from "axios";
import libs from "../../../libs/util";
import Alerta from "../../../components/utiles/Alertas";

const modificar = ({ data }) => {
  const [nit, setNit] = useState("");
  const [dv, setDv] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [autorr, setAutorr] = useState('');
  const [idSadi, setIdSadi] = useState('');

  const [alert, setAlert] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");

  // console.log(data)

  const guardarDatos = async () => {
    const token = cookie.get("__session");
    if (
      nit != null &&
      dv != null &&
      razonSocial != null &&
      direccion != null &&
      ciudad != null &&
      autorr != null
    ) {
      const docBody = {
        nit: nit,
        digitoVerificacion: dv,
        razonSocial,
        direccion,
        ciudad,
        autorrenta: autorr,
        id_sadi: idSadi
      };
      // console.log(docBody)
      const actualizar = await axios({
        method: "put",
        url: libs.location() + "/empresas/" + data[0].id,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: docBody,
      });

      // console.log(actualizar?.data?.message)

      if (actualizar?.status <= 200) {
        setAlert(true);
        setDescripcion(actualizar?.data?.message);
        setColor("alert-green");
        setTimeout(() => {
          setAlert(false);
          setDescripcion("");
          setColor("");
        }, 1000);
      }
    } else {
      setAlert(true);
      setDescripcion("Hay un error.");
      setColor("alert-red");
      setTimeout(() => {
        setAlert(false);
        setDescripcion("");
        setColor("");
      }, 1000);
    }
  };

  useEffect(() => {
    setNit(data[0]?.nit);
    setDv(data[0]?.digitoVerificacion);
    setRazonSocial(data[0]?.razonSocial);
    setDireccion(data[0]?.direccion);
    setCiudad(data[0]?.ciudad);
    setAutorr(data[0]?.autorrenta);
    setIdSadi(data[0]?.id_sadi)
  }, []);

  //   console.log(data);

  return (
    <Layout head={data[0]?.razonSocial}>
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
                onChange={(e) => setNit(e.target.value)}
                value={nit}
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
                value={dv}
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
                value={razonSocial}
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
                value={direccion}
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
                value={ciudad}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="autorrenta" className="col-sm-2 col-form-label">
              AUTORRENTA %
            </label>
            <div className="col-sm-2">
              <input
                type="number"
                htmlFor="autorrenta"
                className="form-control hover-cards"
                id="autorrenta"
                onChange={(e) => setAutorr(e.target.value)}
                value={autorr}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="autorrenta" className="col-sm-2 col-form-label">
              ID SADI
            </label>
            <div className="col-sm-2">
              <input
                type="number"
                htmlFor="idSadi"
                className="form-control hover-cards"
                id="autorrenta"
                onChange={(e) => setIdSadi(e.target.value)}
                value={idSadi}
              />
            </div>
          </div>


          <div className="mb-3">
            <button className="btn btn-primary" onClick={guardarDatos}>
              Guardar
            </button>
          </div>

          {alert && (
            <Alerta descripcion={descripcion} color={color} />
          )}
        </div>
      </>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const idEmpresa = ctx?.query?.id;
  const token = ctx?.req?.cookies?.__session;
  //   const json = await myGet("api/empresa/" + idEmpresa, ctx);

  const actualizar = await axios({
    method: "get",
    url: libs.location() + "/empresas/" + idEmpresa,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return { props: { data: actualizar?.data?.data } };
}

export default modificar;
