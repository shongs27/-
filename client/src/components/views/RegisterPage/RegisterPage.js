import React from "react";
import moment from "moment";

import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { registerActor } from "../../../_redux/actor_actions";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "", name: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름이 입력되야함"),
        email: Yup.string()
          .email("이메일 형식으로하세요")
          .required("이메일이 입력되야함"),
        password: Yup.string()
          .min(3, "최소 3글자 이상이어야 합니다")
          .required("이메일이 입력되야함"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "패스워드가 안맞네요")
          .required("패스워드가 입력되야함"),
      })}
      onSubmit={(val, { setSubmitting }) => {
        setTimeout(() => {
          const data = {
            email: val.email,
            name: val.name,
            password: val.password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`, //뭐지 이건?
          };
          dispatch(registerActor(data)).then((res) => {
            if (res.payload.생성) {
              props.history.push("/login");
            } else {
              alert(res.payload.err);
            }
          });
          setSubmitting(false); //나중에 isSubmitting으로 비동기 통신중인지 확인가능
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
            <h2>회원 가입</h2>
            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item requierd label="name">
                <Input
                  id="name"
                  placeholder="이름 입력하세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // className={
                  //   // className 없어도 되는거 같은데?
                  //   errors.name && touched.name
                  //     ? "text-input error"
                  //     : "text-input"
                  // }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item
                requierd
                label="Email"
                hasFeedback
                validateStatus={
                  //번쩍이는 input창
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="이메일 입력하세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // className={
                  //   errors.email && touched.email
                  //     ? "text-input error"
                  //     : "text-input"
                  // }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                requierd
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
                  placeholder="비번 입력하세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // className={
                  //   errors.password && touched.password
                  //     ? "text-input error"
                  //     : "text-input"
                  // }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item requierd label="confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비번 재확인 합니다"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              {/* 이거 뭔지 확인 */}
              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
