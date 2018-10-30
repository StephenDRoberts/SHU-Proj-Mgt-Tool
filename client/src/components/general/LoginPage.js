import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {handleLogin} from '../../redux/modules/loginReducer.js'

class LoginPage extends React.Component {

    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(ev){
        
        let user = document.getElementById('userInput').value
        let password = document.getElementById('passwordInput').value
        
        let endpoint ='/api/login'
        let self = this
        
        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                user: user,
                password: password
            }),
            headers:{
                'Content-Type':'application/json'
            }
          }).then(function (response) {
            console.log(response)
            if(response.ok){
            return response.json()
            }
            alert('Your login details were incorrect, please try again')
            
          }).then(function (myJson) {
            if(myJson.length!==0){self.props.history.push('/main');
            self.props.dispatch(handleLogin(myJson[0]))
        } else {
            alert('Your login details were incorrect. Please try again.')
        }

            
            
        })
        }

    render() {
        return (
            <div className="App">
                <div className='header'>SHU Module 1 Assignment 2</div>
                <div className='loginWrapper'>
                    <div className="login">

                        <img id='loginAvatar' src={require('../../images/LoginAvatar.png')}></img>
                        <input placeholder='Username' className='loginInput' id='userInput'></input>
                        <input placeholder='Password' type='password' className='loginInput' id='passwordInput'></input>
                        <Button bsStyle="success" className='loginInputButton' id='loginButton' onClick={this.handleSubmit}>Log In</Button>

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





