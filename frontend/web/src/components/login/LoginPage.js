import changeTitle from "../../helpers/dom/changeTitle";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Icon,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container } from "@mui/system";
import { useState } from "react";
import { loginUser } from "../../helpers/api_requests/LoginUser";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginPage = () => {
  const navigate = useNavigate();
  changeTitle("Sign in");
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const defaultUsername = query.get("username");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const login = async (vals) => {
    const res = await loginUser(vals);
    if (res.request.status !== 200) {
      setIsError(true);
      setError("Invalid credentials");
    } else if (res.status === 200) {
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/");
    }
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
  if (localStorage.getItem("refresh_token")) {
    return <Navigate to="/" />;
  }
  return (
    <Grid container style={{ margin: "40px 0" }}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="xs">
            <Paper variant="outlined" style={{ padding: "40px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" sx={{ m: "10px 0" }}>
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
                    size="small"
                    helperText={
                      formik.errors.username ? formik.errors.username : " "
                    }
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={defaultUsername || formik.values.username}
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
                    size="small"
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
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={formik.isSubmitting}
                  >
                    Sign in
                  </LoadingButton>
                </Grid>
                {isError && (
                  <Grid
                    item
                    xs={12}
                    sx={{ color: "red", fontSize: 40, padding: "5px 0" }}
                  >
                    <Typography variant="subtitle1" component="div">
                      <Icon sx={{ fontSize: 20, verticalAlign: "middle" }}>
                        errorOutlineIcon
                      </Icon>{" "}
                      {error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 1 }}>
                <Typography variant="subtitle1" component="div">
                  Don't have an account?
                  <Link to="/register">
                    <Button>Create one</Button>
                  </Link>
                </Typography>
              </Grid>
            </Paper>
          </Container>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
