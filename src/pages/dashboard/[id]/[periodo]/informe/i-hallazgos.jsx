import React, { useState } from "react";
import Layout from "../../../../../components/layout/Body";
import axios from "axios";
import libs from "../../../../../libs/util";
import InformeVisita from "../../../../../libs/pdf/informeVisita/Informe";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const hallazgos = ({ hallazgo, hallazgosGeneral }) => {
  // console.log(hallazgosGeneral);
  const [hallazgoo, setHallazgoo] = useState("");
  const router = useRouter();

  // console.log(hallazgo)
  // console.log(hallazgosGeneral)

  const guardarHallazgo = async () => {
    const token = cookie.get("__session");
    const empresaId = router?.query?.id;
    const periodo = router?.query?.periodo;

    if (hallazgoo != "") {
      const data = {
        hallazgo: hallazgoo,
        empresaId,
        periodo,
      };
      // console.log(data)
      const hallazgos = await axios({
        method: "post",
        url: libs.location() + "/hallazgos",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: data,
      });

      router.reload();
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <div
            className="card text-white bg-secondary"
            style={{ display: "grid", placeContent: "center" }}
          >
            <strong>Agrega mas anotaciones del periodo</strong>
          </div>
          <div
            className="card p-3"
            style={{ display: "grid", placeContent: "center" }}
          >
            <textarea
              rows={5}
              className="border border-primary border-4"
              onChange={(e) => setHallazgoo(e.target.value)}
            />

            <br />
            <br />

            <button className="btn btn-primary" onClick={guardarHallazgo}>
              Guardar
            </button>
          </div>
          <ul>
            <br />
            <div
              className="card text-white bg-secondary"
              style={{ display: "grid", placeContent: "center" }}
            >
              <strong>Hallazgos generales del periodo.</strong>
            </div>

            {hallazgosGeneral &&
              hallazgosGeneral.map((gen) => {
                return (
                  <li className="list-group-item " key={gen?.id}>
                    <div className="card p-2" key={gen?.id}>
                      <div>{gen?.hallazgo}</div>
                    </div>
                    <br />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col">
          <div
            className="card text-white bg-secondary"
            style={{ display: "grid", placeContent: "center" }}
          >
            <strong>Hallazgos por documento.</strong>
          </div>
          <div>
            <ul>
              {hallazgo &&
                hallazgo.map((hall) => {
                  return (
                    <li className="list-group-item " key={hall?.numeroDoc}>
                      <div className="card p-2">
                        <div>
                          <strong>{hall?.nombre}</strong>
                        </div>
                        <br />
                        <div>
                          <strong>Numero Documento:</strong> {hall?.numeroDoc}
                        </div>
                        <br />
                        <div>
                          <strong>Hallazgo:</strong> {hall?.hallazgo}
                        </div>
                        <br />
                        <div>
                          <strong>Accion correctiva:</strong>{" "}
                          {hall?.accionCorrectiva}
                        </div>
                      </div>
                      <br />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const idEmpresa = ctx?.query?.id;
  const periodo = ctx?.query?.periodo;
  const token = ctx?.req?.cookies?.__session;
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

  // console.log(hallazgosGenerales)

  return {
    props: {
      hallazgo: hallazgos?.data,
      hallazgosGeneral: hallazgosGenerales?.data,
    },
  };
}

export default hallazgos;
