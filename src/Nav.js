import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';


class MainNav extends React.Component {
   constructor(props){
       super(props);
       this.state = {activeKey: "2"}
       
    }
   


   //Handles which Nav item is selected.
    handleSelect(eventKey) {
        //this just sorts the nav look to show which is selected
        this.setState({activeKey: eventKey})
        
        //this sends the new display mode back up to App.js
        let newDisplay = '';
        if(eventKey==='1'){
            newDisplay = 'Kanban'
        } else {
            newDisplay = 'Dashboard'
        }
    
        this.props.parentEvent(newDisplay)
        
    }
  
    render() {
          
      return (
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
          <NavItem eventKey="1">
            Kanban
          </NavItem>
          <NavItem eventKey="2">
            Dashboard
          </NavItem>
          <NavItem eventKey="3" >
            Other
          </NavItem>
        </Nav>
        

      );
    }
  }
  
export default MainNav
  