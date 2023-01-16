import { ICliente } from "./Cliente"
import { DynamicFormCliente } from "./DynamicForm"
import PruebaClienteFormulario from "./PruebaClienteFormulario"


interface Props{
  cliente: ICliente
}

const ClienteFormulario = ({ cliente }: Props) => (
  <>
    <h1> Cliente Formulario</h1>
      <div className="form_container">
      <DynamicFormCliente />
        <PruebaClienteFormulario cliente={cliente}  />
      </div>
  </>
)

export default ClienteFormulario