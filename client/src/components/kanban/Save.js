import React from 'react';
import {connect} from 'react-redux'
import { Button, Glyphicon, Modal } from 'react-bootstrap';

class Save extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this)
        this.handleClose = this.handleClose.bind(this)
        
        this.state={
            show:false
        }
    }
    handleSave() {
        
        let endPoint = '/api/saveData';
        fetch(endPoint, {
            method:'put',
            body: JSON.stringify(this.props.data[0]),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function(response){
            if(response.ok){
                return response.json()
            }
            return Promise.reject("something went wrong in save")
        })
        this.setState({show:true})
    }

    handleClose() {
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
                    {/* <Modal.Body>
                        
                    </Modal.Body> */}
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }


}
const mapStateToProps = (state)=>{
    return{
      data: state.dataReducer.data,
    }
  }
  export default connect(mapStateToProps)(Save)