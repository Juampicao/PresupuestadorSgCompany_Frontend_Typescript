import * as Yup from 'yup';
// import formJson from '../../../assets/data/clientes-form.json';


const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {}

for (const input of inputDataFormJson) {
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



import { DynamicForm } from './DynamicForm';

interface Props {
    inputDataFormJson: Array<string>, 
}

const DynamicForm2 = ({inputDataFormJson} : Props) => {
  return (
      <div>
          <DynamicForm inputDataFormJson={inputDataFormJson}  />
   </div>
  )
}

export default DynamicForm2