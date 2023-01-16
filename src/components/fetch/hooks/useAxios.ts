import axios from 'axios';
import { useEffect, useReducer } from 'react';
 
const reducer = (state : any, action : any) => {
   switch (action.type) {
    case 'INICIO_CONSULTA_API':
        return { ...state, loading: true, errorAPI: null, respuestaAPI: { respuesta: 'KO' } };
    case 'RESPUESTA_CONSULTA_OK':
      return { ...state, loading: false, errorAPI: null, respuestaAPI: action.payload };
    case 'RESPUESTA_CONSULTA_KO':
      return { ...state, loading: false, errorAPI: action.payload, respuestaAPI: { respuesta: 'KO' } };
    default:
      return state;
  }
};
 
const useAxios = (accesoAPI: any, datos : any) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    errorAPI: null,
    respuestaAPI: { respuesta: 'KO' },
  });
 
  useEffect(() => {
    let componenteDesmontado = false;
 
    const consultaAPI = async () => {
      dispatch({ type: 'INICIO_CONSULTA_API' });
 
      try {
        // 'data' son los datos que se envían como request body
        // Solo es válido para 'PUT', 'POST', 'DELETE y 'PATCH'
        const consulta = await axios({ method: accesoAPI.tipo, url: accesoAPI.url, data: datos });
 
        if (!componenteDesmontado) {
          dispatch({ type: 'RESPUESTA_CONSULTA_OK', payload: consulta });
        }
      } catch (error : any) {
        if (!componenteDesmontado) {
          dispatch({ type: 'RESPUESTA_CONSULTA_KO', payload: error.response });
        }
      }
    };
 
    consultaAPI();
 
    return () => {
      componenteDesmontado = true;
    };
  }, [accesoAPI.tipo, accesoAPI.url, datos]);
 
  return state;
};
 
export default useAxios;