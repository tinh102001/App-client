import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { GoogleLogin } from "react-google-login";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialValues = {
  userName: "",
  password: "",
};

const Login = () => {
  const location = useLocation();
  // const isAppLogin = !!searchParams.get('app');
  // const appAuth = () => {
  //   if (isAppLogin) {
  //     window.location.href = '/auth-app';
  //   }
  // };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      //  Xử gọi api
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(
          3,

          "Tên đăng nhập phải tối thiểu 3 ký tự"
        )
        .max(
          50,

          "Tên đăng nhập chỉ tối đa 50 ký tự"
        )
        .required("Trường này không được bỏ trống"),
      password: Yup.string()
        .min(
          6,

          "Mật khẩu tối thiểu 6 ký tự"
        )
        .max(50, "Mật khẩu tối đa 50 ký tự")

        .required("Trường này không được bỏ trống"),
    }),
  });

  // const responseGoogle = (response) => {
  //   // xử lí login google
  // };

  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    const passwordText = document.getElementById("password-text");
    const eyeToggles = Array.from(document.getElementsByClassName("eyeToggle"));
    eyeToggles.forEach((eyeToggle) => {
      eyeToggle.addEventListener("click", (e) => {
        const type =
          passwordText?.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordText?.setAttribute("type", type);
        setIsShowPassword(!isShowPassword);
      });
    });
  }, [isShowPassword]);

  useEffect(() => {
    let referrer = location.state?.path;
    if (referrer) {
      localStorage.setItem("login-referrer", referrer);
    }
  }, [location]);

  useEffect(() => {
    // if (window.electronAPI) {
    //   window.electronAPI.onAuth((data) => {
    //     dispatch(actions.login(data?.authToken, data?.refreshToken));
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 300);
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card card-login container">
      <div className="card-login-content">
        <div className="logo text-center my-4">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/icons/logo.svg"}
              alt="logo"
              height="60x"
              width="60px"
            />
          </Link>
        </div>
        <div className="auth-title">{"Đăng nhập"}</div>

        <div className="text-center login-group col">
          <GoogleLogin
            className="my-2 mr-2  google-button login-btn w-100"
            // clientId={
            //   "816134349175-9k8ra77j4rh7266bgpffac9su8fuea7f.apps.googleusercontent.com"
            // }
            icon={false}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                className="google-button login-btn"
              >
                <div>
                  <img
                    style={{ height: "24px", width: "24px" }}
                    className="login-icon"
                    src={process.env.PUBLIC_URL + "/icons/logo-google.svg"}
                    alt="google"
                  />{" "}
                </div>

                <span>Đăng nhập với tài khoản Google</span>
              </Button>
            )}
            // onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            buttonText="Đăng nhập với Google"
          />
        </div>

        <div className="different-signup m-4 or-text text-center">
          <span>{"Hoặc"}</span>
        </div>

        <form onSubmit={formik.handleSubmit} className="form-login">
          <Row>
            <Col
              md={12}
              className="form-group"
              style={{
                marginBottom:
                  formik.touched.userName && formik.errors.userName
                    ? "0.8rem"
                    : "1rem",
              }}
            >
              <div className="input-text-container">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <input
                    className="form-control"
                    placeholder="Tên đăng nhập/Email"
                    {...formik.getFieldProps("userName")}
                  />
                </div>
              </div>
              {formik.touched.userName && formik.errors.userName ? (
                <div
                  className="fv-plugins-message-container"
                  style={{ paddingLeft: "40px" }}
                >
                  <div className="fv-help-block">{formik.errors.userName}</div>
                </div>
              ) : null}
            </Col>
            <Col
              md={12}
              className="form-group"
              style={{
                marginBottom:
                  formik.touched.password && formik.errors.password
                    ? "0.8rem"
                    : "1rem",
              }}
            >
              <div className="input-text-container">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <input
                    id="password-text"
                    type="password"
                    className="form-control"
                    placeholder={"Nhập mật khẩu"}
                    {...formik.getFieldProps("password")}
                  />
                  {!isShowPassword && (
                    <img
                      className="eyeToggle"
                      style={{ marginRight: "15px" }}
                      src={process.env.PUBLIC_URL + "/icons/eye.svg"}
                      alt="eye"
                    />
                  )}
                  {isShowPassword && (
                    <FontAwesomeIcon
                      className="eyeToggle"
                      style={{ marginRight: "15px" }}
                      icon={faEyeSlash}
                    />
                  )}
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="fv-plugins-message-container"
                  style={{ paddingLeft: "40px" }}
                >
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </Col>
          </Row>
          <div className="mt-2 login-button">
            <Button
              className="mr-auto mb-1 col-md-12 col-sm-12"
              type="submit"
              style={{ borderRadius: 10 }}
              disabled={formik.isSubmitting}
            >
              {"Đăng nhập"}
            </Button>
          </div>
          <div className="signup-forgot text-end">
            <Link className="my-1" to="/forgot-password">
              Quên mật khẩu?
            </Link>
          </div>
        </form>
        <div className="signup-forgot text-center mt-2">
          <span className="or-text">
            {"Chưa có tài khoản?"}
            <Link className="registration-link mx-2" to={`/auth/register`}>
              {"Đăng ký".toLocaleUpperCase()}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
