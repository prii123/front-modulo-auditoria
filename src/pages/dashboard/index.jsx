import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Body";
import libs from '../../libs/util'
import axios from "axios";


const index = ({ people }) => {

  return (
    <Layout head={<div className="">{people?.name?.toUpperCase()}</div>}>
      <div>

        <div className="alert alert-success" role="alert">
          <div>
            ¡Bienvenido, {people?.name}!
          </div>
          <div>
            {people?.email}
          </div>
          <div>
            {people?.idRol == 1 ? "Cordinador" : "Contador"}
          </div>

        </div>

      </div>

    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;

  const user = await axios({
    method: "get",
    url:
      libs.location() + `/usuarios/active`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });



  return { props: { people: user?.data || null } };
}

export default index;
