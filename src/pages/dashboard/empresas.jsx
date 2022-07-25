import React from "react";
import Link from "next/link";
import Layout from "../../components/layout/Body";
import { myGet } from "../../libs/fetchApi";
const empresas = ({ data }) => {
  // console.log(data[0]);
  return (
    <Layout>
      {/* {JSON.stringify(data)} */}
      <ul className="list-group">
        {data?.map((emp, key) => {
          return (
            <div key={key}>
              <Link href={`/dashboard/[id]`} as={`/dashboard/${emp?.id}`}>
                <li className="list-group-item">
                  {emp?.nit + " - " + emp?.razonSocial}
                </li>
              </Link>
            </div>
          );
        })}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const json = await myGet("api/empresas", ctx);

  return { props: { data: json } };
}

export default empresas;
