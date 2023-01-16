import { useFormik } from "formik";

const formik = useFormik({})

const getForm = (jsonSchema : any) => {
  Object.entries(jsonSchema).map(([key, value], index) => {
    switch ((value as any).type) {
      case 'object': {
        return (
          <div>
            <h1>{key}</h1>
            {getForm((value as any).properties)}
          </div>
        );
      }

      case 'array': {
        return (
          <div>
            {getForm({
              [key]: value.items,
            })}
          </div>
        );
      }

      case 'string': 
      default: {
        return (
          <div>
            <TextField
              key={key}
              fullWidth
              id={key}
              name={key}
              label={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
            />
          </div>
        );
      }
    }
  });
};

const form = getForm(jsonSchema);