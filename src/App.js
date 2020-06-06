import React, { Component } from 'react';
import './App.css';
import {Row, Container} from 'reactstrap';
import Calculator from './components/Calculator';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center mt-2">
          <Calculator initialValue = '' />
        </Row>
      </Container>
    );
  }
}

export default App;
