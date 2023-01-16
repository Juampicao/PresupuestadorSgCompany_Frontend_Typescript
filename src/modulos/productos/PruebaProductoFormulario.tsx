import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import Checkbox from "../../atoms/checkbox/Checkbox";

import Spiner from "../../atoms/spiner/Spiner";
import { MyTextInput } from "../../components/forms/components";
import { ICONS } from "../../helpers/images";
import useCheck from "../../hooks/useCheck";
import { arrayProductosPrueba, IProducto, opcionesNumerosVenta, Producto, productoVacio } from "./Producto";


interface Props{
  arrayProductos: IProducto[],
}

const ProductoFormulario = ({ arrayProductos }: Props) => {
  const [isCargando, setIsCargando] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>(productoVacio); 
  const [productosList, setProductosList] = useState<Producto[]>(arrayProductosPrueba)
  const { isChecked, changeChecked } = useCheck();
  
   /**
   * Cambiar atributos de un producto.
   * @param {*} e
   * @param {*} index
   */
  const handleProductoChange = (e: any, index : number) => {
    const { name, value } = e.target;
    const list : Producto[] = [...productosList];
    list[index][name] = value;
    setProductosList(list);
    console.log(productosList);
  };

  /**
   * Remove a product.
   * @param {*} index
   */
  const handleProductoRemove = (index : number) => {
    const list = [...productosList];
    list.splice(index, 1);
    setProductosList(list);
  };

  /**
   * Add new Product.
   */
  const handleProductAdd = () => {
    setProductosList([...productosList, ]);
  };

   // Select change
  const handleIsCheckedOther = (e: any, index: number) => {
    changeChecked();
    handleProductoChange(e, index);
  };

  
  return (
  <div>
      {isCargando ? <Spiner /> : 
        
        <Formik
          initialValues={{
                cliente: "",
                cantidad: nuevoProducto.cantidad,
                costoUnitario: nuevoProducto.costoUnitario,
                descripcion: nuevoProducto.descripcion,
                nombreMaterial: nuevoProducto.nombreMaterial,
                coeficienteVenta: nuevoProducto.coeficienteVenta,
                monedaCotizar: nuevoProducto.monedaCotizar
                }}
                onSubmit={(values, e) => {
                    console.log( values )
                }}
                validationSchema={Yup.object({
                        nombreMaterial: Yup.string()
                                    .max(5, 'Debe de tener 5 caracteres o menos')
                                    .required('Campo Requerido'),
                        cantidad: Yup.number()
                                    .required('Campo Requerido'),
                        costoUnitario:  Yup.number()
                                    .required('Campo Requerido'),
                        
                    })
                }>

                   
        { ({ handleReset }) => (
            <>
              {productosList.map((product, index : number) => (
                   <div key={index} className="form_container">
                    <div className="form-field">
                    <div>
                    <h3 className="titulos"> {index + 1}° Producto</h3>
            <Form>
              <div className="form_container">
                 {/* {nuevoCliente ? JSON.stringify(nuevoCliente) : ""} */}

                
                             {/* -------- Producto Formulario Costo  ------- */}
              <div className="form_container_child ">
                <label htmlFor="coeficienteVenta" className="tooltip">
                  % Multiplicador de Venta
                </label>
                <div className="flex">
                  {isChecked ? (
                    <input
                      type="number"
                      placeholder="completa.."
                      name="coeficienteVenta"
                      id="coeficienteVenta"
                      className="inputSelect"
                      value={product.coeficienteVenta}
                      onChange={(e) => handleProductoChange(e, index)}
                    />
                  ) : (
                    <select
                      name="coeficienteVenta"
                      id="coeficienteVenta"
                      placeholder="$"
                      className="inputSelect"
                      value={
                        product.coeficienteVenta
                          ? product.coeficienteVenta
                          : (product.coeficienteVenta = 1.5)
                      }
                      onChange={(e) => handleProductoChange(e, index)}
                    >
                      {opcionesNumerosVenta.map((opcion) => (
                        <option value={opcion} key={1}>
                          {opcion}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* HandleIsCheckedOther */}
                  <div className="flex items-center ">
                    <Checkbox
                      value2="Otro Valor"
                      onChange={(e: any) => handleIsCheckedOther(e, index)}
                      defaultChecked={
                        arrayProductos?.coeficienteVenta ? true : false
                      }
                    />
                  </div>
                </div>

                {/* Moneda */}
                <label htmlFor="coeficienteVenta" className="tooltip">
                  Moneda a cotizar
                </label>
                <select
                  name="monedaCotizar"
                  id=""
                  defaultValue={"dolar"}
                className="block  p-2 px-2 bg-gray-100 rounded-md mt-1 text-start"
                  value={product.monedaCotizar}
                  onChange={(e) => handleProductoChange(e, index)}
                >
                  <option value="peso"> Peso Argentino </option>
                  <option value="dolar"> Dolar Americano U$D </option>
                </select>
                   </div>
                  
              {/* Nombre Producto */}
                <div className="form_container_child">
                          
                <MyTextInput
                img={ICONS.phoneImage}
                type="number"
                label="Producto"
                name="nombreMaterial"
                placeholder="Producto a vender .."
                onChange={(e: any) => handleProductoChange(e, index)}
                        
                />
                <label htmlFor=""> Producto</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Producto a vender .."
                  name="nombreMaterial"
                  value={product.nombreMaterial}
                  onChange={(e) => handleProductoChange(e, index)}
                />
              </div>

                {/* <div className="form_container_child">

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
                </div> */}



                <button type="submit" >Submit</button>
              </div>
                  </Form>
              </div>
              </div>
            </div>
            ))}
              
        </>      
        )
      }
          

      </Formik>

    }
    </div>
    //     <>
    //   {productosList.map((product, index) => (
    //     <div key={index} className="form_container">
    //       <div className="form-field">
    //         <div>
    //           <h3 className="titulos"> {index + 1}° Producto</h3>

    //           {/* -------- Producto Formulario Costo  ------- */}
    //           <div className="form_container_child ">
    //             <label htmlFor="coeficienteVenta" className="tooltip">
    //               % Multiplicador de Venta
    //             </label>
    //             <div className="flex">
    //               {isChecked ? (
    //                 <input
    //                   type="number"
    //                   placeholder="completa.."
    //                   name="coeficienteVenta"
    //                   id="coeficienteVenta"
    //                   className="inputSelect"
    //                   value={product.coeficienteVenta}
    //                   onChange={(e) => handleProductoChange(e, index)}
    //                 />
    //               ) : (
    //                 <select
    //                   name="coeficienteVenta"
    //                   id="coeficienteVenta"
    //                   placeholder="$"
    //                   className="inputSelect"
    //                   value={
    //                     product.coeficienteVenta
    //                       ? product.coeficienteVenta
    //                       : (product.coeficienteVenta = 1.5)
    //                   }
    //                   onChange={(e) => handleProductoChange(e, index)}
    //                 >
    //                   {opcionesNumerosVenta.map((opcion) => (
    //                     <option value={opcion} key={1}>
    //                       {opcion}
    //                     </option>
    //                   ))}
    //                 </select>
    //               )}

    //               {/* HandleIsCheckedOther */}
    //               <div className="flex items-center ">
    //                 <Checkbox
    //                   value2="Otro Valor"
    //                   onChange={(e: any) => handleIsCheckedOther(e, index)}
    //                   defaultChecked={
    //                     arrayProductos?.coeficienteVenta ? true : false
    //                   }
    //                 />
    //               </div>
    //             </div>

    //             {/* Moneda */}
    //             <label htmlFor="coeficienteVenta" className="tooltip">
    //               Moneda a cotizar
    //             </label>
    //             <select
    //               name="monedaCotizar"
    //               id=""
    //               defaultValue={"dolar"}
    //               className="block  p-2 px-2 bg-gray-100 rounded-md mt-1 text-start"
    //               value={product.monedaCotizar}
    //               onChange={(e) => handleProductoChange(e, index)}
    //             >
    //               <option value="peso"> Peso Argentino </option>
    //               <option value="dolar"> Dolar Americano U$D </option>
    //             </select>
    //           </div>
    //           {/* Moneda */}

    //           {/* {error.coeficienteVenta ? (
    //             <Error msg="Completa el % coeficiente  de venta" />
    //           ) : (
    //             ""
    //           )} */}
    //           {/* Nombre Producto */}
    //           <div className="form_container_child">
    //             <label htmlFor=""> Producto</label>
    //             <input
    //               autoComplete="off"
    //               type="text"
    //               placeholder="Producto a vender .."
    //               name="nombreMaterial"
    //               value={product.nombreMaterial}
    //               onChange={(e) => handleProductoChange(e, index)}
    //             />
    //           </div>
    //           {/* Cantidad  */}
    //           <div className="form_container_child">
    //             <label> Cantidad</label>
    //             <input
    //               type="number"
    //               placeholder="Cantidad a vender.."
    //               name="cantidad"
    //               value={product.cantidad}
    //               onChange={(e) => handleProductoChange(e, index)}
    //             />
    //           </div>
    //           {/* {error ? <Error msg="Completa la cantidad total" /> : ""} */}

    //           {/* Costo Unitario  y Precio Venta Unitario*/}
    //           <div className="form_container_child">
    //             <label> Costo Unitario</label>
    //             <input
    //               type="number"
    //               placeholder="Agrega el costo del producto"
    //               name="costoUnitario"
    //               value={product.costoUnitario}
    //               onChange={(e) => handleProductoChange(e, index)}
    //             />
    //           </div>
    //           {/* {error ? <Error msg="Completa el costo unitario" /> : ""} */}

    //           {/* Descripcion */}
    //           <div className="form_container_child">
    //             <label> Descripcion</label>
    //             <input
    //               autoComplete="off"
    //               type="text"
    //               placeholder="Agrega una descripcion al producto"
    //               name="descripcion"
    //               value={product.descripcion}
    //               onChange={(e) => handleProductoChange(e, index)}
    //             />
    //           </div>

    //           <div className="flex my-3 gap-x-3 pl-3">
    //             {productosList.length - 1 === index &&
    //               productosList.length < 8 && (
    //                 <button
    //                   type="button"
    //                   onClick={handleProductAdd}
    //                   className="bg-green-600 text-center text-white py-2.5 px-5 rounded-xl "
    //                 >
    //                   <span>Nuevo Producto </span>
    //                 </button>
    //               )}
    //             {productosList.length !== 1 && (
    //               <button
    //                 type="button"
    //                 className="bg-red-600 text-white py-2.5 px-5 rounded-xl"
    //                 onClick={() => handleProductoRemove(index)}
    //               >
    //                 <span> Quitar {index + 1}° Producto </span>
    //               </button>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </>
  )
}

export default ProductoFormulario