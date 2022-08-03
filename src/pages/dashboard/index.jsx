import React, {useEffect} from "react";
import Link from "next/link";
import Layout from "../../components/layout/Body";
import axios from 'axios'
import libs from "../../libs/util";

const index = ({ people }) => {
  // console.log(people[0].username)
   // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Layout head={<div className="">{people[0]?.username?.toUpperCase()}</div>}>
      {/* <Link href={"/dashboard/empresas"}>
        <a>ir a empresas</a>
      </Link> */}
      {JSON.stringify(people[0]?.email)}

      
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const token = ctx?.req?.cookies?.__session;
  const resp = await axios({
    method: "get",
    url: libs.location() + "api/user",
    headers: {
      authorization: `Bearer ${token}`,
    }, 
  });

  const json = resp.data
  // const json = await myGet("api/user", ctx);

  return { props: { people: json } };
}

export default index;
