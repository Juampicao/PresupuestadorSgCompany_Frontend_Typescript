import { ErrorMessage, useField } from 'formik';
import FormContainerChild from '../../../atoms/FormContainerChild';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'email' | 'password' ;
    img?: string,
    placeholder?: string;
    [x: string]: any;
}


export const MyTextInput = ( { img = "", label, ...props }: Props ) => {

    const [ field ] = useField(props)

    // Todo Vincular label.
    return (
        <>
            <div className="form_container_child">
            
            <FormContainerChild htmlFor={ props.id || props.name } img={img} label={label}/>
            
            {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
                <input className="text-input" {...field} {...props} />
                        {/* <ErrorForm msg={props.name} /> */}
                <ErrorMessage name={props.name} component="span" className=''/>


            </div>                
        </>
    )
}
