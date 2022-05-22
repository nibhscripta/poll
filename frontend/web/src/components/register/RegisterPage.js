import changeTitle from "../../helpers/dom/changeTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Icon,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Container } from "@mui/system";
import { registerUser } from "../../helpers/api_requests/RegisterUser";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  changeTitle("Create an account");
  const register = async (vals) => {
    const res = await registerUser(vals);
    if (res.request.status !== 201) {
      setIsError(true);
      setError(res.response.data.detail);
    } else if (res.status === 201) {
      navigate(`/login?username=${res.data.username}`);
    }
    formik.setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
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
  return (
    <Grid container style={{ margin: "40px 0" }}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="xs">
            <Paper variant="outlined" style={{ padding: "30px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sx={{ m: "10px 0" }}>
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
                    size="small"
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
                    size="small"
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
                    type="password"
                    size="small"
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
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={formik.isSubmitting}
                  >
                    Submit
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
            </Paper>
          </Container>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
