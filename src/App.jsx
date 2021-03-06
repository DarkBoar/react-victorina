import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Register from "./containers/Register/Register";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";


class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes;

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/register" component={Register} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
        </Switch>
      );
    }

    return (
      <Layout>
        <Helmet title="Главная" />
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
