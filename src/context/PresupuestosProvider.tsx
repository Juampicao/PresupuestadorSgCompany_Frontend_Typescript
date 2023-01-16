import axios from "axios";
// import { saveAs } from "file-saver";
import { createContext, ReactNode, useEffect, useState } from "react";
import CustomLogger from "../helpers/CustomLogger";

const customLogger = new CustomLogger();


interface Props {
  children: ReactNode,
}

// Todo Ver por que no andan las funciones

const PresupuestosContext = createContext<string | null> (null);
const PresupuestosProvider = ({ children } : Props) => {
  const [isCargando, setIsCargando] = useState(false);
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  const [presupuestoFinal, setPresupuestoFinal] = useState({});

  const [cliente, setCliente] = useState({
    nombreCliente: "",
    contactoCliente: "",
    direccionCliente: "",
    nombrePedido: "",
    descripcionPedido: "",
  });

  const [empresa, setEmpresa] = useState({
    nombreEmpresa: "",
    direccionEmpresa: "",
    contactoEmpresa: "",
    observacionesParticulares: "",
    aclaracionesGenerales: "",
  });
  const [variables, setVariables] = useState({
    numeroPresupuesto: "",
    personaCotizadora: "",
    fechaPresupuesto: "",
    validezPresupuesto: "",
    descuentoTotal: "",
    tipoDescuento: "",
  });
  const [productosList, setProductosList] = useState([
    {
      cantidad: "",
      costoUnitario: "",
      descripcion: "",
      nombreMaterial: "",
      coeficienteVenta: "",
      monedaCotizar: "dolar",
    },
  ]);

  //* Desaparecer error a los 5 segundos.
  // if (error.status) {
  //   setTimeout(() => {
  //     setError({ status: false } );
  //   }, 5000);
  // }



  //* Completar el presupuesto final con los 4 estados principales.
  useEffect(() => {
    setPresupuestoFinal({
      cliente,
      empresa,
      productosList,
      variables,
    });
  }, [cliente, empresa, productosList, variables]);

  /**
   * Definir un nombre personalizado del pdf.
   * @returns string.pdf
   */
  function nombrePdfPersonalizado() {
    return `${variables.numeroPresupuesto}-${cliente.nombrePedido}.pdf`;
  }

  /**
   * Guardar en la base de datos. No muestra nada.
   */
  async function handleSavePdf() {
    console.log(
      "[createAndDownloadPdf] => El presupuesto final=",
      presupuestoFinal
    );
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/presupuestos/create`,
        presupuestoFinal
      )
      .catch((error) => {
        customLogger.logDebug("[handleSavePdf", error.msg);
        setError({ status: true, msg: error });
      })
      .finally(() => setIsCargando(false));
  }

  /**
   * Solo Imprime el pdf y muestra el pdf en el cliente. No guarda en DB.
   */
  async function handleCreateAndDownloadPdf() {
    setTimeout(() => {
      console.log(
        "[createAndDownloadPdf] => El presupuesto final=",
        presupuestoFinal
      );
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/presupuestos/print`,
          presupuestoFinal
        )
        .then(() =>
          axios.get(`${import.meta.env.VITE_API_URL}/pdf/fetch`, {
            responseType: "blob",
          })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          // saveAs(pdfBlob, nombrePdfPersonalizado());
        })
        .catch((error) => {
          customLogger.logDebug("[handleCreateAndDownloadPdfFN", error.msg);
          setError({ status: true, msg: error });
        })
        .finally(() => setIsCargando(false));
    }, 2000);
  }

  /**
   * Ver puerto frontend
   */
  // console.log(`Frontend corriento en ${import.meta.env.VITE_API_URL}`);

  return (
    <PresupuestosContext.Provider
      value={{
        setCliente,
        cliente,
        empresa,
        setEmpresa,
        productosList,
        setProductosList,
        setVariables,
        handleCreateAndDownloadPdf,
        handleSavePdf,
        isCargando,
        setIsCargando,
        error,
        setError,
      }}
    >
      {children}
    </PresupuestosContext.Provider>
  );
};

export { PresupuestosProvider };

export default PresupuestosContext;
