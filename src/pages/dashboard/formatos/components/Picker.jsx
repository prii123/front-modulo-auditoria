import React, { useState } from 'react';
import {  Form } from 'react-bootstrap';



const Picker = ({ options, onSelect, nombre }) => {
    return (
      <Form.Select onChange={(event) => onSelect(event.target.value)}>
        <option value="">{nombre}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre ? option?.nombre : option?.razonSocial}
          </option>
        ))}
      </Form.Select>
    );
  };



  export default Picker