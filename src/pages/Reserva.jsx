import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Reserva.css';
import { TextField } from '@mui/material';

function Reserva() {

  const handleSubmit = () => {

  }

  return (
    <div className='tudo'>
      <body className='reserva-home'>
        <div className='reserva-body'>
          <button className='voltaHome-reserva'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
            <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
          </button>
          <div>
            <text className='titulo-reserva'>Faça a sua Reserva.</text>
          </div> 
          <div className='cadastro-reserva'>
            {/* <div className="icon-container-reserva">
              <FontAwesomeIcon icon={faLocationDot} style={{color: "#d6e7ff"}} className="large-icon"/>
            </div> */}
            <form className='ajustes-reserva'>
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
              </div>
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
                <TextField id="filled-basic" label="Filled" variant="outlined" size='small' InputProps={{style: {backgroundColor: "red"}}}/>  
              </div>
              <button className='botao-reserva' type="submit" onSubmit={handleSubmit}>Fazer Reserva</button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Reserva;