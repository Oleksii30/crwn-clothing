import React, {useState} from 'react'
import {connect} from 'react-redux'

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {googleSigninStart, emailSigninStart} from '../../redux/user/user.actions'

const SignIn = ({emailSigninStart, googleSigninStart}) => {

    const [credentials, setCredentials] = useState({email:'',password:''})
    const {email,password} = credentials
       
    const handleSubmit = async event =>{
        event.preventDefault() 
        
        emailSigninStart(email,password)
    }
    const handleChange = event =>{
        const {value, name} = event.target
        setCredentials({...credentials ,[name]:value})
    }

        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit = {handleSubmit}> 
                    <FormInput name="email" 
                            type="email" 
                            value={email} 
                            label="email"
                            handleChange = {handleChange}
                            required/>
                    
                    <FormInput name="password" 
                            type="password" 
                            value={password}
                            label="password"
                            handleChange = {handleChange} 
                            required/>
                    <div className='buttons'>
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type ="button" onClick={googleSigninStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch =>({
    googleSigninStart: ()=> dispatch(googleSigninStart()),
    emailSigninStart: (email,password)=> dispatch(emailSigninStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn)