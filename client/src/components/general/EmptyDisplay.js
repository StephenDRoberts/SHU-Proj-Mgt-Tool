import React from 'react';
import { connect } from 'react-redux';

class EmptyDisplay extends React.Component {

    render() {
        if (this.props.user === '') {
            return (
                <h4 id='emptyDisplay'>You are not logged in. Please log-in or sign-up via the avatar in the top right hand side of your screen.</h4>
            )
        } else {

            return (
                <h4 id='emptyDisplay'>You have no open projects. Please add a new project from the dropdown list.</h4>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user
    }
}
export default connect(mapStateToProps)(EmptyDisplay)


