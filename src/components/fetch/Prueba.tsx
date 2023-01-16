import { useState } from 'react';
import useAxios from './hooks/useAxios';
 
const Prueba = () => {
  const [accesoAPI, setAccesoAPI] = useState({ tipo: 'GET', url: 'http://localhost:4000/people' });
  const [datos, setDatos] = useState({});
 
  const { loading, errorAPI, respuestaAPI } = useAxios(accesoAPI, datos);
 
  const handleClick = (boton : string) => {
    if (boton === 'botonGet') {
      setAccesoAPI({ tipo: 'GET', url: 'http://localhost:4000/clubs' });
 
      // En un GET los datos serán ignorados, siempre mandaremos un objeto vacío
      setDatos({});
    } else if (boton === 'botonPost') {
      setAccesoAPI({ tipo: 'POST', url: 'http://localhost:4000/clubs' });
 
      setDatos({ datosUno: 'datosUno', datosDos: 'datosDos' });
    }
  };
 
  const MostrarRespuesta = () => {
    if (loading === true) {
      return <div>Cargando...</div>;
    }
 
    let respuesta = {};
 
    if (errorAPI) {
      respuesta = errorAPI;
    } else {
      respuesta = respuestaAPI;
    }
 
    return Object.keys(respuesta).map(key => {
      return (
        <div key={key}>
          {/* {key}: {JSON.stringify(respuesta[key])} */}
        </div>
      );
    });
  };
 
  return (
    <>
      <div>
        <button onClick={() => handleClick('botonGet')} type="button">Consulta GET</button>
        <button onClick={() => handleClick('botonPost')} type="button">Consulta POST</button>
      </div>
      <div>
        {/* <MostrarRespuesta /> */}
        {JSON.stringify(loading)}
        {JSON.stringify(respuestaAPI)}
        {JSON.stringify(errorAPI)}

      </div>
    </>
  );
};
 
export default Prueba