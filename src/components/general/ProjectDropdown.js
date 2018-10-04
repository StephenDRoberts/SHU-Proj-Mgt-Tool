import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';


class ProjectDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='projectDropdown'>
            <DropdownButton title = 'Project' pullRight>
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>
                    Active Item
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
            </div>
        )
    }
}
export default ProjectDropdown