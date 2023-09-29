import React, { useState } from "react";
import Layout from "../../../components/layout/Body";
import cookie from "js-cookie";
import libs from '../../../libs/util'
import axios from "axios";
import Alerta from "../../../components/utiles/Alertas";
import { Form, Row, Col, Button } from 'react-bootstrap';

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
      <Form>
        <Row className="mb-3">
          <Form.Label htmlFor="nit" className="col-sm-2 col-form-label">
            NIT
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              id="nit"
              onChange={(e) => setNit(e.target.value)}
            />
          </Col>

          <Form.Label htmlFor="dv" className="col-sm-2 col-form-label">
            DV
          </Form.Label>
          <Col sm={2}>
            <Form.Control
              id="dv"
              onChange={(e) => setDv(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label htmlFor="razonSocial" className="col-sm-2 col-form-label">
            RAZON SOCIAL
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              id="razonSocial"
              onChange={(e) => setRazonSocial(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label htmlFor="direccion" className="col-sm-2 col-form-label">
            DIRECCION
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              id="direccion"
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label htmlFor="ciudad" className="col-sm-2 col-form-label">
            CIUDAD
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              id="ciudad"
              onChange={(e) => setCiudad(e.target.value)}
            />
          </Col>
        </Row>

        <div className="mb-3">
          <Button className="btn btn-primary" onClick={guardarDatos}>
            Guardar
          </Button>

          {alert && <Alerta descripcion={descripcion} color={color} />}
        </div>
      </Form>
    </div>

      </>
    </Layout>
  );
};

export default crear;
