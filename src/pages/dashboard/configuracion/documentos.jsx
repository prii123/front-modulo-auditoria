import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Layout from "../../../components/layout/Body";
import { ListGroup, ListGroupItem, Button, Form, FormControl, InputGroup } from 'react-bootstrap'; // Importa el componente ListGroup de react-bootstrap
import axios from "axios";
import libs from "../../../libs/util";
import cookie from "js-cookie";

const documentos = ({ data }) => {

    const [nombreDocumento, setNombreDocumento] = useState('');
    const auhtCook = cookie.get("__session");
    const router = useRouter();

    const handleAgregarDocumento = async () => {
        try {

            if (nombreDocumento) {
                // Realiza la solicitud HTTP con el método delete
                const response = await axios({
                    method: "post",
                    url: libs.location() + `/documentos-config`,
                    headers: {
                        Authorization: `Bearer ${auhtCook}`,
                    },
                    data: {
                        nombre: nombreDocumento
                    }

                });

                // Si la eliminación es exitosa, redirige a la lista de documentos nuevamente
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    setNombreDocumento("")
                    router.push('/dashboard/configuracion/documentos');
                }
            }


        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al eliminar el documento:', error);
        }
    };


    const handleModificarDocumento = async (id) => {
        try {

            if (nombreDocumento) {
                // Realiza la solicitud HTTP con el método delete
                const response = await axios({
                    method: "patch",
                    url: libs.location() + `/documentos-config/${id}`,
                    headers: {
                        Authorization: `Bearer ${auhtCook}`,
                    },
                    data: {
                        nombre: nombreDocumento
                    }

                });

                // Si la eliminación es exitosa, redirige a la lista de documentos nuevamente
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    setNombreDocumento("")
                    router.push('/dashboard/configuracion/documentos');

                }
            }

        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al eliminar el documento:', error);
        }
    };


    const handleEliminarDocumento = async (id) => {
        try {

            // Realiza la solicitud HTTP con el método delete
            const response = await axios.delete(libs.location() + `/documentos-config/${id}`, {
                headers: {
                    Authorization: `Bearer ${auhtCook}`,
                },

            });

            // Si la eliminación es exitosa, redirige a la lista de documentos nuevamente
            if (response.status === 200) {
                setNombreDocumento("")
                router.push('/dashboard/configuracion/documentos');
            }
        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al eliminar el documento:', error);
        }
    };


    return (
        <Layout>

            {/* Formulario para agregar documento */}
            <Form>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Nombre del documento"
                        aria-label="Nombre del documento"
                        aria-describedby="basic-addon2"
                        value={nombreDocumento}
                        onChange={(e) => setNombreDocumento(e.target.value)}
                    />
                    <InputGroup>
                        <Button variant="success" onClick={handleAgregarDocumento}>
                            Agregar
                        </Button>
                    </InputGroup>
                </InputGroup>
            </Form>

            {/* Lista de documentos */}
            <ListGroup>
                {data.map((item) => (
                    <ListGroupItem key={item.id} action>

                        <h3>{item.nombre}</h3>
                        <div>
                            <a className="btn btn-info btn-sm" onClick={() => handleModificarDocumento(item.id)}>
                                Modificar
                            </a>
                            <a className="btn btn-danger btn-sm" onClick={() => handleEliminarDocumento(item.id)} >
                                Eliminar
                            </a>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Layout>
    );
};



export async function getServerSideProps(ctx) {
    try {
        const token = ctx?.req?.cookies?.__session;


        const json = await axios({
            method: "get",
            url:
                libs.location() + `/documentos-config`,
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



export default documentos;