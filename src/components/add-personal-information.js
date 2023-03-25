import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const address = value => {
    if (value.length < 6) {
      return (
        <div className="alert alert-danger" role="alert">
         Invalid address!
        </div>
      );
    }
};

const phonenumber = value => {
    if (value.length !== 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Invalid phone number!
        </div>
      );
    }
};


export default class AddPerInfor extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);


    this.state = {
      fullname: "",
      birthday: "",
      address: "",
      phonenumber: "",
      successful: false,
      message: ""
    };
  }

  onChangeFullname(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeBirthday(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    console.log(this);
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.fullname,
        this.state.birthday,
        this.state.address,
        this.state.phonenumber
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={this.state.fullname}
                    onChange={this.onChangeFullname}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <Input
                    type="day"
                    className="form-control"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChangeBirthday}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required, address]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.onChangePhoneNumber}
                    validations={[required, phonenumber]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}