import { useContext } from "react";
import GeneralContext from "../context/PresupuestosProvider";

const usePresupuestos = () => {
  return useContext(GeneralContext);
};

export default usePresupuestos;
