import React from 'react';
import { connect } from 'react-redux'
import Todo from './Todo.js';
import Doing from './Doing.js';
import Done from './Done.js';
import { Container, Row, Col } from 'react-grid-system';

// Kanban board display
class Board extends React.Component {

    render() {

        let todoTasks = [];
        let doingTasks = [];
        let doneTasks = [];
        //error trap when first render with no data and there is no 'status' key in array
        if (this.props.tasks.length === 0) {

            //otherwise, apportions tasks to their current status
        } else {
            for (var i = 0; i < this.props.tasks.length; i++) {
                switch (this.props.tasks[i].status) {
                    case 'To-Do':
                        todoTasks.push(this.props.tasks[i])
                        break;
                    case 'Doing':
                        doingTasks.push(this.props.tasks[i])
                        break;
                    case 'Done':
                        doneTasks.push(this.props.tasks[i])
                        break;
                    default:
                        todoTasks.push(this.props.tasks[i]);
                        break;
                }
            }
        }
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Todo tasks={todoTasks} deleteTicket={this.props.deleteTicket} />
                    </Col>
                    <Col sm={4}>
                        <Doing tasks={doingTasks} deleteTicket={this.props.deleteTicket} />
                    </Col>
                    <Col sm={4}>
                        <Done tasks={doneTasks} deleteTicket={this.props.deleteTicket} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.dataReducer.data,
        projNumber: state.changeProjectReducer.projNumber
    }
}

export default connect(mapStateToProps)(Board)
