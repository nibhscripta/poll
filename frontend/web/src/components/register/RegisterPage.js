import changeTitle from "../../helpers/dom/changeTitle";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
// import Icon from "@mui/material/Icon";
import * as Yup from "yup";
import { useFormik } from "formik";
// import "./RegisterPage.css";
// import handleRegister from "./HandleRegister";
// import RegistrationError from "./RegistrationError";
import { Container } from "@mui/system";

const RegisterPage = () => {
  // const navigate = useNavigate();
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState("");
  changeTitle("Create an account");
  const register = (vals) => {
    console.log(vals);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      showPassword: false,
    },
    onSubmit: (values) => register(values),
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/\w$/, "Only use letters, numbers, and underscores")
        .required("Required field."),
      email: Yup.string().email("Invalid email.").required("Required field."),
      password: Yup.string()
        .min(12, "Password must at least 12 chatacters.")
        .required("Required field."),
    }),
  });

  const handleClickShowPassword = () => {
    formik.setValues({
      ...formik.values,
      showPassword: !formik.values.showPassword,
    });
  };
  return (
    <Grid container style={{ margin: "40px 0" }}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="xs">
            <Paper variant="outlined" style={{ padding: "30px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div">
                    Create an account
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    name="username"
                    label="Username"
                    autoCapitalize="off"
                    autoComplete="off"
                    helperText={
                      formik.errors.username ? formik.errors.username : " "
                    }
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    name="email"
                    label="Email"
                    type="text"
                    autoCapitalize="off"
                    autoComplete="off"
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.email ? formik.errors.email : " "}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    name="password"
                    label="Password"
                    type={formik.values.showPassword ? "text" : "password"}
                    autoCapitalize="off"
                    autoComplete="off"
                    helperText={
                      formik.errors.password ? formik.errors.password : " "
                    }
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.password}
                  />
                </Grid>
                <Grid item xs={8} md={8.5}>
                  <FormControlLabel
                    onClick={handleClickShowPassword}
                    control={<Checkbox defaultChecked />}
                    label="Show password"
                  />
                </Grid>
                <Grid item xs={2.5} md={3.5}>
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Have an account?{" "}
                    <Link to="/login" color="primary">
                      Sign in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
