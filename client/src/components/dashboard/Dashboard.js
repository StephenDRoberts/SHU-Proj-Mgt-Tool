import React from 'react';
import { connect } from 'react-redux'
import { VictoryPie } from 'victory';
import { Container, Row, Col } from 'react-grid-system';

class Dashboard extends React.Component {

    //filter help:
    //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    allDataHoursSummary(data) {

        let allTypeNames = []


        for (var i = 0; i < data.length; i++) {
            allTypeNames.push(data[i].type)
        }
        let uniqueTypeNames = allTypeNames.filter(this.onlyUnique)
        let allSummaryObject = []

        for (var j = 0; j < uniqueTypeNames.length; j++) {
            let hoursSubTotal = 0
            for (var i = 0; i < data.length; i++) {

                if (data[i].type == uniqueTypeNames[j]) {
                    hoursSubTotal += parseInt(data[i].estHours, 10)
                }
                if (i == data.length - 1) {
                    let typeName = uniqueTypeNames[j]
                    allSummaryObject.push({
                        x: typeName, y: hoursSubTotal
                    })
                }
            }
        }
        return allSummaryObject
    }

    render() {
        let fullData = this.props.data[0].projects[this.props.projNumber].tasks
        let doneData = []
        for (var i = 0; i < fullData.length; i++) {
            if (fullData[i].status == 'Done') {
                doneData.push(fullData[i])
            }
        }
        let fullDataSummary = this.allDataHoursSummary(fullData)
        let doneDataSummary = this.allDataHoursSummary(doneData)

        return (
            <div className='pieContainer'>
                <Container>
                    <Row>
                        <Col md={5} className='indPies'>
                            <h4 className='timeTitle'>Actual Time</h4>
                            <VictoryPie
                                data={doneDataSummary}
                                colorScale={['#F19722', '#2C8693', '#6C6B99', '#FF9081']}
                            />
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5} className='indPies'>
                            <h4 className='timeTitle'>Planned Time</h4>
                            <VictoryPie
                                data={fullDataSummary}
                                colorScale={['#F19722', '#2C8693', '#6C6B99', '#FF9081']}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        data: state.dataReducer.data,
        projNumber: state.changeProjectReducer.projNumber
    }
}

export default connect(mapStateToProps)(Dashboard)

