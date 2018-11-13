import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { handleLogout, handleDeleteAccount } from '../../redux/modules/loginReducer.js'
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
        this.handleShowDelete = this.handleShowDelete.bind(this)
        this.handleCloseDelete = this.handleCloseDelete.bind(this)

        this.state = {
            showDelete: false
        }
    }

    handleLogout() {
        //sends to logout api route so that we can reset the session
        let endpoint = '/api/logout'
        fetch(endpoint, {
            method: 'post',
            credentials: 'same-origin',
          }).then((response)=> {
            if(response.ok){
            this.props.dispatch(handleLogout())
            this.props.history.push('/');
            }
        })

        
    }
    handleLogin() {
        this.props.history.push('/');
    }

    handleSignup() {
        this.props.history.push('/signup');
    }

    handleDeleteAccount() {
        let user = this.props.accountState.user

        let endpoint = '/api/deleteAccount'
        let self = this

        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                user: user,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json()
            }
            alert('Something went wrong, please try again')

        }).then(()=>{
            // this.props.dispatch(handleDeleteAccount())
            alert("Your account has been deleted")
        }
        )
        this.props.history.push('/signup')
    }

    handleCloseDelete() {
        this.setState({ showDelete: false });
    }

    handleShowDelete() {
        this.setState({ showDelete: true });
    }



    // RENDER OPTIONS
    loggedInRender() {
        return (
            <div className='header'>SHU Mod 1 Asgmt 2

           <div className="dropdown">

                    <img className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" id='smallAvatar' src={require('../../images/LoginAvatar.png')}></img>


                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.handleLogout}>Log Out</a></li>
                        <li role="presentation" className="divider"></li>
                        <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.handleShowDelete}>Delete Account</a></li>
                    </ul>
                </div>
                <Modal show={this.state.showDelete} onHide={this.handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button onClick={this.handleDeleteAccount} bsStyle="danger">Delete</Button>
                        <Button onClick={this.handleCloseDelete}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

    loggedOutRender() {
        return (
            <div className='header'>SHU Mod 1 Asgmt 2

           <div className="dropdown">
                    <img className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" id='smallAvatar' src={require('../../images/LoginAvatar.png')}></img>
                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.handleLogin}>Log In</a></li>
                        <li role="presentation" className="divider"></li>
                        <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.handleSignup}>Sign up</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
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
