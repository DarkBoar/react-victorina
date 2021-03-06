import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { auth, disableErrorMessage } from "../../store/actions/auth";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      formControls: {
        email: {
          id: 1,
          value: "admin@mail.ru",
          type: "email",
          placeholder: "Электронная почта",
        },
        password: {
          id: 2,
          value: "123456",
          type: "password",
          placeholder: "Пароль",
        },
      },
    };
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true,
    );
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  componentWillUnmount() {
    this.props.disableErrorMessage();
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {
      ...this.state.formControls,
    };
    const control = {
      ...formControls[controlName],
    };

    control.value = event.target.value;
    control.touched = true;

    formControls[controlName] = control;

    this.setState({
      formControls,
    });

    this.props.disableErrorMessage();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={control.id}
          type={control.type}
          valid={this.state.valid}
          errorMessages={this.props.errorMessage}
          placeholder={control.placeholder}
          value={control.value}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <Helmet title="Авторизация" />
        <div>
          <h1>Авторизация</h1>
          <p>Авторизуйтесь, чтобы пользоваться программой</p>
          <form onSubmit={this.onSubmitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>
            <div className={classes.bottomAuth}>Еще не зарегистрированы?</div>
            <Link to="/register" className={classes.enter}>
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function masStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    disableErrorMessage: () => dispatch(disableErrorMessage()),
  };
}

export default connect(masStateToProps, mapDispatchToProps)(Auth);
