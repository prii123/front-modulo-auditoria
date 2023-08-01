import { useRef, useState } from "react";
import { useAuth } from "../libs/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "../components/utiles/Alertas";
import { Card, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

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
    <>
      <Alert color={colorAlert} descripcion={descripcionAlert} key={1} />

      <Card className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <Row>
          <Col>
            <Form.Group >
              <Form.Control
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group >
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={handleLogin}>
              Login
            </Button>
          </Col>
        </Row>
      </Card>

     
    </>
  );
}
