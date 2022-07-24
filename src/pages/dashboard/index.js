import React from 'react'
import { myGet } from "../../libs/fetchApi";

const index = ({people}) => {
    // console.log(people)
  return (
    <>
    {JSON.stringify(people)}
    </>
  )
}


export async function getServerSideProps (ctx) {
  // console.log(ctx)
    const json = await myGet('api/empresas', ctx);

    return {props: {people: json}}
}

export default index