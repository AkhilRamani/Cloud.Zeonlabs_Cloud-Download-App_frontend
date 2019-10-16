import React from 'react'
import {Link} from 'react-router-dom'

import './Login.styles.scss'
import { Button, Input, notify } from '../../../components/utility';
import {loginUser} from '../../../apis/apis'
import {storeToken} from '../../../common/common.utils'
import {notifyMsgs} from '../../../common/constants'
import { fetchProfile } from '../../../apis/sendRequest.api';


class Login extends  React.Component{

    state = {
        email: '', password: '', loading: false,
        emailErr: false, passwordErr: false
    }
    
    _handleInputChange = (event, property) => this.setState({ [property]: event.target.value, [`${property}Err`]: false })
    changeLoadingState = () => this.setState(state => ({loading: !state.loading}))
    setInputErr = (property) => this.setState({[`${property}Err`]: true})

    handleLogin = (email, password) => {
        loginUser({email, password})
                .then(res => {
                    storeToken(res.data.token)
                    this.changeLoadingState()
                    this.props.success()
                    fetchProfile()
                    notify(notifyMsgs.LOGIN_MSG)
                })
                .catch(({response}) => {  
                    switch(response.status){
                        case 404:
                            notify(notifyMsgs.NO_USER_FOUND)
                            this.setInputErr('email')
                            break

                        case 401:
                            notify(notifyMsgs.WRONG_PASS)
                            this.setInputErr('password')
                            break

                        case 403:
                            notify(notifyMsgs.UNVERIFIED_EMAIL)
                            break

                        default:
                            console.log(response)
                            notify(notifyMsgs.COMMON_ERR)
                    }
                    this.changeLoadingState()
                })
    }

    _handleSubmit = () => {
        const {email, password} = this.state

        !email.trim() && this.setInputErr('email')
        !password.trim() && this.setInputErr('password')

        if(email.trim() && password.trim()){
            this.changeLoadingState()
            this.handleLogin(email, password)
        }
    }

    render(){
        return(
            <div className='login-box' >
                <div style={{marginBottom: 30}} >
                    <h3 className='g-roboto login-text' >Sign in</h3>
                    <p className='g-roboto login-sub-text' >Sign in to continue to the app</p>
                </div>
                <div className='g-flex-ac' style={{flexDirection: 'column'}} >
                    <Input err={this.state.emailErr} type='text' placeholder='email' className='auth-input' onChange={event => this._handleInputChange(event, 'email')} />
                    <Input err={this.state.passwordErr} type='password' placeholder='password' className='auth-input' onChange={event => this._handleInputChange(event, 'password')} />

                    <div className='g-flex-ac' style={{justifyContent: 'space-between', alignSelf: 'stretch'}} >
                        <div className='g-flex-ac' >
                            <Input type='checkbox' />
                            <p className='g-roboto login-sub-text'>Remember me</p>
                        </div>
                        <Link className='g-roboto login-f-pass' to='/req=reset-pass' >Forgot password</Link>
                    </div>
                </div>
                <div className='login-btn-div' >
                    <Button name='Login' onClick={this._handleSubmit} style={{width: '100%'}} loading={this.state.loading} />
                </div>
            </div>
        
        )
    }
}

export default Login