import { useRef, useState } from "react";
import { useAuth } from "../libs/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "../components/utiles/Alertas";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPasword] = useState(null);
  const [colorAlert, setColorAlert] = useState("");
  const [descripcionAlert, setDescripcionAlert] = useState("");

  const router = useRouter();
  const { signIn } = useAuth();

  const [message, setMessage] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();
    if (email == null || email == "") {
      setColorAlert("danger");
      setDescripcionAlert("Por favor Ingresa el correo");
      setTimeout(() => {
        setColorAlert("");
        setDescripcionAlert("");
      }, 3000);
    } else if (password == null || password == "") {
      setColorAlert("danger");
      setDescripcionAlert("Por favor Ingresa su Password");
      setTimeout(() => {
        setColorAlert("");
        setDescripcionAlert("");
      }, 3000);
    } else {
      signIn({ email, password }).then((ress) => {


        setMessage(ress);
        if (ress?.pass) router.push("/dashboard");


        if (ress?.message && ress?.pass == false) {
          setColorAlert("alert-red");
          setDescripcionAlert(ress?.message);
          setTimeout(() => {
            setColorAlert("");
            setDescripcionAlert("");
          }, 5000);
        }
      });
    }
  }

  return (
    <div
      className="vw-100 vh-100"
      style={{
        backgroundColor: "#000000",
        display: "grid",
        placeContent: "center",
        height: "100vh",
      }}
    >
      <Alert color={colorAlert} descripcion={descripcionAlert} key={1} />
      <div className="container">
        <div>
          <div>
            <input
              className="input-personalizado"
              type="text"
              placeholder="email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
          </div>
          <br />
          <br />
          <div>
            <input
              className="input-personalizado"
              type="password"
              placeholder="password"
              onChange={(e) => {
                e.preventDefault();
                setPasword(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <button className="input-personalizado" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
