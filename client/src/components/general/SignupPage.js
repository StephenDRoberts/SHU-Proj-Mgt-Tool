import React from 'react';
import { connect } from 'react-redux';
// import {withRouter} from 'react-router'
import { Button } from 'react-bootstrap';
import { Link, Redirect, withRouter} from 'react-router-dom';

class SignupPage extends React.Component {
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    
    }
    handleSubmit(){
        let email= document.getElementById('emailInput').value
        let user = document.getElementById('usernameInput').value
        let password = document.getElementById('passwordInput').value
        let confPassword = document.getElementById('passwordConfirmInput').value

        let endpoint ='/api/signup'
        let self = this
        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
              email: email,
              user: user,
              password: password,
              confPassword: confPassword
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            if(response.ok){
            return response
            }
            alert('Your login details were incorrect, please try again')
            return Promise.reject("Not logged in");
      
          }).then(function (myJson) {
            self.props.history.push('/main')
            
        })
        }

       
    render() {
        return (
            <div className="App">
                <div className='header'>SHU Module 1 Assignment 2</div>
                <div className='loginWrapper'>
                    <div className="login">

                        <img id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Email Address' className='loginInput' id='emailInput'></input>
                        <input placeholder='Username' className='loginInput' id='usernameInput'></input>
                        <input placeholder='Password' type='password' className='loginInput' id='passwordInput'></input>
                        <input placeholder='Confirm password' type='password' className='loginInput' id='passwordConfirmInput'></input>
                        <Button bsStyle="primary" className='loginInputButton' id='loginButton' onClick={this.handleSubmit}>Sign Up</Button>

                    </div>
                    <Link to='/' className='prompt' id='loginPrompt'>Already registered? Log in here</Link>
                </div>
            </div>
        )
    }//ends render
}//ends class

const mapStateToProps = (state) => {
    return {
        accountState: state.loginReducer,
    }
}
export default connect(mapStateToProps)(SignupPage)





