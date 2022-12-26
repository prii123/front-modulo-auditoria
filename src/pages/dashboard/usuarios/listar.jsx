import React from "react";
import Layout from "../../../components/layout/Body";
import { myGet } from "../../../libs/fetchApi";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const clickCrear = () => {
    router.push("/dashboard/usuarios/crear");
  };
  return (
    <div className="d-grid  d-md-block">
      <button className="btn btn-gradient text-white" type="button">
        USUARIOS
      </button>
      <button className="btn btn-primary" type="button" onClick={clickCrear}>
        Crear
      </button>
    </div>
  );
};

const listar = ({ data }) => {
  // console.log(data);
  return (
    <Layout head={<Nav />}>
      <ul>
        {data?.map((user) => {
          return (
            <div className="card mb-3 hover-cards" style={{ maxWidth: 540 }} key={user?.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={user?.image_url}
                    className="img-fluid rounded-start"
                    alt={user?.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {user?.name?.toUpperCase()}
                    </h5>
                    <p className="card-text">{user?.email}</p>
                    <p className="card-text">{user?.idRol}</p>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
        <br />
      </ul>
      <br />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const json = await myGet("/usuarios", ctx);
  return { props: { data: json?.usuarios } };
}

export default listar;
