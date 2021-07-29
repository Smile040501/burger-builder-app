import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        constructor() {
            super();
            this.willMount = true;
        }

        // componentWillMount() {
        //     console.log("[willMount]");
        //     this.reqInterceptor = axios.interceptors.request.use(
        //         (req) => {
        //             this.setState({ error: null });
        //             return req;
        //         },
        //         (error) => {
        //             this.setState({ error: error });
        //             return Promise.reject(error);
        //         }
        //     );

        //     this.resInterceptor = axios.interceptors.response.use(
        //         (res) => res,
        //         (error) => {
        //             this.setState({ error: error });
        //             return Promise.reject(error);
        //         }
        //     );
        // }

        componentWillUnmount() {
            // Removing interceptors
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            if (this.willMount) {
                // console.log("will mount");
                this.reqInterceptor = axios.interceptors.request.use(
                    (req) => {
                        this.setState({ error: null });
                        return req;
                    },
                    (error) => {
                        this.setState({ error: error });
                        return Promise.reject(error);
                    }
                );

                this.resInterceptor = axios.interceptors.response.use(
                    (res) => res,
                    (error) => {
                        this.setState({ error: error });
                        return Promise.reject(error);
                    }
                );

                this.willMount = false;
            }

            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    };
};

export default withErrorHandler;
