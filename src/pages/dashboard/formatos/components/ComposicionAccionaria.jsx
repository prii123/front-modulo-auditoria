import React, { useState } from 'react'
import { Card, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import PdfComposicionAccionaria from '../../../../libs/pdf/formatos/composicionAccionaria/ComposicionAccionaria';

import libs from '../../../../libs/util'

import axios from "axios";
import cookie from "js-cookie";
import Picker from './Picker';




const ComposicionAccionaria = ({ firmas, empresas }) => {
    const auhtCook = cookie.get("__session");
    const [firmaId, setfirmaId] = useState(0)
    const [empresaId, setEmpresaId] = useState(0)
    const [status, setStatus] = useState(false)
    const [data, setData] = useState({})

    const handleOptionSelect = (selectedOption) => {
        // Hacer algo con la opción seleccionada, como enviarla al servidor o usarla en otro lugar del componente.
        setfirmaId(selectedOption)
    };

    const handleOptionSelectEmpresa = (selectedOption) => {
        // Hacer algo con la opción seleccionada, como enviarla al servidor o usarla en otro lugar del componente.
        setEmpresaId(selectedOption)
    };


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



            if (true) {


                const datosJson = {

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

                }

                setData(datosJson)
                setStatus(true)

                console.log(datosJson)
            }


        }



    }


    return (
        <Card style={{ minHeight: "100vh" }}>
            <Card.Body>

                {/* --------------------------------------------------------------------------------------------------- */}

                <Card >
                    <Card.Body>
                        <Row >
                            <Col sm={6}>
                                <Form.Group controlId="firmas">
                                    <Form.Label> Firmas Contador </Form.Label>
                                    <Picker options={firmas} onSelect={handleOptionSelect} nombre={"Firmas"} />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="empresa">
                                    <Form.Label>Empresa </Form.Label>
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
                                <Button onClick={guardarInformacionYgenerarCert}>Preparar Archivo</Button>
                            </Col>
                            <Col sm={6}>
                                {status != "" && <PdfComposicionAccionaria data={data} />}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>


            </Card.Body>
        </Card>
    )
}

export default ComposicionAccionaria