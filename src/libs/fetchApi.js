import fetch from "isomorphic-unfetch";
import Router from "next/router";
import axios from "axios";
import libs from "./util";

export async function myGet(url, ctx) {
  // const cookie = await cookiee.get("__session")
  // const galleta = cookie?.split("=")[1]
  const token = ctx?.req?.cookies?.__session;

  // console.log()

  if (!token) {
    ctx.res?.writeHead(302, {
      Location: "/login",
    });
    ctx.res?.end();
    return;
  } else {
    const resp = await axios({
      method: "get",
      url: libs.location() + url,
      headers: {
        authorization: `Bearer ${token}`,
      }, 
    });

    if (resp.status === 500 && ctx.req) {
      ctx.res?.writeHead(302, {
        Location: "/login",
      });
      ctx.res?.end();
      return;
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
        Location: "/login",
      });
      ctx.res?.end();
      return;
    }

    // const json = await resp.json();
    return resp.data;
  }
}
