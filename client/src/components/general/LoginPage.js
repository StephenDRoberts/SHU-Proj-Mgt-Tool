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
                        <input placeholder='Email Address' className='loginInput' id='emailInput'></input>
                        <input placeholder='Password' className='loginInput' id='passwordInput'></input>
                        <Button bsStyle="success" className='loginInput' id='loginButton'>Log In</Button>

                    </div>
                    <Link to='/signup'>New user? Sign up here</Link>
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





