import React, { useState } from "react";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";
import axios from "axios";
import libs from "../../../libs/util";
import cookie from "js-cookie";
import Alerta from "../../../components/utiles/Alertas";
// import Alerta from "../../components/utiles/Alertas";
const crear = ({ data }) => {
  // console.log(data)
  const token = cookie.get("__session");

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [idRol, setIdRol] = useState(0);
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");

  const [alert, setAlert] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");


  const limpiar = () => {
    let nombre = document.getElementById('exampleFormControlInput1')
    let email = document.getElementById('exampleFormControlInput2')
    let pass1 = document.getElementById('exampleFormControlInput3')
    let pass2 = document.getElementById('exampleFormControlInput4')

    nombre.value = ''
    email.value = ''
    pass1.value = ''
    pass2.value = ''
  }
  const guardarDatos = async () => {
    if (
      name != null &&
      email != null &&
      idRol != 0 &&
      password != null &&
      pass != null
    ) {
      if (password == pass) {
        const docBody = {
          email,
          password,
          name,
          idRol: parseInt(idRol),
        };
        // console.log(docBody)
        const crearUsuario = await axios({
          method: "post",
          url: libs.location() + "/usuarios",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: docBody,
        });

        // console.log(crearUsuario)
        // console.log(crearUsuario.status)

        if (crearUsuario.status <= 210) {
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
        setDescripcion("las contraseñas no coinciden");
        setColor("alert-red");
        setTimeout(() => {
          setAlert(false);
          setDescripcion("");
          setColor("");
        }, 1000);

      }
    } else {
      setAlert(true);
      setDescripcion("debe llenar todos los campos");
      setColor("alert-red");
      setTimeout(() => {
        setAlert(false);
        setDescripcion("");
        setColor("");
      }, 1000);
    }
  };
  return (
    <Layout head={"CREACION DE USUARIO"}>
      {/* {alert && (
        <Alerta descripcion={descripcion} color={color} />
      )} */}
      <div className="card p-4">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            className="form-control hover-cards"
            id="exampleFormControlInput1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control hover-cards"
            id="exampleFormControlInput2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div className="mb-3">
          <select
            className="form-select hover-cards"
            aria-label="Default select example"
            onChange={(e) => setIdRol(e.target.value)}
          >
            <option defaultValue={0}>Selecciona el tipo de usuario</option>
            {data?.map((rol) => {
              return (
                <option value={rol.id} key={rol.id}>
                  {rol.nombre_rol.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control hover-cards"
            id="exampleFormControlInput3"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Confirma el Password
          </label>
          <input
            type="password"
            className="form-control hover-cards"
            id="exampleFormControlInput4"
            onChange={(e) => setPass(e.target.value)}
          />
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
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const json = await myGet("/usuarios/tipo-usuario", ctx);
  return { props: { data: json } };
}

export default crear;
