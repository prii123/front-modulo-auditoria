import React, { useState } from 'react';
import { Card, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

import PdfCartaLaboralDiversosIngresos from '../../../../libs/pdf/formatos/carta_laboral/ingresosDiversos';
import libs from '../../../../libs/util'

import axios from "axios";
import cookie from "js-cookie";
import Picker from './Picker';




const CartaLaboralOtrosIngresos = ({ firmas, empresas }) => {
    const auhtCook = cookie.get("__session");
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        municipio: "",
        cargo: "",
        desde: "",
        salario: 0,
        contrato: "",
    });

    const [firmaId, setfirmaId] = useState(0)
    const [empresaId, setEmpresaId] = useState(0)
    const [data, setData] = useState({})
    const [status, setStatus] = useState(false)
    const [otrosIngresos, setOtrosIngresos] = useState([])


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
        setFormValor({ ...formValor, [name]: value });
    };

    const agregarOtrosIngresos = () => {

        if (formValor?.concepto != "" && formValor?.valor > 0) {
            setOtrosIngresos((prevOtrosIngresos) => [...prevOtrosIngresos, formValor]);
        }

    }



    const guardarInformacionYgenerarCert = async () => {



        if (firmaId != 0 && empresaId != 0) {

            const firma = await axios({
                method: "get",
                url: libs.location() + `/firmas/${firmaId}`,
                headers: {
                    Authorization: `Bearer ${auhtCook}`,
                }
            });



            const empresa = await axios({
                method: "get",
                url: libs.location() + `/empresas/${empresaId}`,
                headers: {
                    Authorization: `Bearer ${auhtCook}`,
                }
            });

            const emp = empresa?.data?.data[0]



            if (isFormValid) {


                const datosJson = {
                    nombre: formData.nombre,
                    cedula: formData.cedula,
                    municipio: formData.municipio,
                    cargo: formData.cargo,
                    desde: formData.desde,
                    salario: formData.salario,
                    contrato: formData.contrato,


                    nombreFirma: firma?.data?.nombre,
                    ccFirma: firma?.data?.identificacion,
                    cargoFirma: firma?.data?.cargo,
                    telefonoFirma: firma?.data?.telefono,
                    direccionFirma: firma?.data?.direccion,
                    firma1: firma?.data?.firma,

                    empresa: emp?.razonSocial,
                    nit: emp?.nit,
                    dv: emp?.digitoVerificacion,
                    logo: emp?.logo,

                    ingresosAdicionales: otrosIngresos

                }

                setData(datosJson)
                setStatus(true)
            }


        }



    }

    const handleOptionSelect = (selectedOption) => {
        // Hacer algo con la opción seleccionada, como enviarla al servidor o usarla en otro lugar del componente.
        setfirmaId(selectedOption)
    };

    const handleOptionSelectEmpresa = (selectedOption) => {
        // Hacer algo con la opción seleccionada, como enviarla al servidor o usarla en otro lugar del componente.
        setEmpresaId(selectedOption)
    };


    return (
        <div>
            {status != "" && <PdfCartaLaboralDiversosIngresos data={data} />}


            <Card style={{ minHeight: "100vh" }}>
                <Card.Body>
                    {/* --------------------------------------------------------------------------------------------------- */}
                    <Card >
                        <Card.Body>
                            <Row >
                                <Col sm={6}>
                                    <Form.Group controlId="nombre" >
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
                                            type="number"
                                            name="cedula"
                                            value={formData.cedula}
                                            onChange={handleChange}
                                            size="sm" // Tamaño pequeño para el input
                                        />
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>De Municipio:</Form.Label>
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

                        </Card.Body>
                    </Card>

                    {/* --------------------------------------------------------------------------------------------------- */}

                    <Card >
                        <Card.Body>
                            <Row >
                                <Col sm={6}>
                                    <Form.Group controlId="firmas">
                                        <Form.Label> Firmas certificadora </Form.Label>
                                        <Picker options={firmas} onSelect={handleOptionSelect} nombre={"Firmas"} />
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group controlId="empresa">
                                        <Form.Label>Empresa Certificante</Form.Label>
                                        <Picker options={empresas} onSelect={handleOptionSelectEmpresa} nombre={"Empresas"} />
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>

                    {/* --------------------------------------------------------------------------------------------------- */}

                    <Card >
                        <Card.Body>
                            <Row >
                                <Col sm={6}>
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
                                        <Button onClick={agregarOtrosIngresos}>Agregar</Button>

                                    </Form>
                                </Col>

                                <Col sm={6}>
                                    {otrosIngresos.length > 0 ? otrosIngresos.map(ingreso => (
                                        <Form.Group controlId={ingreso.valor}>
                                            <Form.Label>{ingreso.concepto + " - " + ingreso.valor}</Form.Label>
                                        </Form.Group>
                                    )) : ""}

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>


                    {/* --------------------------------------------------------------------------------------------------- */}

                    <Card >
                        <Card.Body>
                            <Row >
                                <Col sm={6}>
                                    <Button onClick={guardarInformacionYgenerarCert}>Preparar Archivo</Button>
                                </Col>
                                <Col sm={6}>
                                    {status != "" && <PdfCartaLaboralDiversosIngresos data={data} />}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                </Card.Body>
            </Card>

        </div>
    )
}


export default CartaLaboralOtrosIngresos