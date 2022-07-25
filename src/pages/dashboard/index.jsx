import React from "react";
import Link from "next/link";
import Layout from "../../components/layout/Body";
import { myGet } from "../../libs/fetchApi";

const index = ({ people }) => {
  // console.log(people[0].username)
  return (
    <Layout>
      <Link href={"/dashboard/empresas"}>
        <a>ir a empresas</a>
      </Link>
      {JSON.stringify(people[0]?.email)}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const json = await myGet("api/user", ctx);

  return { props: { people: json } };
}

export default index;
