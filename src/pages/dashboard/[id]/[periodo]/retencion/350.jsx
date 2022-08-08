import React from "react";
import Layout from "../../../../../components/layout/Body";
import PDF from "../../../../../libs/pdf/formulario350/Informe";
import axios from "axios";
import libs from "../../../../../libs/util";
import cookie from 'js-cookie';
import { useRouter } from "next/router";
const index = ({formulario350}) => {
  // console.log(formulario350[0])
  const router = useRouter();
  const token = cookie.get('__session');
  const idEmpresa = router.query.id;
  const periodo = router.query.periodo;


  const onClic = async() =>{
    const totalRetencion = await axios({
      method: "get",
      url: libs.location() + `api/preparar-total-retencion/${idEmpresa}/${periodo}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(totalRetencion)
  }
  return (
    <Layout>
      <button onClick={onClic}>Actualizar</button>
      <PDF data={formulario350} /> 
      350
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.__session;
  const idEmpresa = ctx?.query.id;
  const periodo = ctx?.query.periodo;

  const totalRetencion = await axios({
    method: "get",
    url: libs.location() + `api/consulta-total-retencion/${idEmpresa}/${periodo}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });



  // console.log(retencionesPracticadas)

  return {
    props: {
      formulario350: totalRetencion?.data
    },
  };
}

export default index;
