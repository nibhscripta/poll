import { useField } from "formik";

const TextInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...props,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextInput {...configTextField} />;
};

export default TextInput;
