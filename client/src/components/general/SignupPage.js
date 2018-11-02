import React from 'react';
import { connect } from 'react-redux';
// import {withRouter} from 'react-router'
import { Button } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Header from './Header.js';
import { fetchData } from '../../redux/modules/dataReducer.js'
import { handleSignup } from '../../redux/modules/loginReducer.js'

class SignupPage extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    setupAccount() {
        let endpoint = '/api/setupAccount'
        let user = document.getElementById('usernameInput').value
        let self = this;

        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                user: user,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log('setup endpoint')
            if (response.ok) {
                return response.json()
            }
            alert('Something when wrong setting up your account. Please try again')
        }).then(function (data) {
            return data
        })
    }




    handleSubmit() {
        let email = document.getElementById('emailInput').value
        let user = document.getElementById('usernameInput').value
        let password = document.getElementById('passwordInput').value
        let confPassword = document.getElementById('passwordConfirmInput').value

        //Validation check - passwords match
        if (password !== confPassword) {
            alert("Your passwords don't match. Please try again")
            return;
        }

        //Validation check - username already exists
        let targetUser = document.getElementById('usernameInput').value
        let checkEndpoint = '/api/shareCheck'

        fetch(checkEndpoint, {
            method: 'post',
            body: JSON.stringify({
                user: targetUser,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            alert("Something went wrong. Please try again.");
            return [];

        }).then((myJson) => {
            //if json length !== 0, then we have a user with that username in our db,
            //so we shouldn't proceed with the rest of the sign up and we should
            //alert the user.
            if (myJson.length !== 0) {
                alert("That user name is taken. Please select another.")
                return [];
            } else {

                let endpoint = '/api/signup'
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
                }).then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    alert('Your login details were incorrect, please try again')

                }).then(() => {
                    self.setupAccount()
                    this.props.dispatch(handleSignup(user))
                }).then(() => {
                    console.log(user)
                    self.props.history.push('/main')
                })
            }
        })
    }


    render() {
        return (
            <div className="App">
                <Header />
                <div className='loginWrapper'>
                    <form className="login">

                        <img id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Email Address' className='loginInput' id='emailInput'></input>
                        <input placeholder='Username' className='loginInput' id='usernameInput'></input>
                        <input placeholder='Password' type='password' className='loginInput' id='passwordInput'></input>
                        <input placeholder='Confirm password' type='password' className='loginInput' id='passwordConfirmInput'></input>
                        <Button bsStyle="primary" className='loginInputButton' id='loginButton' onClick={this.handleSubmit}>Sign Up</Button>

                    </form>
                    <Link to='/' className='prompt' id='loginPrompt'>Already registered? Log in here</Link>
                </div>
            </div>
        )
    }//ends render
}//ends class

const mapStateToProps = (state) => {
    return {
        accountState: state.loginReducer,
        data: state.dataReducer.data,
    }
}
export default connect(mapStateToProps)(SignupPage)





