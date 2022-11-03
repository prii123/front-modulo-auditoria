import React from "react";

const Alertas = ({ descripcion, color }) => {
  //shadow-lg p-1 mb-5 fw-bold text-white bg-${color}  d-fixed fixed-bottom  start-50 translate-middle-x w-25 text-center rounded-pill

  return (
    <> 
      <div className={` alerta-personalizada ${color}`} style={{height: '1.8rem'}} >
        <p>{descripcion?.toUpperCase()}</p>
      </div>
    </>
  );
};

export default Alertas;
