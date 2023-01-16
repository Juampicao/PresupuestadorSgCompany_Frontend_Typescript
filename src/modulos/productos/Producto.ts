export interface IProducto{
  id?: string |  string | undefined;
  cantidad?: number; 
  costoUnitario?: number;
  descripcion?: string; 
  nombreMaterial?: string;
  coeficienteVenta?: number;
  monedaCotizar?: string;
  
}

export class Producto implements IProducto{
  id?: string |  string | undefined; 
  cantidad: number = 0;
  costoUnitario: number = 0;
  descripcion: string = "";
  nombreMaterial: string = "";
  coeficienteVenta: number = 0; 
  monedaCotizar: string = "dolar";

  constructor(cantidad: number = 0, costoUnitario: number = 0, descripcion: string = "", nombreMaterial: string = "", coeficienteVenta: number = 0, monedaCotizar: string = "dolar") {
    this.cantidad = cantidad;
    this.costoUnitario = costoUnitario;
    this.descripcion = descripcion; 
    this.nombreMaterial = nombreMaterial
    this.coeficienteVenta = coeficienteVenta
    this.monedaCotizar = monedaCotizar;

  }
}


export const arrayProductosPrueba : Producto[] =  [
        {
          cantidad: 4,
          costoUnitario: 2,
          descripcion: "CACA por doquier",
          nombreMaterial: "madera",
          coeficienteVenta: 1.5,
          monedaCotizar: "peso"
        },
        {
          cantidad: 17,
          costoUnitario: 4,
          descripcion: "POPO por doquier",
          nombreMaterial: "quarzo",
          coeficienteVenta: 1.5,
          monedaCotizar: "dolar"
        }
      ]

export const productoVacio = new Producto();
export const productoPrueba = new Producto(4, 2, "Cualquira decripcion", "madera", 1.5, "peso");

export const opcionesNumerosVenta = ["--select--", 1, 1.5, 2, 2.3, 2.5, 3];


  // const [nuevoProducto, setNuevoProducto] = useState<Producto>(productoVacio); 
  // const [productosList, setProductosList] = useState<Producto[]>(arrayProductos)
  // const { isChecked, changeChecked } = useCheck();