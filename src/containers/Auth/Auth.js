import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../redux/actions/index";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath("/");
        }
    }

    inputChangedHandler = (e, controlName) => {
        const { isValid: isValidIdentifier, errorMsg } = checkValidity(
            e.target.value,
            this.state.controls[controlName].validation
        );

        this.setState((prevState) => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    [controlName]: {
                        ...prevState.controls[controlName],
                        value: e.target.value,
                        valid: isValidIdentifier,
                        touched: true,
                        errorMsg,
                    },
                },
            };
        });
    };

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.controls);
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSignup: !prevState.isSignup,
            };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map((formElement) => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(e) => this.inputChangedHandler(e, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            errorMessage={formElement.config.errorMsg}
                        />
                    );
                })}
                <Button btnType="Success">Submit</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = {
    onAuth: auth,
    onSetAuthRedirectPath: setAuthRedirectPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
