import { DynamicFormProducto } from "./DynamicFormProducto"
import { IProducto } from "./Producto"



interface Props{
  arrayProductos?: IProducto[]
}

const ProductoFormulario = ({ arrayProductos }: Props) => (
  <>
    <h1> Producto Formulario</h1>
      <div className="form_container">
        <DynamicFormProducto   />
      </div>
  </>
)

export default ProductoFormulario