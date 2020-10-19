import React, {useState} from 'react'
import {connect} from 'react-redux'

import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signupStart} from '../../redux/user/user.actions'

const SignUp = ({signupStart}) => {
    
    const [credentials, setCredentials] = useState({
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const {displayName, email, password, confirmPassword} = credentials
   
    const handleSubmit = async event => {
        event.preventDefault()
                
        if(password !== confirmPassword){
            alert("Password don't match")
            return
        }
        signupStart(credentials)
      
    }

    const handleChange = event => {
        const {name, value} = event.target
        setCredentials({...credentials,[name]:value})
    }
        return(
            <div className="sign-up">
                <h2 className="title">I dont have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value = {displayName}
                        onChange = {handleChange}
                        label = "Display Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value = {email}
                        onChange = {handleChange}
                        label = "email"
                        required
                    />
                    
                    <FormInput
                        type="password"
                        name="password"
                        value = {password}
                        onChange = {handleChange}
                        label = "password"
                        required
                    />
                  
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value = {confirmPassword}
                        onChange = {handleChange}
                        label = "Confirm password"
                        required
                    />
                    <CustomButton type="submit" >SIGN UP</CustomButton>
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch =>({
    signupStart: user => dispatch(signupStart(user))
})

export default connect(null,mapDispatchToProps)(SignUp)