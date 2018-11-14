import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import { handleSignup } from '../../redux/modules/loginReducer.js'

class SignupPage extends React.Component {

    setupAccount = () => {
        let endpoint = '/api/setupAccount'
        let user = document.getElementById('usernameInput').value

        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                user: user,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            alert('Something when wrong setting up your account. Please try again')
        }).then((data) => {
            return data
        })
    }

    //Validation check - email is a correct email type
    //RegEx taken from:
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    handleSubmit = () => {
        // gathers user's inputted data
        let email = document.getElementById('emailInput').value
        let user = document.getElementById('usernameInput').value
        let password = document.getElementById('passwordInput').value
        let confPassword = document.getElementById('passwordConfirmInput').value

        //Validation check - email is a correct email type
        if (this.validateEmail(email) === false) {
            alert("Please insert a correct email address")
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
                alert("That username is taken. Please select another.")
                return [];
            } else {
                // sends to routes/controller to save data in DB
                let endpoint = '/api/signup'

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
                    this.setupAccount()
                    this.props.dispatch(handleSignup(user))
                }).then(() => {
                    this.props.history.push('/main')
                })
            }
        })

        //Validation check - passwords match
        if (password !== confPassword) {
            alert("Your passwords don't match. Please try again")
            return;
        }

    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className='loginWrapper'>
                    <form className="login">

                        <img alt="Login avatar" id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Email Address' className='loginInput' id='emailInput' type='email' name='email'></input>
                        <input placeholder='Username' autoComplete="username" className='loginInput' id='usernameInput'></input>
                        <input placeholder='Password' autoComplete="new-password" type='password' className='loginInput' id='passwordInput'></input>
                        <input placeholder='Confirm password' autoComplete="new-password" type='password' className='loginInput' id='passwordConfirmInput'></input>
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





