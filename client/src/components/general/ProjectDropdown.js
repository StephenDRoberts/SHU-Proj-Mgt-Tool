import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';


class ProjectDropdown extends React.Component {
    

    render() {
        //receives project list from App.js prop
        let projectList = this.props.projectList
        let projectListAr = []
        
        //on initial render, projectList is undefined, so set a error capture to set to an empty array
        if (projectList === undefined) {
            projectList = []
        } else {
            projectListAr = projectList.map(function (obj, i) {
                return <MenuItem eventKey={i} key={i}>{obj.projTitle}</MenuItem>
             })
        }
        
        return (
            <div id='projectDropdown'>
                <DropdownButton title='Project' pullRight id='projdropdown'>
                    {projectListAr}
                    <MenuItem divider />
                    <MenuItem eventKey="4">Add Project</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}
export default ProjectDropdown