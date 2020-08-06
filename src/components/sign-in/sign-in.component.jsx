import React, { Component } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-inputs/form-inputs.component';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({ email: '', password: '' });
    }

    handleChange = e => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" label="Email" value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type="password" name="password" label="Password" value={this.state.password} handleChange={this.handleChange} required />

                    <input type="submit" value="Submit Form" />
                </form>
            </div>
        )
    }
}

export default SignIn;