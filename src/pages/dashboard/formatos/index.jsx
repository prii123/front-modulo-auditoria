import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import Layout from "../../../components/layout/Body";
import libs from '../../../libs/util'
import axios from "axios";
import cookie from "js-cookie";
import CartaLaboralSencilla from './components/cartaLabolarSencilla';
import CartaLaboralOtrosIngresos from './components/cartaLaboralCompuesta';
import ComposicionAccionaria from './components/ComposicionAccionaria';



const formatos = ({ firmas, empresas }) => {

  /*
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



  } */

  const [selectedOption, setSelectedOption] = useState(null);

  const handleItemClick = (contenido) => {
    handleButtonClick(contenido?.contenido);
    setSelectedOption(contenido?.id);
  };



  const listaBotones = [
    { id: 1, nombre: "Carta Laboral Sencilla", contenido: <CartaLaboralSencilla firmas={firmas} empresas={empresas} /> },
    { id: 2, nombre: "Carta Laboral Diversos Ingresos", contenido: <CartaLaboralOtrosIngresos firmas={firmas} empresas={empresas} /> },
    { id: 3, nombre: "Composicion Accionaria", contenido: <ComposicionAccionaria firmas={firmas} empresas={empresas} /> },
    // Más botones...
  ];

  const [contenidoVisible, setContenidoVisible] = useState(null);

  // Función para mostrar el contenido del botón seleccionado
  const handleButtonClick = (contenido) => {
    setContenidoVisible(contenido);
  };




  return (
    <Layout>

      <Card style={{ minHeight: "100vh" }}>
        <Card.Body>
          <Row>
            {/* Columna izquierda (Lista de botones) */}
            <Col md={4}>
              <ListGroup>
                {listaBotones.map((boton) => (
                  <ListGroup.Item
                    key={boton.id}
                    onClick={() => handleItemClick(boton)}
                    style={{
                      backgroundColor: selectedOption === boton.id ? '#007bff' : '',
                      color: selectedOption === boton.id ? '#fff' : ''
                    }}
                  >
                    {boton.nombre}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            {/* Columna derecha (Contenido de botón seleccionado) */}
            <Col md={8}>
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



export async function getServerSideProps(ctx) {
  try {
    const token = ctx?.req?.cookies?.__session;


    const jsonFirmas = await axios({
      method: "get",
      url:
        libs.location() + `/firmas`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const firmas = jsonFirmas?.data || [];


    const jsonEmpresas = await axios({
      method: "get",
      url:
        libs.location() + `/empresas`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const empresas = jsonEmpresas?.data?.data || [];




    return { props: { firmas, empresas } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } }; // Si ocurre algún error, asignamos un array vacío como valor predeterminado
  }
}



export default formatos