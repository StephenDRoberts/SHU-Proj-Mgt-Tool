import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class Save extends React.Component {

    handleSave() {
        console.log('save')
    }

    render() {
        return (
            <div className='addTicket'>
                <Button className='saveSign' onClick={this.handleSave}>
                    <Glyphicon className="glyphicon glyphicon-floppy-save" glyph="" />
                </Button>
            </div>
        )
    }


}
export default Save