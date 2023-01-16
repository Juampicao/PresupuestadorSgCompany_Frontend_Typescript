

import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Spiner from '../../atoms/spiner/Spiner';

import { MyTextInput } from '../../components/forms/components';
import CustomLogger from "../../helpers/CustomLogger";
import { ICONS } from '../../helpers/images';
import { Cliente, ICliente } from './Cliente';


const arrayClientes : Cliente[] =  [
    {
      nombreCliente: "Burbon SA",
      contactoCliente: "333124124124",
      direccionCliente: "Ciudad de la paz 1202 3b",
      correoElectronico: "BurbonSA@gmail.com",
      nombrePedido: "Pedido-Burbon",
      descripcionPedido: "la descripciooon es Pedido-Burbon",
      fechaUltimaModificacion: "2022-12-19T16:20:32.122Z",
      id: "101",
    },
    {
      nombreCliente: "Herrajes SRL",
      contactoCliente: "222222",
      direccionCliente: "Congreso 3002 5A",
      correoElectronico: "herrajesSRL@gmail",
      nombrePedido: "Pedido-Herrajes-SRL",
      descripcionPedido: "la descripciooon es Pedido-Herrajes",
      fechaUltimaModificacion: "2022-12-20T18:16:55.643Z",
      id: "102", 
   },
]
    
let customLogger = new CustomLogger();

interface Props{
  cliente: ICliente
}


const PruebaClienteFormulario = ({ cliente }: Props) => {

  const [isCargando, setIsCargando] = useState(true);
  const [nuevoCliente, setNuevoCliente] = useState<Cliente>(new Cliente()); 
  const [clientes, setClientes] = useState<Cliente[]>(arrayClientes)

  //* On select Change
  async function handleChangeSelect(e: any) {
    await setIsCargando(true)
    // Nuevo Cliente
    let obj = JSON.parse(e.target.value);
    await setNuevoCliente(obj);
    customLogger.logDebug("[handleChangeSelect], nuevoCliente:", nuevoCliente);
    await setIsCargando(false)

  }
  
  useEffect(() => {
    if (cliente) {
      setNuevoCliente(cliente)
      setIsCargando(false)
    }
    
    customLogger.logDebug("[PruebaClienteFormulario] cliente:", cliente)
    customLogger.logDebug("[PruebaClienteFormulario] arrayClientes:", clientes)

  }, [])

  useEffect(() => {
  }, [])
  
  
  return (
    <div>
      {isCargando ? <Spiner /> : 
        
        <Formik
          initialValues={{
                  cliente: "",
                  nombreCliente: nuevoCliente.nombreCliente,
                  contactoCliente: nuevoCliente.contactoCliente,
                  direccionCliente: nuevoCliente.direccionCliente ,     
                  nombrePedido: nuevoCliente.nombrePedido,
                  descripcionPedido: nuevoCliente.descripcionPedido,
                  notas: nuevoCliente.notas,
                  correoElectronico: nuevoCliente.correoElectronico,
                }}
                onSubmit={(values, e) => {
                    console.log( values )
                }}
                validationSchema={Yup.object({
                        nombreCliente: Yup.string()
                                    .max(15, 'Debe de tener 15 caracteres o menos')
                                    .required('Campo Requerido'),
                        contactoCliente: Yup.number()
                                    .min(8, 'Debe de tener 8 caracteres o mas')
                                    .required('Campo Requerido'),
                        correoElectronico: Yup.string()
                                    .email('El correo no tiene un formato válido')
                                    .required('Campo Requerido'),
                        terms: Yup.boolean()
                                    .oneOf([true], 'Debe de aceptar las condiciones'),
                        jobType: Yup.string()
                                    .notOneOf([ 'it-jr' ], 'Esta opción no es permitida.')
                                    .required('Campo Requerido')
                    })
                }>

                    {/* {(formik) => {
          return ( */}
                { ({ handleReset }) => (
        
            <Form>
              <div className="form_container">
                 {/* {nuevoCliente ? JSON.stringify(nuevoCliente) : ""} */}

                <div className="form_container_child">
                    <label htmlFor="">Seleccionar Cliente Existente</label>
                    {/* Opciones de clientes*/}
                     {clientes.length >= 1 ? (
                        <div>
                          <select
                            name=""
                            id=""
                            className="selectstyles"
                            value={nuevoCliente.nombreCliente}
                            onChange={(e) => handleChangeSelect(e)}
                          >
                            <option value="--select--" key="1">
                              --select--
                            </option>

                            {clientes.map((cliente) => (
                              <option value={JSON.stringify(cliente)} key={cliente.id}>
                                {cliente.nombreCliente}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                      
                </div>
                <div className="form_container_child">

                   <MyTextInput
                    img={ICONS.clienteImage}
                    label="Nombre Cliente"
                    name="nombreCliente"
                    placeholder="Nombre del cliente..." />
                </div>
                  
             

                <div className="form_container_child">

                  <MyTextInput
                    img={ICONS.phoneImage}
                    type="number"
                    label="Contacto Cliente"
                    name="contactoCliente"
                    placeholder="Contacto del cliente..." />

                </div>

                <div className="form_container_child">
                
                <MyTextInput
                    img={ICONS.emailImage} 
                    label="Email Address"
                    name="correoElectronico"
                    placeholder="jonh@google.com"
                    type="email" />
                </div>



                <button type="submit" >Submit</button>
              </div>
            </Form>
          )
        }
        {/* } */}
                

      </Formik>

    }
    </div>

  )

 
}

export default PruebaClienteFormulario