import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import Layout from "../../../components/layout/Body";

import PdfCartaLaboral from '../../../libs/pdf/formatos/carta_laboral/sencilla';
import PdfCartaLaboralDiversosIngresos from '../../../libs/pdf/formatos/carta_laboral/ingresosDiversos';
import libs from '../../../libs/util'



const CartaLaboralSencilla = ({ data }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    municipio: "",
    cargo: "",
    desde: "",
    salario: 0,
    contrato: "",
  });

  const camposRequeridos = ['nombre', 'cedula', 'municipio', 'cargo', 'desde', 'salario', 'contrato'];
  // Función para verificar si todos los campos requeridos tienen valores
  const isFormValid = camposRequeridos.every((campo) => formData[campo] !== "");


  // Función para manejar cambios en los campos de entrada
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div>

      {isFormValid != "" && <PdfCartaLaboral data={data} />}

      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>

            <Form.Group controlId="cedula">
              <Form.Label>Cédula:</Form.Label>
              <Form.Control
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>

            <Form.Group controlId="municipio">
              <Form.Label>Municipio:</Form.Label>
              <Form.Control
                type="text"
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group controlId="cargo">
              <Form.Label>Cargo:</Form.Label>
              <Form.Control
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>

            <Form.Group controlId="desde">
              <Form.Label>Desde:</Form.Label>
              <Form.Control
                type="text"
                name="desde"
                value={formData.desde}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>

            <Form.Group controlId="salario">
              <Form.Label>Salario:</Form.Label>
              <Form.Control
                type="number"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>

            <Form.Group controlId="contrato">
              <Form.Label>Tipo de Contrato:</Form.Label>
              <Form.Control
                type="text"
                name="contrato"
                value={formData.contrato}
                onChange={handleChange}
                size="sm" // Tamaño pequeño para el input
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit">Guardar</Button>
      </Form>

    </div>
  )
}


const CartaLaboralOtrosIngresos = ({ data }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    municipio: "",
    cargo: "",
    desde: "",
    salario: 0,
    contrato: "",
  });

  const camposRequeridos = ['nombre', 'cedula', 'municipio', 'cargo', 'desde', 'salario', 'contrato'];
  // Función para verificar si todos los campos requeridos tienen valores
  const isFormValid = camposRequeridos.every((campo) => formData[campo] !== "");


  // Función para manejar cambios en los campos de entrada
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  const [formValor, setFormValor] = useState({
    concepto: "",
    valor: 0,
  });

  // Función para manejar cambios en los campos de entrada
  const handleChangeValor = (event) => {
    const { name, value } = event.target;
    setFormValor({ ...formData, [name]: value });
  };


  return (
    <div>
      {isFormValid != "" && <PdfCartaLaboralDiversosIngresos data={data} />}








      <Card style={{ height: "100vh" }}>
        <Card.Body>
          <Col md={12}>

            <Col md={12}>

              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="nombre">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>

                    <Form.Group controlId="cedula">
                      <Form.Label>Cédula:</Form.Label>
                      <Form.Control
                        type="text"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>

                    <Form.Group controlId="municipio">
                      <Form.Label>Municipio:</Form.Label>
                      <Form.Control
                        type="text"
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="cargo">
                      <Form.Label>Cargo:</Form.Label>
                      <Form.Control
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>

                    <Form.Group controlId="desde">
                      <Form.Label>Desde:</Form.Label>
                      <Form.Control
                        type="text"
                        name="desde"
                        value={formData.desde}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>

                    <Form.Group controlId="salario">
                      <Form.Label>Salario:</Form.Label>
                      <Form.Control
                        type="number"
                        name="salario"
                        value={formData.salario}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>

                    <Form.Group controlId="contrato">
                      <Form.Label>Tipo de Contrato:</Form.Label>
                      <Form.Control
                        type="text"
                        name="contrato"
                        value={formData.contrato}
                        onChange={handleChange}
                        size="sm" // Tamaño pequeño para el input
                      />
                    </Form.Group>
                  </Col>
                </Row>


              </Form>

            </Col>

            {/* Columna derecha (Contenido de botón seleccionado) */}
            <Col md={6}>
              <Form >
                <Form.Group controlId="concepto">
                  <Form.Label>Concepto:</Form.Label>
                  <Form.Control
                    type="text"
                    name="concepto"
                    value={formValor.concepto}
                    onChange={handleChangeValor}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="valor">
                  <Form.Label>Valor:</Form.Label>
                  <Form.Control
                    type="number"
                    name="valor"
                    value={formValor.valor}
                    onChange={handleChangeValor}
                    required
                  />
                </Form.Group>

                <Button >Guardar</Button>
              </Form>


            </Col>
          </Col>
        </Card.Body>
      </Card>

    </div>
  )
}




const formatos = () => {
  const data = {
    nombre: "BRAYAN OBILMER VALLEJOS MUESES",
    cedula: "1085306970",
    municipio: "PASTO",
    cargo: "CONTADOR",
    desde: "01 DE AGOSTO DE 1993",
    salario: 2400000,
    contrato: "TERMINO INDEFINIDO",

    ingresosAdicionales: [
      {
        concepto: "Comisiones",
        valor: 400000
      },
      {
        concepto: "Bonificaciones",
        valor: 600000
      }
    ],



    empresa: "ANALISIS Y CONSULTORIAS SAS",
    nit: "811006790",
    dv: "2",
    logo: "https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg",

    nombreFirma: "Lenin Alberto Yepes Bedoya",
    ccFirma: "355754645",
    cargoFirma: "Representante Legal",
    telefonoFirma: "3126815066",
    direccionFirma: "cl 57 28 20",
    firma1: "https://res.cloudinary.com/dhizn2jge/image/upload/v1672097959/FIRMA_ESCANEADA_2_pwrjq6.jpg",



  }


  const listaBotones = [
    { id: 1, nombre: "Carta Laboral Sencilla", contenido: <CartaLaboralSencilla data={data} /> },
    { id: 2, nombre: "Carta Laboral Diversos Ingresos", contenido: <CartaLaboralOtrosIngresos data={data} /> },
    { id: 3, nombre: "Composicion Accionaria", contenido: "Contenido del botón 3" },
    // Más botones...
  ];

  const [contenidoVisible, setContenidoVisible] = useState(null);

  // Función para mostrar el contenido del botón seleccionado
  const handleButtonClick = (contenido) => {
    setContenidoVisible(contenido);
  };




  return (
    <Layout>

      <Card style={{ height: "100vh" }}>
        <Card.Body>
          <Row>
            {/* Columna izquierda (Lista de botones) */}
            <Col md={6}>
              <ListGroup>
                {listaBotones.map((boton) => (
                  <ListGroup.Item key={boton.id} onClick={() => handleButtonClick(boton.contenido)}>
                    {boton.nombre}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            {/* Columna derecha (Contenido de botón seleccionado) */}
            <Col md={6}>
              {contenidoVisible && (
                <div>
                  {/* <h3>Contenido Seleccionado:</h3> */}
                  <p>{contenidoVisible}</p>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>


    </Layout>
  )
}

export default formatos