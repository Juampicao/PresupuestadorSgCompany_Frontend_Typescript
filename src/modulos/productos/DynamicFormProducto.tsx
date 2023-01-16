import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import formJson from '../../assets/data/productos-form.json';
import { MySelect, MyTextInput } from '../../components/forms/components';
import { arrayProductosPrueba, Producto } from './Producto';



export const DynamicFormProducto = () => {
    
const [productosList, setProductosList] = useState<Producto[]>(arrayProductosPrueba)

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {}

for (const input of formJson) {
    initialValues[ input.name ] = input.value;

    if ( !input.validations ) continue;

    let schema = Yup.string()

    for (const rule of input.validations ) {
        if ( rule.type === 'required' ) {
            schema = schema.required('Este campo es requerido');
        }

        if ( rule.type === 'minLength' ) {
            schema = schema.min( (rule as any).value || 2, `Mínimo de ${ (rule as any).value || 2 } caracteres`);
        }

        if ( rule.type === 'email' ) {
            schema = schema.email( `Revise el formato del email`);
        }

        // ... otras reglas
    }

    requiredFields[input.name] = schema;
}

    const validationSchema = Yup.object({ ...requiredFields });
    

    
    return (
        <div>
            <h1>Dynamic Form Productos</h1>

            <Formik
                initialValues={ initialValues }
                validationSchema={validationSchema}
            
                onSubmit={ (values) => {
                    console.log(values)
                }}
            >
                {(formik) => (
                 <>
                 
                        {/* {productosList.map((product, index) => ( */}
                        {productosList?.map((producto, index) => (
                            <>
                                
                            <div key={index} className="form_container">
                                <div className="form-field">
                                     <h3 className="titulos"> {index + 1}° Producto</h3>
                           
            
                                  
                    <Form noValidate>
                        { formJson.map( ({ type, name, placeholder, label, options }) => {

                            if ( type === 'input' || type === 'number' ||  type === 'password' || type === 'email' ) {
                                return <MyTextInput 
                                            key={ name }
                                            type={(type as any)}
                                            name={ name } 
                                            label={ label } 
                                            placeholder={placeholder}
                                />

                            } else if ( type === 'select' ) {
                                return (
                                    <MySelect 
                                        key={ name }
                                        label={ label }
                                        name={ name }
                                    >
                                        <option value="">Select an option</option>
                                        {
                                            options?.map( ({ id, label }) => (
                                                <option key={ id } value={ id }>{ label }</option>
                                            ))
                                        }
                                    </MySelect>
                                )
                            }

                            
                            throw new Error(`El type: ${ type }, no es soportado`);
                        })}
                            

                            <button type="submit">Submit</button>
                    
                             </Form>
                            </div>
                        </div>
                        </>
                                
                        ))}
                    </>
                                  
                )}
            </Formik>

        </div>
    )
}
