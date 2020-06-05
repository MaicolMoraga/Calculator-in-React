import React, { Component } from 'react';
import {Row, Container} from 'reactstrap';
import Calculator from './components/Calculator';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Calculator initialValue = {0} />
        </Row>
      </Container>
    );
  }
}

export default App;
