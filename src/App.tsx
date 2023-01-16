import "./App.css"
import { PresupuestosProvider } from "./context/PresupuestosProvider"

import FormularioFinal from "./pages/FormularioFinal"

const App = () => {


  
  
  return (
    <>
      
      <PresupuestosProvider>
          <FormularioFinal/>
      </PresupuestosProvider>
    </>
  )
}

export default App