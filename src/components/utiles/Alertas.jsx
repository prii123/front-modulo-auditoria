import React from "react";

const Alertas = ({ descripcion, color }) => {
    const [displayAlerta, setDisplayAlerta] = React.useState('fixed')

  return (
    <> 
      <div className={`alert alert-${color} alert-dismissible d-${displayAlerta} fixed-top  start-50 w-50 hover-cards`} role="alert" id="alertaComponent">
        <h4>{descripcion.toUpperCase()}</h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={()=>{
            setDisplayAlerta('none')
          }}
        ></button>
      </div>
      {/* <div id="liveAlertPlaceholder"></div>
      <div
        className={`alert alert-${color} close`}
        role="alert"
        style={{
        //   display: 'absolute',
          position: 'sticky',
          width: "100%",
          left: 0,
          bottom: 0,
        }}
      >
        {descripcion}
      </div> */}
    </>
  );
};

export default Alertas;
