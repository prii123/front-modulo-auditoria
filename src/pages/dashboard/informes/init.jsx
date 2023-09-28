import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Body";
import Link from "next/link";
import { myGet } from "../../../libs/fetchApi";
import { useRouter } from "next/router";
import PDF from "../../../libs/pdf/formulario350/Informe";
import axios from "axios";
import libs from "../../../libs/util";
import InformeVisita from "../../../libs/pdf/informeVisita/Informe";
import InformeAnexoRetencion from "../../../libs/pdf/anexoFormulario350/Informe";
const Periodos = ({ periodos }) => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const establecer = (id) => {
    setStatus(id);
  };
  const hanleCliack = (params) => {
    router.push("?per=" + params);
  };
  return (
    <div className="scroll-container" >
      <ul className="list-group">
        {periodos &&
          periodos.map((item) => {
            return (
              <button
                type="button"
                className="btn btn-light"
                onClick={() => hanleCliack(item.periodo)}
                key={item.periodo}
              >
                <div>
                  <li
                    onClick={() => establecer(item.periodo)}
                    className={`list-group-item ${status == item.periodo ? "active" : "none"
                      }`}
                    id={item.periodo}
                  >
                    {item.periodo}
                  </li>
                </div>
              </button>
            );
          })}
      </ul>
    </div>
  );
};

const Empresas = ({ empresas }) => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const establecer = (id) => {
    setStatus(id);
  };
  const hanleCliack = (params) => {
    const periodo = router.query.per;
    router.push("?per=" + periodo + "&emp=" + params);
  };
  return (
    <div className="scroll-container">
      <ul className="list-group">
        {empresas &&
          empresas.map((item) => {
            return (
              <button
                type="button"
                className="btn btn-light"
                onClick={() => hanleCliack(item.id)}
                key={item.id}
              >
                <div>
                  <li
                    onClick={() => establecer(item.id)}
                    className={`list-group-item ${status == item.id ? "active" : "none"
                      }`}
                    id={item.periodo}
                  >
                    {item.razonSocial}
                  </li>
                </div>
              </button>
            );
          })}
      </ul>
    </div>
  );
};

const Informes = ({ form, informe, anexo }) => {
  // console.log(JSON.parse(informe).body.documentos);
  // console.log(anexo)
  return (
    <div className="row scroll-container">
      <div className="col">
        {form?.length > 0 ? <PDF nombre={"350"} data={form} /> : null}
      </div>
      <div className="col">
        {JSON.parse(informe).body.documentos.length > 0 ? (
          <InformeVisita
            nombre={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={36}
                height={36}
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            }
            data={JSON.parse(informe)}
          />
        ) : null}{" "}
      </div>
      <div className="col">
        {anexo?.length > 0 ? (
          <InformeAnexoRetencion nombre={"anexo"} data={anexo} />
        ) : null}
      </div>
    </div>
  );
};

const index = ({
  periodos,
  empresas,
  formulario,
  informeVisita,
  informeAnexoRetencion,
}) => {
  return (
    <Layout>
      <div className="container text-center">
        <div className="row">
          <div className="col-3">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy-example bg-light p-3 rounded-2"
              tabIndex="0"
            >
              <Periodos periodos={periodos} />
            </div>
          </div>
          <div className="col-4">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy-example bg-light p-3 rounded-2"
              tabIndex="0"
            >
              <Empresas empresas={empresas} />
            </div>
          </div>
          <div className="col-5 ">
            <Informes
              form={formulario}
              informe={informeVisita}
              anexo={informeAnexoRetencion}
            />
          </div>
        </div>

        {/* <Image src={img} alt="item" width="400" height="300" /> */}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const periodo = ctx?.query?.per || 0;
  const idEmpresa = ctx?.query?.emp || 0;

  const json = await myGet("/informes/periodos-por-usuario", ctx);

  const empresas = await myGet("/informes/empresas-por-periodo/" + periodo, ctx);

  const formu350 = await myGet(
    `/retencion-fuente/totales-retencion/${idEmpresa}/${periodo}`,
    ctx
  );

  const token = ctx?.req?.cookies?.__session;


  const res = await axios({
    method: "get",
    url:
      libs.location() +
      "/informes/consultar/" +
      idEmpresa +
      "/" +
      periodo,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });


  const hallazgos = await axios({
    method: "get",
    url:
      libs.location() + "/hallazgos/" + periodo + "/" + idEmpresa,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const hallazgosGenerales = await axios({
    method: "get",
    url:
      libs.location() + "/hallazgos/generales/" + periodo + "/" + idEmpresa,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

 

  const info = JSON.stringify({
    head: {
      fecha: libs.formatFechaLarga(new Date()),
      dirigido: res.data[0]?.razonSocial,
      logo: await libs.urlImgBase64("https://res.cloudinary.com/dz7jl3nbg/image/upload/v1659536608/ayc_ve1zdz.jpg")
    },
    asunto: {
      asunto: "REVISIÓN DE LA INFORMACIÓN CONTABLE",
      delegado: res.data[0]?.name,
    },
    body: {
      periodo: res.data[0]?.periodo,
      documentos: res.data,
    },
    hallazgo: hallazgos?.data,
    hallazgosGenerales: hallazgosGenerales?.data
  });


  const anexoRetencion = await axios({
    method: "get",
    url:
      libs.location() +
      "/retencion-fuente/anexo-retencion/" +
      idEmpresa +
      "/" +
      periodo,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // console.log(anexoRetencion.data)

  const detalleAnexo = anexoRetencion?.data;

  // const detalleAnexo = {
  //   detalleAnexo
  // }

  return {
    props: {
      periodos: json,
      empresas: empresas,
      formulario: formu350,
      informeVisita: info,
      informeAnexoRetencion: detalleAnexo,
    },
  };
}

export default index;
