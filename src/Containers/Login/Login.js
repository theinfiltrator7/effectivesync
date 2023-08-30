import React from "react";
import "./Login.css";

import pattern from "./assets/pattern.jpg";
import { Button as AntdButton } from "antd";

const Login = (props) => {
  if (props.screen === "FORGOT_PASSWORD") {
    return (
      <div className="loginWrapper">
        <div className="loginLeftWrapper">
          <img className="loginBackgroundImage" src={pattern} alt="logo" />
        </div>
        <div className="loginFormWrapper">
          <div className="loginFormContent" style={{ maxWidth: "300px" }}>
            <div className="loginText">
              Forgot your password? <br />
              Nothing to worry.
              <input
                className="loginInputField"
                name="email"
                type="email"
                onChange={props.onChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="forgotPasswordText">
              We will send you an email containing instructions on how to reset
              the password. Check your email/spam to find the instructions.
            </div>
            <AntdButton
              state={props.networkCallState}
              onClick={props.generatePasswordToken}
            >
              SEND EMAIL
            </AntdButton>
            <AntdButton
              style={{ marginLeft: "10px" }}
              onClick={() => props.toggleScreen("LOGIN")}
            >
              Cancel
            </AntdButton>
            <div className="loginText">{props.successMessage}</div>
            <div className="loginText" style={{ color: "red" }}>
              {props.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loginWrapper">
      <div className="loginLeftWrapper">
        <img className="loginBackgroundImage" src={pattern} />
      </div>
      <div className="loginFormWrapper">
        <div className="loginFormContent">
          {props.screen === "SIGNUP" ? (
            <div className="loginHeading">SignUp</div>
          ) : (
            <div className="loginHeading">SignUp</div>
          )}
          <input
            className="loginInputField"
            name="email"
            type="email"
            onChange={props.onChange}
            placeholder="Enter your email"
          />
          <input
            className="loginInputField"
            name="password"
            type="password"
            onChange={props.onChange}
            placeholder="Enter password"
          />
          {props.screen === "SIGNUP" ? (
            <input
              className="loginInputField"
              name="passwordConfirm"
              type="password"
              onChange={props.onChange}
              placeholder="Confirm password"
            />
          ) : null}
          <div className="loginButtonWrapper">
            <AntdButton
              state={props.networkCallState}
              onClick={props.submitForm}
            >
              {props.screen === "SIGNUP" ? "Signup" : "Login"}
            </AntdButton>
          </div>

          {props.screen === "SIGNUP" ? (
            <div className="loginText">
              {"I already have an account "}
              <span
                className="loginTextClickable"
                onClick={() => {
                  props.toggleScreen("LOGIN");
                }}
              >
                Login
              </span>
              {" instead"}
            </div>
          ) : (
            <div className="loginText">
              {" "}
              <span
                className="loginTextClickable"
                onClick={() => {
                  props.toggleScreen("SIGNUP");
                }}
              >
                Signup
              </span>{" "}
              instead
            </div>
          )}
          <div className="forgotPasswordText">
            <div
              className="loginTextClickable"
              onClick={() => {
                props.toggleScreen("FORGOT_PASSWORD");
              }}
            >
              I forgot my password
            </div>
          </div>
          <div className="loginText" style={{ color: "red" }}>
            {props.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
