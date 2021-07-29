import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./redux/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const AsyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const AsyncOrders = React.lazy(() => {
    return import("./containers/Orders/Orders");
});

const AsyncAuth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route
                    path="/auth"
                    render={() => (
                        <Suspense fallback={<Spinner />}>
                            <AsyncAuth />
                        </Suspense>
                    )}
                />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={AsyncCheckout} />
                    <Route
                        path="/orders"
                        render={() => (
                            <Suspense fallback={<Spinner />}>
                                <AsyncOrders />
                            </Suspense>
                        )}
                    />
                    <Route path="/logout" component={Logout} />
                    <Route
                        path="/auth"
                        render={() => (
                            <Suspense fallback={<Spinner />}>
                                <AsyncAuth />
                            </Suspense>
                        )}
                    />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = {
    onTryAutoSignup: authCheckState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
