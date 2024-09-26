import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from "../store/actions";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";

class Auth_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailId: "",
      confirmpassword: "",
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: "" });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmpassword, emailId } = this.state;
    const { authType } = this.props;

    if (authType !== "login" && password !== confirmpassword) {
      this.setState({ message: "Passwords do not match!" });
      return;
    }

    const idPrefix = username.substring(0, 3);
    if (authType !== "login" && !(["C2K", "I2K", "E2K"].includes(idPrefix) && username.length === 11)) {
      this.setState({ message: "Invalid ID format. Please use C2K, I2K, or E2K followed by 8 digits." });
      return;
    }

    try {
      await this.props.authUser(authType || "register", { username, password, emailId });
      // If successful, the user should be redirected by the action
    } catch (error) {
      console.error("Auth error:", error);
      this.setState({ message: error.response?.data?.error || "Registration failed. Please try again." });
    }
  }

  render() {
    const { username, password, emailId, confirmpassword, message } = this.state;
    const { authType, error } = this.props;
    const isLogin = authType === "login";

    return (
      <div className="section">
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx">
              <h2>Internship Management System</h2>
            </div>
            <div className="formBx">
              <form onSubmit={this.handleSubmit}>
                <h2>{isLogin ? "Student Login" : "Student Registration"}</h2>
                <input
                  required
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Registration ID (eg: C2K...)"
                  className="form-control"
                  minLength={isLogin ? "1" : "11"}
                  maxLength="11"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                {!isLogin && (
                  <input
                    required
                    type="email"
                    value={emailId}
                    name="emailId"
                    placeholder="Email ID"
                    className="form-control"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                )}

                <input
                  required
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                {!isLogin && (
                  <input
                    required
                    type="password"
                    value={confirmpassword}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    className="form-control"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                )}

                {(message || error) && (
                  <small className="text-danger">
                    <span className="mr-1">
                      <MdError
                        style={{ margin: -2, padding: -2 }}
                        color="crimson"
                      />
                    </span>
                    {message || error}
                  </small>
                )}
                <div className="text-center">
                  <Link className="btn-custom mr-2" to={isLogin ? "/register" : "/login"}>
                    <b>{isLogin ? "Register" : "Login"}</b>
                  </Link>
                  <input type="submit" value={isLogin ? "Login" : "Register"} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth?.error,
});

export default connect(mapStateToProps, { authUser, logout })(Auth_2);