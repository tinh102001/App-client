import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Button } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="card card-register container">
      <div className="card-register-content">
        <div className="logo-app text-center my-4">
          <Link to="/">
            <SVG
              src={process.env.PUBLIC_URL + "/icons/logo.svg"}
              alt="logo"
              height="60x"
              width="60px"
            />
          </Link>
        </div>
        <div className="auth-title">Đăng ký</div>
        <GoogleLogin
          className="my-2 mr-2 google-button w-100"
          clientId={
            "816134349175-9k8ra77j4rh7266bgpffac9su8fuea7f.apps.googleusercontent.com"
          }
          render={(renderProps) => (
            <Button
              className="google-button login-btn"
              onClick={renderProps.onClick}
              style={{}}
            >
              <img
                style={{ height: "24px", width: "24px" }}
                className="login-icon"
                src={process.env.PUBLIC_URL + "/icons/logo-google.svg"}
                alt="google"
              />

              <span>Đăng ký với tài khoản Google</span>
            </Button>
          )}
          icon={false}
          // onSuccess={(response) => responseGoogle(response)}
          // onFailure={responseGoogle}
          buttonText="Đăng ký với Google"
        />
        <div className="m-4 different-signup or-text text-center">
          <span>Hoặc</span>
        </div>
        <RegisterForm></RegisterForm>
        <div className="register-footer text-end">
          <div className="my-1 or-text">
            Đã có tài khoản?
            <Link className="registration-link ml-2" to="/login">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
