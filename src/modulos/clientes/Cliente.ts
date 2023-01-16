export interface ICliente{
  id?: string |  string | undefined,
  nombreCliente: string,
  contactoCliente: string,
  correoElectronico: string,
  direccionCliente?: string,     
  nombrePedido?: string,
  descripcionPedido?: string,
  notas?: string,
  fechaUltimaModificacion?: string,
}


export class Cliente implements ICliente{
  id?: string |  string | undefined;
  nombreCliente: string = ""
  contactoCliente: string = ""
  correoElectronico: string = ""
  direccionCliente?: string | undefined;
  nombrePedido?: string | undefined;
  descripcionPedido?: string | undefined;
  notas?: string | undefined;
  fechaUltimaModificacion?: string;

  constructor(nombreCliente: string = "", contactoCliente: string = "", correoElectronico: string = "") {
      this.nombreCliente = nombreCliente,
      this.contactoCliente = contactoCliente,
      this.correoElectronico = correoElectronico
  }
}


export const clienteVacio = new Cliente();
export const clientePrueba = new Cliente("Peter Alfonos","11144330303","juansito"  );
