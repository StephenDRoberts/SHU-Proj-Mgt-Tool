import React from 'react';
import { connect } from 'react-redux'
import { DropdownButton, MenuItem, Button, Modal } from 'react-bootstrap';
import { handleLogout } from '../../redux/modules/loginReducer.js'
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogout() {
        this.props.dispatch(handleLogout())
        this.props.history.push('/');
    }
    handleLogin() {
        this.props.history.push('/');
    }

    loggedInRender() {
        return (
            <div className='header'>SHU Module 1 Assignment 2
    
           <div className="dropdown">

                    <img className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" id='smallAvatar' src={require('../../images/LoginAvatar.png')}></img>


                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" onClick={this.handleLogout}>Log Out</a></li>
                        <li role="presentation" class="divider"></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" >Delete Account</a></li>
                    </ul>
                </div>

            </div>
        )
    }

    loggedOutRender() {
        return (
            <div className='header'>SHU Module 1 Assignment 2
    
           <div className="dropdown">
                    <img className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" id='smallAvatar' src={require('../../images/LoginAvatar.png')}></img>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" onClick={this.handleLogin}>Log In</a></li>
                    </ul>
                </div>

            </div>
        )
    }

    render() {
        console.log(this.props)
        if (this.props.accountState.user == "") {
            return (this.loggedOutRender())
        } else {
            return (this.loggedInRender())
        }



    }
}

const mapStateToProps = (state) => {
    return {
        accountState: state.loginReducer,
    }
}
export default withRouter(connect(mapStateToProps)(Header))
