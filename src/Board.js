import React, {Component} from 'react';
import Todo from './Todo.js';
import Doing from './Doing.js';
import Done from './Done.js';
import {Container, Row, Col} from 'react-grid-system';

class Board extends React.Component {
render(){
    return (
    <Container>
        <Row>
            <Col sm={4}>
                <Todo />
            </Col>
            <Col sm={4}>
                <Doing />
            </Col>
            <Col sm={4}>
                <Done />
            </Col>
        </Row>
    </Container>
    )
}


}
export default Board
