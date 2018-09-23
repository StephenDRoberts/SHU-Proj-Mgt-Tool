import React, {Component} from 'react';
import Ticket from './Ticket.js';
import AddTicket from './AddTicket.js';

let tasksAr = [
    {
        "user": "user1",
        "title": "Washing Up",
        "description": "To do the washing up",
        "estHours": 1,
        "actHours": "",
        "status": "To-Do",
        "type":"Chores",
        "priority": 1
    },
    {
        "user": "user1",
        "title": "Code",
        "description": "Learn Kotlin",
        "estHours": 5,
        "actHours": "",
        "status": "Doing",
        "type":"Pers Dev",
        "priority": 1
    },
    {
        "user": "user1",
        "title": "Iron",
        "description": "Iron my clothes",
        "estHours": 1,
        "actHours": "",
        "status": "To-Do",
        "type":"Chores",
        "priority": 2
    },
    {
        "user": "user1",
        "title": "Play guitar",
        "description": "Don't fear the reaper",
        "estHours": 1,
        "actHours": 1,
        "status": "Done",
        "type":"Fun",
        "priority": 1
    },
    {
        "user": "user1",
        "title": "Watch Everton",
        "description": "Arsenal vs Everton",
        "estHours": 3,
        "actHours": "",
        "status": "To-Do",
        "type":"Fun",
        "priority": 3
    },
    {
        "user": "user1",
        "title": "Hoover",
        "description": "Hoover the house",
        "estHours": 1,
        "actHours": 1,
        "status": "Done",
        "type":"Chores",
        "priority": 2
    },
    {
        "user": "user1",
        "title": "Have lunch",
        "description": "",
        "estHours": 1,
        "actHours": "",
        "status": "Doing",
        "type":"To live",
        "priority": 2
    },
]


let todoAr = [];

for(var i=0; i<tasksAr.length; i++){
    if(tasksAr[i].status==="To-Do"){
        todoAr.push(tasksAr[i])
    }
}
console.log(todoAr)

let todoTicketsAr = [];
todoTicketsAr = todoAr.map(function (obj, i) {
    return <Ticket key={i} data = {obj}></Ticket>
  })

class Todo extends React.Component {
render(){
    return (
    <div>
        <h1>To do:</h1>
        {todoTicketsAr}
        <AddTicket />
    </div>
    )
}


}
export default Todo
