import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {

    render() {
        return (
            <div className="App">
                <div className='header'>SHU Module 1 Assignment 2</div>
                <div className='loginWrapper'>
                    <div className="login">

                        <img id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Username' className='loginInput' id='userInput'></input>
                        <input placeholder='Password' type='password' className='loginInput' id='passwordInput'></input>
                        <Button bsStyle="success" className='loginInputButton' id='loginButton'>Log In</Button>

                    </div>
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





