import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../../components/layout/Body";
import { ListGroup, ListGroupItem, Button, Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap'; // Importa el componente ListGroup de react-bootstrap
import axios from "axios";
import libs from "../../../libs/util";
import cookie from "js-cookie";

const firmas = ({ data }) => {

    const auhtCook = cookie.get("__session");
    const router = useRouter();

    const [formData, setFormData] = useState({
        nombre: "",
        identificacion: "",
        cargo: "",
        direccion: "",
        telefono: "",
        firma: ""
    });

    const [id, setId] = useState("")

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {

        try {
            if (formData) {
                // Realiza la solicitud HTTP con el método delete
                const response = await axios({
                    method: "post",
                    url: libs.location() + `/firmas`,
                    headers: {
                        Authorization: `Bearer ${auhtCook}`,
                    },
                    data: formData

                });

                // Si la eliminación es exitosa, redirige a la lista de documentos nuevamente
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    setFormData({
                        nombre: "",
                        identificacion: "",
                        cargo: "",
                        direccion: "",
                        telefono: "",
                        firma: ""
                    });
                    router.push('/dashboard/configuracion/firmas');

                }
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    const handleListItemClick = (itemData) => {
        setFormData({
            nombre: itemData.nombre,
            identificacion: itemData.identificacion,
            cargo: itemData.cargo,
            direccion: itemData.direccion,
            telefono: itemData.telefono,
            firma: itemData.firma
        });

        setId(itemData.id)
    };

    const handleModificarDocumento = async () => {
        try {

            if (formData) {
                // Realiza la solicitud HTTP con el método delete
                const response = await axios({
                    method: "patch",
                    url: libs.location() + `/firmas/${id}`,
                    headers: {
                        Authorization: `Bearer ${auhtCook}`,
                    },
                    data: formData

                });

                // Si la eliminación es exitosa, redirige a la lista de documentos nuevamente
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    setFormData({
                        nombre: "",
                        identificacion: "",
                        cargo: "",
                        direccion: "",
                        telefono: "",
                        firma: ""
                    });
                    router.push('/dashboard/configuracion/firmas');

                }
            }

        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al eliminar el documento:', error);
        }
    };


    return (
        <Layout>

            <Row>

                <Col md={6}>
                    <Form >
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="identificacion">
                            <Form.Label>Identificación:</Form.Label>
                            <Form.Control
                                type="text"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="cargo">
                            <Form.Label>Cargo:</Form.Label>
                            <Form.Control
                                type="text"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="direccion">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="telefono">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="firma">
                            <Form.Label>Firma:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firma"
                                value={formData.firma}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <InputGroup>
                            <Button variant="success" onClick={handleSubmit}>Registrar</Button>
                            <Button onClick={handleModificarDocumento}>Modificar</Button>
                        </InputGroup>

                    </Form>
                </Col>

                <Col md={6}>
                    <ListGroup>
                        {data.map((dato) => (
                            <ListGroup.Item key={dato?.id} onClick={() => handleListItemClick(dato)}>
                                <div>
                                    <strong>Nombre:</strong> {dato?.nombre}
                                </div>
                                <div>
                                    <strong>Identificación:</strong> {dato?.identificacion}
                                </div>
                                <div>
                                    <strong>Cargo:</strong> {dato?.cargo}
                                </div>
                                <div>
                                    <strong>Dirección:</strong> {dato?.direccion}
                                </div>
                                <div>
                                    <strong>Teléfono:</strong> {dato?.telefono}
                                </div>
                                <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    <strong>Firma:</strong> {dato?.firma}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

            </Row>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const token = ctx?.req?.cookies?.__session;


        const json = await axios({
            method: "get",
            url:
                libs.location() + `/firmas`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const data = json?.data || [];




        return { props: { data } };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { props: { data: [] } }; // Si ocurre algún error, asignamos un array vacío como valor predeterminado
    }
}

export default firmas