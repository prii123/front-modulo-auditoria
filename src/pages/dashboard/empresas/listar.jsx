import React from "react";
import Link from "next/link";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";
import { useRouter } from "next/router";
import { Row, Col, Card, Button } from 'react-bootstrap';

const Nav = () => {
  const router = useRouter();

  const clickCrear = () => {
    router.push("/dashboard/empresas/crear");
  };
  return (
    <div className="d-grid  d-md-block">
      <button className="btn btn-gradient text-white" type="button">
        EMPRESAS
      </button>
      <button className="btn btn-primary" type="button" onClick={clickCrear}>
        Crear
      </button>
    </div>
  );
};

const empresas = ({ data }) => {
  // console.log(data);
  return (
    <Layout head={<Nav />}>


      <Row xs={1} md={2} className="g-4">
        {data?.map((emp, key) => (
          <Col key={key}>
            <Link href={`/dashboard/[id]`} as={`/dashboard/${emp?.id_sadi}`}>
              <Card className="mb-3 " style={{ maxWidth: 540, minHeight: 150 }}>
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img src={emp?.logo} alt={emp?.razonSocial} className="img-fluid rounded-start" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{emp.razonSocial.toUpperCase()}</Card.Title>
                      <Card.Text>{emp?.nit}</Card.Text>
                      <Card.Text>{emp?.direccion + " - " + emp?.ciudad}</Card.Text>

                      <Link href={`/dashboard/[id]`} as={`/dashboard/${emp?.id_sadi}`}>
                        <Button variant="primary">Auditar</Button>
                      </Link>
                      <Link href={`/dashboard/empresas/[id]`} as={`/dashboard/empresas/${emp?.id}`}>
                        <Button variant="success">Modificar</Button>
                      </Link>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>



      {/* <div className="row">
        {data?.map((emp, key) => {
          return (
            <div key={key} className="col-6">
              <Link href={`/dashboard/[id]`} as={`/dashboard/${emp?.id}`}>
                <div
                  className="card mb-3 hover-cards "
                  style={{ maxWidth: 540, maxHeight: 150 }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={emp?.logo}
                        className="img-fluid rounded-start "
                        alt={emp?.razonSocial}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {emp.razonSocial.toUpperCase()}
                        </h5>
                        <p className="card-text">{emp?.nit}</p>
                        <p className="card-text">
                          {emp?.direccion + " - " + emp?.ciudad}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div> */}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const json = await myGet("/empresas", ctx);
  // console.log(json)

  return { props: { data: json?.data } };
}

export default empresas;
