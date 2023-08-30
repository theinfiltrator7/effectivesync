import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

import LoginPresentational from "./Login";

class LoginContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      screen: "LOGIN",
      email: "",
      password: "",
      passwordConfirm: "",
      message: "",
      loggedIn: false,
      networkCallState: "idle",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      message: "",
      networkCallState: "idle",
    });
  };

  toggleScreen = (screenName) => {
    this.setState({
      screen: screenName,
    });
  };

  submitForm = () => {
    if (!this.state.email || !this.state.password) {
      this.setState({
        message: "fill all fields",
      });
      return;
    }
    let url = "/user/login";
    let data = {
      email: this.state.email,
      password: this.state.password,
      webForm: true,
    };
    if (this.state.screen === "SIGNUP") {
      url = "/user/signup";
      data.passwordConfirm = this.state.passwordConfirm;
    }

    this.setState({
      networkCallState: "pending",
    });

    axios
      .post(url, data)
      .then((resp) => {
        console.log("something");
        Cookies.set("token", resp.data.token);
        let AUTH_TOKEN = `Bearer ${Cookies.get('token')}`
        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        Cookies.set(
          "email",
          resp.data.email ? resp.data.email : resp.data.user?.email,
        );
        console.log(resp.data.app);
        // if(resp.data.app){
        //   router.params.history.push(`workspace/${resp.data.app}`)
        // }
        this.setState({
          loggedIn: true,
          networkCallState: "resolved",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.response?.data?.message
            ? err.response?.data?.message
            : "Something went wrong",
          networkCallState: "rejected",
        });
      });
  };

  generatePasswordToken = () => {
    if (!this.state.email) {
      this.setState({
        message: "enter your email",
      });
      return;
    }
    this.setState({
      networkCallState: "pending",
    });
    axios
      .post("/user/recover", {
        email: this.state.email,
      })
      .then((resp) => {
        this.setState({
          successMessage: "Email has been sent",
          networkCallState: "resolved",
        });
      })
      .catch((err) => {
        this.setState({
          message: err.message,
          networkCallState: "rejected",
        });
      });
  };

  render() {
    if (this.state.loggedIn) {
      console.log("i am cworking");
      return <Navigate to="/" />;
    }
    return (
      <LoginPresentational
        onChange={this.onChange}
        email={this.state.email}
        networkCallState={this.state.networkCallState}
        toggleScreen={this.toggleScreen}
        generatePasswordToken={this.generatePasswordToken}
        password={this.state.password}
        passwordConfirm={this.state.passwordConfirm}
        screen={this.state.screen}
        submitForm={this.submitForm}
        message={this.state.message}
        successMessage={this.state.successMessage}
      />
    );
  }
}

export default withRouter(LoginContainer);

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    console.log("these are mt props", props);
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
