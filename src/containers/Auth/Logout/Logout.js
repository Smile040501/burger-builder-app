import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authLogout } from "../../../redux/actions/index";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = {
    onLogout: authLogout,
};

export default connect(null, mapDispatchToProps)(Logout);
