import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class SignupPage extends React.Component {

    render() {
        return (
            <div className="App">
                <div className='header'>SHU Module 1 Assignment 2</div>
                <div className='loginWrapper'>
                    <div className="login">

                        <img id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Email Address' className='loginInput' id='emailInput'></input>
                        <input placeholder='Password' className='loginInput' id='passwordInput'></input>
                        <input placeholder='Confirm password' className='loginInput' id='passwordConfirmInput'></input>
                        <Button bsStyle="primary" className='loginInput' id='loginButton'>Sign Up</Button>

                    </div>

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





