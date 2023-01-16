import { useState } from "react";
import ContenedorFormularios from "../atoms/ContendorFormularios";
import Spiner from "../atoms/spiner/Spiner";
import { clienteVacio } from "../modulos/clientes/Cliente";
import ClienteFormulario from "../modulos/clientes/ClienteFormulario";
import { addProduct } from "../modulos/productos/addProductsFn";
import ProductoFormulario from "../modulos/productos/ProductoFormulario";

const FormularioFinal = () => {

  const [isCargando, setIsCargando] = useState(false);
 

  //* HandleSubmit
  const handleSubmit = async () => {
    setIsCargando(true);
    // handleCreateAndDownloadPdf();
  };

  const handleSave = async () => {
    setIsCargando(true);
    // handleSavePdf();
  };
  

  console.log(addProduct)

  return (
    <ContenedorFormularios>
      <form className=" p-5  max-w-3xl mx-auto ">
          <h2 className="tituloPrincipal"> Presupuestos</h2>


        <ClienteFormulario cliente={clienteVacio} />
        <ProductoFormulario/>        
        </form>
        <div className="flex">
          <button className="botonSubmit mx-auto" onClick={handleSubmit}>
            Print Pdf
            {isCargando ? (
              <span className="pl-3">
                <Spiner />
              </span>
            ) : (
              ""
            )}
          </button>
          <button className="botonSubmit mx-auto" onClick={handleSave}>
            Save Pdf
            {isCargando ? (
              <span className="pl-3">
                <Spiner />
              </span>
            ) : (
              ""
            )}
          </button>
        </div>
      
    </ContenedorFormularios>
  )
}

export default FormularioFinal