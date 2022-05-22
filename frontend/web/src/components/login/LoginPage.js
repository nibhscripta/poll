import changeTitle from "../../helpers/dom/changeTitle";
import { useLocation, Link } from "react-router-dom";
import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container } from "@mui/system";

const LoginPage = () => {
  changeTitle("Sign in");
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const defaultUsername = query.get("username");
  const login = (vals) => {
    console.log(vals);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => login(values),
    validationSchema: Yup.object({
      username: Yup.string().required("Required field."),
      password: Yup.string().required("Required field."),
    }),
  });
  return (
    <Grid container style={{ margin: "40px 0" }}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="xs">
            <Paper variant="outlined" style={{ padding: "40px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div">
                    Sign in
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    name="username"
                    label="Username or email"
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
                    defaultValue={defaultUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
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
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" type="submit">
                    Sign in
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Need an account?{" "}
                    <Link to="/register" color="primary">
                      Create one
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

export default LoginPage;
