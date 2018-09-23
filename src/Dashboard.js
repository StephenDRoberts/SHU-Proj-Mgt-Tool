import React from 'react';
import { VictoryPie } from 'victory';
import { Container, Row, Col } from 'react-grid-system';

class Dashboard extends React.Component {
    render() {
        return (
            <div className='pieContainer'>
                <Container>
                    <Row>
                        <Col md={5} className='indPies'>
                            <h4 className='timeTitle'>Actual Time</h4>
                            <VictoryPie
                                data={[
                                    //y is absolute values
                                    { x: "Chores", y: 10 },
                                    { x: "Pers Dev", y: 10 },
                                    { x: "Fun", y: 10 },
                                    { x: "To live", y: 10 }
                                ]}
                                colorScale={['#F19722', '#2C8693', '#6C6B99', '#FF9081']}
                            />
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5} className='indPies'>
                        <h4 className='timeTitle'>Planned Time</h4>
                            <VictoryPie
                                data={[
                                    //y is absolute values
                                    { x: "Chores", y: 10 },
                                    { x: "Pers Dev", y: 10 },
                                    { x: "Fun", y: 10 },
                                    { x: "To live", y: 10 }
                                ]}
                                colorScale={['#F19722', '#2C8693', '#6C6B99', '#FF9081']}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}
export default Dashboard

