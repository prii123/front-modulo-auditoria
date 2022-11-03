import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Body";
import { myGet } from "../../libs/fetchApi";
import Alerta from "../../components/utiles/Alertas";

const index = ({ people }) => {
  // console.log(people[0].username)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [alert, setAlert] = useState(false);

  return (
    <Layout head={<div className="">{people[0]?.username?.toUpperCase()}</div>}>
      {/* <Link href={"/dashboard/empresas"}>
        <a>ir a empresas</a>
      </Link> */}
      {JSON.stringify(people[0]?.email)}
      <br />

      {alert && <Alerta descripcion={"este es un mensaje de pruebas"} color="alert-green" />}

      <button onClick={()=>{
        setAlert(true)
        // setTimeout(() => {
        //   setAlert(false)
        // }, 1000)
      }}>test</button>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  // const token = ctx?.req?.cookies?.__session;
  // const resp = await axios({
  //   method: "get",
  //   url: libs.location() + "api/user",
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });

  // const json = resp.data
  const json = await myGet("api/user", ctx);

  return { props: { people: json } };
}

export default index;
