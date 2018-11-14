import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleLogin } from '../../redux/modules/loginReducer.js'
import Header from './Header.js';

class LoginPage extends React.Component {
    
    handleSubmit = (ev) => {

        let user = document.getElementById('userInput').value
        let password = document.getElementById('passwordInput').value

        let endpoint = '/api/login'

        //sends username & password to DB to check whether the records are correct
        fetch(endpoint, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({
                user: user,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            alert('Your login details were incorrect, please try again')

        }).then((myJson) => {
            if (myJson.length !== 0) {
                this.props.dispatch(handleLogin(myJson[0].user))
                this.props.history.push('/main');
            } else {
                alert('Your login details were incorrect. Please try again.')
            }
        })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className='loginWrapper'>
                    <form className="login">

                        <img alt="Login avatar" id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Username' autoComplete="username" className='loginInput' id='userInput'></input>
                        <input placeholder='Password' autoComplete="current-password" type='password' className='loginInput' id='passwordInput'></input>
                        <Button bsStyle="success" className='loginInputButton' id='loginButton' onClick={this.handleSubmit}>Log In</Button>

                    </form>
                    <Link to='/signup' className='prompt' id='signupPrompt'>New user? Sign up here</Link>
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
export default connect(mapStateToProps)(LoginPage)





