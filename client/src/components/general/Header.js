import React from 'react';
import { connect } from 'react-redux'
import { DropdownButton, MenuItem, Button, Modal } from 'react-bootstrap';
import { handleLogout, handleDeleteAccount } from '../../redux/modules/loginReducer.js'
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
        this.handleShowDelete = this.handleShowDelete.bind(this)
        this.handleCloseDelete = this.handleCloseDelete.bind(this)

        this.state = {
            showDelete: false
        }
    }

    handleLogout() {
        this.props.dispatch(handleLogout())
        this.props.history.push('/');
    }
    handleLogin() {
        this.props.history.push('/');
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

        }).then(

            alert("Your account has been deleted")

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
            <div className='header'>SHU Module 1 Assignment 2

           <div className="dropdown">

                    <img className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" id='smallAvatar' src={require('../../images/LoginAvatar.png')}></img>


                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" onClick={this.handleLogout}>Log Out</a></li>
                        <li role="presentation" class="divider"></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" onClick={this.handleShowDelete}>Delete Account</a></li>
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