import React, { Component } from 'react';
import { connect } from "react-redux";

import FormInput from '../form-inputs/form-inputs.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from "../../redux/user/user.actions";

import './sign-up.styles.scss';


class SignUp extends Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        const { signUpUser } = this.props;

        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }

        signUpUser({ email, password, displayName });
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" name="displayName" value={displayName} onChange={this.handleChange} label="Display Name" required />
                    <FormInput type="email" name="email" value={email} onChange={this.handleChange} label="Email" required />
                    <FormInput type="password" name="password" value={password} onChange={this.handleChange} label="Password" required />
                    <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} label="Confirm Password" required />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToprops = dispatch =>({
    signUpUser: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToprops)(SignUp);