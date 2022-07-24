import fetch from "isomorphic-unfetch";
import Router from "next/router";
import libs from "./util";

export async function myGet(url, ctx) {
  // const cookie = await cookiee.get("__session")
  // const galleta = cookie?.split("=")[1]
  const token = ctx?.req?.cookies?.__session;

  // console.log()

  const resp = await fetch(libs.location() + url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

//   console.log(resp.status);

  if (resp.status === 500 && ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (resp.status === 500 && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (resp.status === 401 && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: libs.location() + "login",
    });
    ctx.res?.end();
    return;
  }

  const json = await resp.json();
  return json;
}
