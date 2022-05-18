import changeTitle from "../../helpers/dom/changeTitle";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../form-ui/TextInput";
// import "./RegisterPage.css";
// import handleRegister from "./HandleRegister";
// import RegistrationError from "./RegistrationError";
import { Container } from "@mui/system";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Required field."),
  email: Yup.string().email("Invalid email.").required("Required field."),
  password: Yup.string().required("Required field."),
});

const RegisterPage = () => {
  // const navigate = useNavigate();
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState("");
  changeTitle("Create an account");
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="xs">
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInput name="username" label="Username" />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>

    // <div className="register-page">
    //   <form
    //     className="register-form"
    //     // onSubmit={(e) => handleRegister(e, setIsError, setError, navigate)}
    //   >
    //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //     <input
    //       type="text"
    //       name="username"
    //       placeholder="Username"
    //       autoComplete="off"
    //       autoCapitalize="off"
    //     />
    //     <input
    //       type="text"
    //       name="email"
    //       placeholder="Email"
    //       autoComplete="off"
    //       autoCapitalize="off"
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       autoComplete="off"
    //       autoCapitalize="off"
    //     />
    //     <input
    //       type="password"
    //       name="confirm_password"
    //       placeholder="Confirm password"
    //       autoComplete="off"
    //       autoCapitalize="off"
    //     />
    //     <button type="submit">Create account</button>
    //     <div className="register-login-redirect">
    //       Have an account already? <Link to="/login">Login</Link>
    //     </div>
    //   </form>
    //   {isError && <RegistrationError error={error} />}
    // </div>
  );
};

export default RegisterPage;
