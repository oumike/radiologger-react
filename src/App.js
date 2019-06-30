import React, { Component } from 'react'
import './App.css';
import {Col, Container, Row, Table, Form, Button} from 'react-bootstrap'
import * as FakeData from './FakeData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'uuid/v1'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logData: [],
      logSelectedDate: null,
      logToSubmit: []
    }
  }

  componentDidMount = () => {
    let logToSubmit = []
    logToSubmit["logFrequency"] = null
    logToSubmit["logSignalStrength"] = 1

    let logData = []

    if (this.state.logData.length === 0) {
      logData = FakeData.data;
    } else {
      logData = this.state.logData
    }

    this.setState({
      logData: logData,
      logToSubmit: logToSubmit,
      logSelectedDate: Date.now()
    })
  }

  handleSubmit = event => {
    let copyLogData = this.state.logData
    copyLogData.push({
      logDate: this.state.logSelectedDate,
      logFrequency: this.state.logToSubmit["logFrequency"],
      logSignalStrengthf: this.state.logToSubmit["logSignalStrength"]
    })

    this.setState({
      logData: copyLogData
    })
  }

  handleLogSelectedDate = (date) => {
    this.setState({
      logSelectedDate: date
    })
  }

  handleLogChange = event => {
    let copyLogToSubmit = this.state.logToSubmit
    copyLogToSubmit[event.target.name] = event.target.value
    this.setState({
      logToSubmit: copyLogToSubmit
    })
  }

  renderLogForm = () => {

    const {
      logSelectedDate
    } = this.state

    return(
      <Form id="CreateLog">
        <Form.Group controlId="logDate">
          <Form.Label>Log Date</Form.Label>
              <DatePicker
                  selected={logSelectedDate}
                  onChange={this.handleLogSelectedDate}
              />
        </Form.Group>
        <Form.Group controlId="logFrequency">
          <Form.Label>Frequency</Form.Label>
          <Form.Control
            maxLength="10"
            name="logFrequency"
            onChange={this.handleLogChange} />
        </Form.Group>
        <Form.Group controlId="logSignalStrength">
          <Form.Label>Signal Strength</Form.Label>
          <Form.Control as="select" name="logSignalStrength" onChange={this.handleLogChange}>
            <option key="1" value="1">1</option>
            <option key="2" value="2">2</option>
            <option key="3" value="3">3</option>
            <option key="4" value="4">4</option>
            <option key="5" value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="secondary" type="submit" onClick={this.handleSubmit}>Submit</Button>

      </Form>
    )
  }

  renderLogData = () => {
    return(
      <Table striped bordered>
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Frequence</th>
          <th>Signal Strengh</th>
        </tr>
      </thead>
      <tbody>
        {this.state.logData.map(item => (
          <tr key={uuid()}>
            <td>
              {item.logDate}
            </td>
            <td>
              {item.logFrequency}
            </td>
            <td>
              {item.logSignalStrength}
            </td>
          </tr>
        ))}
      </tbody>

    </Table>
  )
}

  render() {
    return(
     <Container fluid>
       <Row>
         <Col>
          {this.renderLogForm()}
         </Col>
       </Row>
       <Row>
         <Col>
          {this.renderLogData()}
         </Col>
       </Row>
     </Container> 
    )
  }
}

export default App
