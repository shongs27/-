import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginActor } from "../../../_redux/actor_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberChecked = localStorage.getItem("remember") ? true : false;
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [remember, setRemember] = useState(rememberChecked);

  const handleRememberMe = () => {
    setRemember(!remember);
  };

  const initialEmail = localStorage.getItem("remember") || "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("이메일 형식이어야함").required("입력해라"),
        password: Yup.string()
          .min(3, "패스워드는 적어도 3글자는 되야한다")
          .required("입력해라"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let data = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginActor(data))
            .then((res) => {
              if (res.payload.로그인) {
                window.localStorage.setItem("actorId", res.payload.아이디);
                if (remember === true) {
                  window.localStorage.setItem("remember", values.id);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("아이디와 패스워드 다시 체크해라");
              }
            })
            .catch((err) => {
              setFormErrorMessage("아이디와 패스워드 다시 체크해라");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000); //일정 시간후에 사라진단 말이냐?
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <Title level={2}>로그인</Title>
            <Form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25" }} />
                  }
                  placeholder="입력해라 이메일"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: "#ff0000bf",
                      fontSize: "0.7rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={remember}
                >
                  Remember Me
                </Checkbox>
                <a
                  className="login-form-forgot"
                  href="/reset_actor"
                  style={{ float: "right" }}
                >
                  forgot password
                </a>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{
                      minwidth: "100%",
                    }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    log in
                  </Button>
                </div>
                or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
