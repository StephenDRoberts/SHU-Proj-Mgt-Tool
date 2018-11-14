import React from 'react';
import { connect } from 'react-redux'
import { Button, Glyphicon, Modal } from 'react-bootstrap';

class Save extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        }
    }
    handleSave = () => {
        // saves to DB
        let endPoint = '/api/saveData';

        fetch(endPoint, {
            method: 'put',
            body: JSON.stringify({
                data: this.props.data[0],
                user: this.props.accountState.user
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                this.setState({ show: true })
                return response.json()
            }
            return Promise.reject("Oops. Something went wrong trying to save. Please try again.")
        })
    }

    // closes modal
    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className='addTicket'>
                <Button className='saveSign' onClick={this.handleSave} data={this.props.data}>
                    <Glyphicon className="glyphicon glyphicon-floppy-save" glyph="" />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>You have saved your workspace</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        accountState: state.loginReducer,
        data: state.dataReducer.data,
    }
}
export default connect(mapStateToProps)(Save)