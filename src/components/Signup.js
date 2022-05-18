import React, { Component } from 'react'
import NativeSelect from '@mui/material/NativeSelect'
import { TextField, Button } from '@mui/material/';
// import { Link } from 'react-router-dom';
import CommonConfig from '../utils/constant';          



const intialState = {
    firstName: '',
    firstNameErr: false,
    firstNameErrText: '',
    contactNo: "",
    contactNoErr: false,
    contactNoErrText: '',
    password: "",
    passwordErr: false,
    passwordErrText: "",
    confirmPassword: "",
    confirmpasswordErr: false,
    confirmpasswordErrText: "",
    emailId: '',
    emailIdErr: false,
    emailIdErrText: "",
}


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = intialState;
    }
    handleChange = (e, type) => {
        if (type === "firstName") {
            this.setState({ firstName: e.target.value, firstNameErr: false, firstNameErrText: '' })
        }
        else if (type === "password") {
            this.setState({ password: e.target.value, passwordErr: false, passwordErrText: '' })
        }
        else if (type === "confirmPassword") {
            
            this.setState({ confirmPassword: e.target.value, confirmPasswordErr: false, confirmPasswordErrText: '' })
           
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPassword: e.target.value, confirmPasswordErr: true, confirmPasswordErrText: 'Password does not matched ' });
    
          }
         else if (type === "emailId") {
            this.setState({ emailId: e.target.value, emailIdErr: false, emailIdErrText: '' })
        } else if (type === "contactNo") {
            this.setState({ contactNo: e.target.value, contactNoErr: false, contactNoErrText: '' })
        }

       
    }
    validate = () => {
        const { firstName, LastName, contactNo, emailId, password, UserName, UserType, confirmPassword,} = this.state;
        let IsValid = true;
        if (CommonConfig.isEmpty(firstName)) {
            this.setState({ firstNameErr: true, firstNameErrText: 'full name is required' })
            IsValid = false;
        }
        else {
            this.setState({ firstNameErr: false, firstNameErrText: '' })
        }

        if (CommonConfig.isEmpty(password)) {
            this.setState({ passwordErr: true, passwordErrText: 'password is required' })
            IsValid = false;
        }
        else {
            this.setState({ passwordErr: false, passwordErrText: '' })
        }
        if (CommonConfig.isEmpty(confirmPassword)) {
            this.setState({ confirmPasswordErr: true, confirmPasswordErrText: 'confirm password is required' })
            IsValid = false;
        }
        else {
            this.setState({ confirmPasswordErr: false, confirmPasswordErrText: '' })
        }
        if (password != confirmPassword) {
            IsValid = false
            this.setState({ confirmPasswordErr: true, confirmPasswordErrText: "Password does not matched" })
          }
          else {
            this.setState({ confirmPasswordErr: false, confirmPasswordErrText: '' })
          }
        if (CommonConfig.isEmpty(contactNo)) {
            this.setState({ contactNoErr: true, contactNoErrText: 'phone number is required' })
            IsValid = false;
        }
        else {
            this.setState({ contactNoErr: false, contactNoErrText: '' })
        }
        if (CommonConfig.isEmpty(emailId)) {
            this.setState({ emailIdErr: true, emailIdErrText: 'email is required' })
            IsValid = false;
        }
        else if (!emailId.match(CommonConfig.RegExp.emailRegex)) {
            IsValid = false;
            this.setState({ emailIdErr: true, emailIdErrText: "Please enter valid email id." });
        }
        else {
            this.setState({ emailIdErr: false, emailIdErrText: '' })
        }
        return IsValid;
    }
    handleClick = (e) => {
        e.preventDefault();
        if (this.validate()) {

            console.log(intialState);

        }
    }
    render() {
        const { firstName, firstNameErr, firstNameErrText, contactNo, contactNoErr, contactNoErrText, emailId, emailIdErr, emailIdErrText, password, passwordErr, passwordErrText, confirmPassword, confirmPasswordErr, confirmPasswordErrText} = this.state
        return (
            <div>
                <form>
                    <h1>Create an account</h1><br />
                    <label>Your email address :
                        <TextField required
                            label="Required"
                            onChange={(e) => this.handleChange(e, "emailId")}
                            value={emailId}
                            name='emailId'
                        />
                        {emailIdErr ? CommonConfig.showErrorMsg(emailIdErrText) : null}
                    </label><br /><br />
                    <label>Your password:
                        <TextField
                            type='password'
                            label="Required"
                            variant="outlined"
                            onChange={(e) => this.handleChange(e, "password")}
                            value={password}
                            name='password' />
                        {passwordErr ? CommonConfig.showErrorMsg(passwordErrText) : null}
                    </label><br /><br />
                    <label> Confirm your password:
                        <TextField
                            type='password'
                            label="Required"
                            variant="outlined"
                            onChange={(e) => this.handleChange(e, "confirmPassword")}
                            value={confirmPassword}
                            name='confirmPassword' />
                        {confirmPasswordErr ? CommonConfig.showErrorMsg(confirmPasswordErrText) : null}
                    </label><br /><br />

                    <label>Your full name:
                        <TextField
                            required
                            variant="outlined"

                            label="Required"
                            value={firstName}
                            onChange={(e) => this.handleChange(e, "firstName")}
                            name='firstName'
                        />
                        {firstNameErr ? CommonConfig.showErrorMsg(firstNameErrText) : null}
                    </label>
                    <br /><br />

                    <label>Your phone number:
                        <TextField
                            required
                            variant="outlined"
                            onChange={(e) => this.handleChange(e, "contactNo")}
                            value={contactNo}
                            name='contactNo' />
                        {contactNoErr ? CommonConfig.showErrorMsg(contactNoErrText) : null}
                    </label><br /><br />
                    <Button type='submit' variant='outlined' onClick={(e) => this.handleClick(e)} >SignUp</Button>
                </form>

            </div>
        )
    }
}
